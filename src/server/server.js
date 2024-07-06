const express = require('express');
const bodyParser = require("body-parser");
const { Sequelize, DataTypes } = require("sequelize");
const multer  = require('multer');
const path = require('path');
const dotenv = require('dotenv');
const bcrypt = require('bcryptjs');

dotenv.config({ path: path.resolve(__dirname, '../../.env') })

const usersSchema = require('../modals/user');
const registerPlayerSchema = require('../modals/registerPlayer');
const sponsorsSchema = require('../modals/sponsors');

const cors = require('cors');

const port = 8000;
const DB_NAME = process.env.ATLETICO_DB_NAME;
const DB_PORT = 5432;
const DB_USERNAME = process.env.ATLETICO_DB_USERNAME;
const DB_PASSWORD = process.env.ATLETICO_DB_PASSWORD;
const DB_HOST = 'localhost';
const DB_DIALECT = process.env.ATLETICO_DB_DIALECT;
const DB_POOL = {
  max: 5,
  min: 0,
  acquire: 30000,
  idle: 10000
}

const app = express();

const sequelize = new Sequelize(DB_NAME, DB_USERNAME, DB_PASSWORD, {
  host: DB_HOST,
  dialect: DB_DIALECT,
  pool: DB_POOL,
  port: DB_PORT
});


const UserModel = usersSchema(sequelize, DataTypes);
const RegisterModel = registerPlayerSchema(sequelize, DataTypes);
const SponsorModel = sponsorsSchema(sequelize, DataTypes);


app.use(cors()) 

// app.use(cors({
//   origin: "http://localhost:3000"
// }));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, '../../public/images/')
  },
  filename: function (req, file, cb) {
    var ext = file.originalname.split('.').pop();
    cb(null, file.fieldname + '-' + Date.now() + '.' + ext);
  }
});

var upload = multer({ storage: storage });

const validCode = process.env.ATLETICO_JOIN_CODE;

/* Below service is used to login to the Atletico club site by an admin user */

app.post('/service/login', async (req, res) => {
  try {
    const userEmail = req.body.email;
    const userPassword = req.body.password;
    const sqlQuery = await UserModel.findAll({ attributes: ['email', 'password'] }, { where: { email: userEmail } });
    console.log("Records from DB" + sqlQuery);
    if (sqlQuery == null || sqlQuery == '') {
      res.status(403).json({ fail: "Invalid admin user details !" });
    }
    const email = sqlQuery[0].email;
    const hashedPassword = sqlQuery[0].password;
    
    if (email === userEmail) {
      var comparedResult = bcrypt.compareSync(userPassword, hashedPassword);
      if (comparedResult) {
        res.status(200).json({ success: true });
      } else {
        res.status(403).json({ fail: "Password is incorrect!" });
      }      
    } else {
      res.status(403).json({ fail: "Email address is not correct!" });
    }
  } catch (e) {
    console.log(e);
    res.status(500).json();
  }
});

/* Below service is used to send request to register a player to the Atletico club */
app.put('/service/registerPlayer', upload.single('profilePhoto'), async (req, res, next) => {

  try {

    const { name, mobile, email, jerseynumber, ageGroup, position, comments, code } = req.body;

    if (code == validCode) {
      const playerEmail = await RegisterModel.count({ where: { email: email } });

      if ( playerEmail == 0) {
        let photoPath = 'barca.PNG';
        if (req.file) {
          photoPath = req.file.path.replace(/^public\\/, ''); 
        } 
        var playerData = { name: name, mobile: mobile, email: email, jerseynumber: jerseynumber, agegroup: ageGroup, position: position, photo: photoPath, comments: comments, code: code};
        await RegisterModel.create(playerData);
        res.status(200).json({ success: true });

      } else {
        var updatePlayerData = { name: name, mobile: mobile, jerseynumber: jerseynumber, agegroup: ageGroup, position: position, comments: comments, code: code };
        if (req.file) {
          updatePlayerData.photo = req.file.path.replace(/^public\\/, '');
        } 
        await RegisterModel.update(updatePlayerData, { where: { email: email } });
        res.status(200).send('Player data updated successfully !');
      }

    } else {
      return res.status(401).json({ message: "Invalid code provided, please contact admin !" });
    }

  } catch (e) {
    console.log(e);
    return next(e);
  }
});

/* Below get method will pull all of the register player requests from database and pass to front end, so admin component can display */
app.get('/service/registerPlayerList', async (req, res) => {
  try {
    const requests = await RegisterModel.findAll({});
    requests.map(req => {
      req.setDataValue("processRequest", "Accept");
      return req;
    })
    res.status(200).json({ requests });
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
});

/* Below method is to update the server-side endpoint to handle both accepted and declined statuses */
app.post('/service/updatePlayerStatus', async (req, res) => {
  try {
    const players = req.body;

    const updatedPlayers = await Promise.all(players.map(async player => {
      const status = player.status === 'accepted' ? 'Yes' : player.status === 'declined' ? 'No' : null;

      if (status !== null) {
        await RegisterModel.update(
          { status: status },
          { where: { id: player.id } }
        );
        return { ...player, status };  // Return the updated player with the new status
      }
      return player;
    }));
    res.status(200).json({ message: 'Players status updated successfully' });
  } catch (e) {
    console.log(e);
    res.status(500).json({ message: e.message });
  }
});

/* Below get method will pull the Mens squad player list data from the database and pass to Mens Squad page */ 
app.get('/service/mensPlayerList', async (req, res) => {
  try {
    const players = await RegisterModel.findAll({
      attributes: ['name', 'position', 'photo', 'jerseynumber', 'favclub'],
      where: {
        status: 'Yes',
        agegroup: 'Open'
      }
    });
    res.status(200).json({ players });
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
});

/* Below get method will pull the Master squad player list data from the database and pass to Master Squad page */ 
app.get('/service/mastersPlayerList', async (req, res) => {
  try {
    const players = await RegisterModel.findAll({
      attributes: ['name', 'position', 'photo', 'jerseynumber', 'favclub'],
      where: {
        status: 'Yes',
        agegroup: 'AB40'
      }
    });
    res.status(200).json({ players });
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
});

/* Adding of a sponsor from the admin page */ 
app.post('/service/addSponsor', upload.single('imageUpload'), async (req, res, next) => {

  try {

    const { titleSponsor, sponsorHeader, urlLink, category, description } = req.body;
    let photoPath = 'logo192.png';
    if (req.file) {
      photoPath = req.file.path.replace(/^public\\/, '');
    }
    var sponsorData = { logo: photoPath, link: urlLink, header: sponsorHeader, titlesponsor: titleSponsor, category: category, description: description };
    await SponsorModel.create(sponsorData);
    res.status(200).json({ success: true });

  } catch (e) {
    console.log(e);
    res.status(500).json({ message: e.message });
    return next(e);
  }
});

/* Updating a sponsor from the admin page via Edit button */ 
app.put('/service/updateSponsor/:id', upload.single('imageUpload'), async (req, res, next) => {
  const sponsorId = parseInt(req.params.id, 10);
  const { titleSponsor, sponsorHeader, urlLink, category, description } = req.body;

  try {
    const sponsor = await SponsorModel.findByPk(sponsorId);
    if(sponsor){
      let photoPath = 'logo192.png';
      var updateSponsorData = { logo: photoPath, link: urlLink, header: sponsorHeader, titlesponsor: titleSponsor, category: category, description: description };
      if (req.file) {
        updateSponsorData.logo = req.file.path.replace(/^public\\/, '');
        await SponsorModel.update(updateSponsorData, {
          where: {
            id: sponsorId
          }
        });
        const updatedSponsor = await SponsorModel.findByPk(sponsorId);
        res.status(200).json({ message: 'Sponsor updated successfully', sponsor:updatedSponsor });
      } 
    } else{
      res.status(404).json({ message: 'Sponsor not found' });
    }
  } catch (e) {
    console.log(e);
    res.status(500).json({ message: e.message });
    return next(e);
  }
});


/* Below get service method will pull the list of sponsors to display in AB website */ 
app.get('/service/sponsorsList', async (req, res) => {
  try {
    const sponsors = await SponsorModel.findAll({
      attributes: ['id','logo', 'link', 'header', 'titlesponsor', 'category', 'description']
    });
    res.status(200).json({ sponsors });
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
});

/* Below delete service will delete a sponsor by an admin user from AB website */ 
app.delete('/service/deleteSponsor/:id', async (req, res) => {
  const sponsorId = parseInt(req.params.id, 10);
  try {
    const sponsor = await SponsorModel.findByPk(sponsorId);
    if(sponsor){
        await SponsorModel.destroy({
        where: { id: sponsorId }
      });
      res.status(200).json({ success: true });
    } else{
      res.status(404).json({ message: 'Sponsor not found' });
    }
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
});


(async () => {
  try {
    const sequelizeStatus = await sequelize.sync();
    console.log("your server is up and running");
    app.listen(port, () => console.log(`Listening on port ${port}`));
  } catch (e) {
    console.log(e, 'Database issue.');
  }
})();
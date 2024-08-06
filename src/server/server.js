const express = require('express');
const bodyParser = require("body-parser");
const { Sequelize, DataTypes } = require("sequelize");
const multer  = require('multer');
const path = require('path');
const dotenv = require('dotenv');
const bcrypt = require('bcryptjs');
const saltRounds = 10;

dotenv.config({ path: path.resolve(__dirname, '../../.env') })

const usersSchema = require('../modals/user');
const registerPlayerSchema = require('../modals/registerPlayer');
const sponsorsSchema = require('../modals/sponsors');
const announcementSchema = require('../modals/announcement');
const resetTokenSchema = require('../modals/resetToken');
const teamTokenGenSchema = require('../modals/teamTokenGenerator');

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
const AnnouncementModel = announcementSchema(sequelize, DataTypes);
const ResetTokenModel = resetTokenSchema(sequelize, DataTypes);
const TeamTokenGenModel = teamTokenGenSchema(sequelize, DataTypes);


//app.use(cors());

// CORS configuration
// app.use(cors({
//   origin: ['https://www.atleticobrisbane.com.au', 'https://atleticobrisbane.com.au'], // Replace with your actual client domain
//   methods: 'GET,POST,PUT,DELETE',
//   credentials: true
// }));

// Define allowed origins
const allowedOrigins = [
  'https://www.atleticobrisbane.com.au',
  'https://atleticobrisbane.com.au'
];

// CORS options
const corsOptions = {
  origin: function (origin, callback) {
    if (allowedOrigins.includes(origin) || !origin) {
      callback(null, true); // Allow the origin
    } else {
      callback(new Error('Not allowed by CORS')); // Reject the origin
    }
  },
  methods: 'GET, POST, PUT, DELETE, OPTIONS',
  allowedHeaders: 'Content-Type, Authorization',
  credentials: true
};

// Apply CORS middleware
app.use(cors(corsOptions));

// Handle preflight OPTIONS requests
app.options('*', cors(corsOptions));



app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    // Use path.join to create an absolute path
    const uploadPath = path.join(__dirname, '../../public/images/');
    cb(null, uploadPath);
  },
  filename: function (req, file, cb) {
    var ext = file.originalname.split('.').pop();
    cb(null, file.fieldname + '-' + Date.now() + '.' + ext);
  }
});


var upload = multer({ storage: storage });

const validCode = process.env.ATLETICO_JOIN_CODE;
const sajuCode = process.env.RESET_CODE_SAJU;
const arunCode = process.env.RESET_CODE_ARUN;
const clitusCode = process.env.RESET_CODE_CLITUS;
const vinCode = process.env.RESET_CODE_VINOD;
const manualToken = process.env.ATLETICO_MANUAL_TOKEN;

/* Below service is used to login to the Atletico club site by an admin user */

app.post('/service/login', async (req, res) => {
  try {
    const userEmail = req.body.email;
    const userPassword = req.body.password;
   // const sqlQuery = await UserModel.findOne({ attributes: ['email', 'password'] }, { where: { email: userEmail } });
    const sqlQuery = await UserModel.findOne({
      attributes: ['email', 'password'],
      where: { email: userEmail }
    });
    console.log("Records from DB" + sqlQuery);
    if (sqlQuery == null || sqlQuery == '') {
      res.status(403).json({ fail: "Invalid admin user details !" });
    }
    const email = sqlQuery.email;
    const hashedPassword = sqlQuery.password;
    
    if (email === userEmail) {
      var comparedResult = bcrypt.compareSync(userPassword, hashedPassword);
      if (comparedResult) {
        res.status(200).json({ success: true });
      } else {
        res.status(403).json({ fail: "Sorry, password is incorrect!" });
      }      
    } else {
      res.status(403).json({ fail: "Sorry, email address is not correct!" });
    }
  } catch (e) {
    console.log(e);
    res.status(500).json();
  }
});

/* Below service is used to send request to register a player to the Atletico club */
app.put('/service/registerPlayer', upload.single('profilePhoto'), async (req, res, next) => {

  try {

    const { name, mobile, email, jerseynumber, ageGroup, position, favclub, comments, code } = req.body;

    if (code == validCode) {
      const playerEmail = await RegisterModel.count({ where: { email: email } });

      if ( playerEmail == 0) {
        let photoPath = 'barca.PNG';
        if (req.file) {
          photoPath = req.file.path.replace(/^public\\/, ''); 
        } 
        var playerData = { name: name, mobile: mobile, email: email, jerseynumber: jerseynumber, agegroup: ageGroup, position: position, photo: photoPath, favclub: favclub, comments: comments, code: code};
        await RegisterModel.create(playerData);
        res.status(200).json({ success: true });

      } else {
        let photoPath = 'barca.PNG';
        if (req.file) {
          photoPath = req.file.path.replace(/^public\\/, ''); 
        }
        var updatePlayerData = { name: name, mobile: mobile, jerseynumber: jerseynumber, agegroup: ageGroup, position: position, photo: photoPath, favclub: favclub, comments: comments, code: code };
        await RegisterModel.update(updatePlayerData, { where: { email: email } });
        res.status(200).json({ success: true });

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
      //const hidePhoto = player.hidePhoto === true ? 'Yes' : null;
      const hidePhoto = player.hidePhoto === 'Yes' ? 'Yes' : null;

      if (status !== null || hidePhoto !== null ) {
        await RegisterModel.update(
          { 
            status: status, 
            hidephoto: hidePhoto 
          },
          { where: { id: player.id } }
        );
        return { ...player, status, hidePhoto };  // Return the updated player with the new status
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
      attributes: ['name', 'position', 'photo', 'jerseynumber', 'favclub', 'hidephoto'],
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


/* Below get method will pull the U16 squad players data list from the database and pass to U16 page */ 
app.get('/service/u16playersList', async (req, res) => {
  try {
    const players = await RegisterModel.findAll({
      attributes: ['name', 'position', 'photo', 'jerseynumber', 'favclub', 'hidephoto'],
      where: {
        status: 'Yes',
        agegroup: 'U16'
      }
    });
    res.status(200).json({ players });
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
});


/* Below get method will pull the U12 squad players data list from the database and pass to U12 page */ 
app.get('/service/u12playersList', async (req, res) => {
  try {
    const players = await RegisterModel.findAll({
      attributes: ['name', 'position', 'photo', 'jerseynumber', 'favclub', 'hidephoto'],
      where: {
        status: 'Yes',
        agegroup: 'U12'
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
      attributes: ['name', 'position', 'photo', 'jerseynumber', 'favclub', 'hidephoto'],
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


/* Adding an announcement details by an admin person from the announcement component */ 
app.post('/service/announcementdetails', upload.single('announceImage'), async (req, res, next) => {

  try {

    const { heading, urllink, description, email } = req.body;
    let photoPath = 'images/updates.PNG';
    if (req.file) {
      photoPath = req.file.path.replace(/^public\\/, '');
    }
    var announcementData = { announcementheading: heading, image: photoPath, urllink: urllink, description: description, email: email };
    await AnnouncementModel.create(announcementData);
    res.status(200).json({ success: true });

  } catch (e) {
    console.log(e);
    res.status(500).json({ message: e.message });
    return next(e);
  }
});


/* Update an announcement details via edit pen icon in the announcement page */
app.put('/service/update-announcement-details/:id', upload.single('announceImage'), async (req, res, next) => {
  const announcementId = parseInt(req.params.id, 10);
  const { heading, urllink, description, email } = req.body;

  try {
    const announcement = await AnnouncementModel.findByPk(announcementId);
    if (announcement) {

      let photoPath = 'images/updates.PNG';

      var updateAnnouncementData = { announcementheading: heading, image: photoPath, urllink: urllink, description: description, email: email };
      if (req.file) {
        
        updateAnnouncementData.image = req.file.path.replace(/^public\\/, '');

        await AnnouncementModel.update(updateAnnouncementData, {
          where: {
            id: announcementId
          }
        });
        const updatedAnnouncement = await AnnouncementModel.findByPk(announcementId);
        res.status(200).json({ message: 'Announcement details updated successfully', announcement: updatedAnnouncement });
      }
    } else {
      res.status(404).json({ message: 'Announcement not found' });
    }
  } catch (e) {
    console.log(e);
    res.status(500).json({ message: e.message });
    return next(e);
  }
});


/* Below delete service will delete an announcement by an admin user from the website */ 
app.delete('/service/deleteAnnouncement/:id', async (req, res) => {
  const announcementId = parseInt(req.params.id, 10);
  try {
    const announcement = await AnnouncementModel.findByPk(announcementId);
    if(announcement){
        await AnnouncementModel.destroy({
        where: { id: announcementId }
      });
      res.status(200).json({ success: true });
    } else{
      res.status(404).json({ message: 'Announcement details not found' });
    }
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
});


/* Below get service method will get the list of announcements from database to display under the General updates area */ 
app.get('/service/announcementsList', async (req, res) => {
  try {
    const announcements = await AnnouncementModel.findAll({
      attributes: ['id','announcementheading', 'email', 'image', 'urllink', 'description', 'createdAt']
    });
    res.status(200).json({ announcements });
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
});

const generateToken = async () => {
  const currentDate = new Date().toISOString();
  const baseString = `${currentDate}+atletico+bris`;
  return await bcrypt.hash(baseString, saltRounds);
};


/* Generate and Save token to database for reset */
app.put('/service/generateAndSaveToken', async (req, res) => {
  try {
    const token = await generateToken();
    var tokenData = { token: token };
    await ResetTokenModel.create(tokenData);
    res.status(200).json({ token });
  } catch (error) {
    res.status(500).json({ error: 'Failed to generate token' });
  }
});

/* Get latest token from database */
app.get('/service/getLatestToken', async (req, res) => {
  try {

    const tokenData = await ResetTokenModel.findOne({
      attributes: ['id', 'token', 'createdAt'],
      order: [['createdAt', 'DESC']],
    });

    const token = tokenData.token;

    if (token != null) {
      res.status(200).json({ token });
    } else {
      res.json({ valid: false });
    }

  } catch (error) {
    res.status(500).json({ error: 'Failed to get the token details' });
  }
});


app.post('/service/verifyEmail', async (req, res) => {
  const { email } = req.body;

  try {

    const userEmail = await UserModel.findOne({
      attributes: ['email'],
      where: { email: email }
    });

    if (userEmail) {
      res.json({ valid: true });
    } else {
      res.json({ valid: false });
    }

  } catch (error) {
    res.status(500).json({ error: 'Failed to get the email details' });
  }
});

/* API to verify the token for reset pp  */
app.post('/service/verifyToken', async (req, res) => {

  const { token } = req.body;
  try {

    const tokenData = await ResetTokenModel.findOne({
      attributes: ['id', 'token', 'createdAt'],
      order: [['createdAt', 'DESC']],
    });

    if (!tokenData) {
      console.log('Token not found');
      return null;
    }
    if (token === tokenData.token) {
      res.json({ valid: true });
    } else if (token == manualToken) {
      res.json({ valid: true });
    } else {
      res.json({ valid: false });
    }
  } catch (error) {
    res.status(500).json({ error: 'Failed to generate a token' });
  }

});

/* API to verify the reset code  */
app.post('/service/verifyResetCode', (req, res) => {
  
  const { resetCode } = req.body;
  if (resetCode === sajuCode ) {
    res.json({ valid: true });
  }else if (resetCode === arunCode) {
    res.json({ valid: true });
  } else if (resetCode === clitusCode) {
    res.json({ valid: true });
  } else if (resetCode === vinCode) {
    res.json({ valid: true });
  } else {
    res.json({ valid: false });
  }
});

/* Saving new password via reset password flow */
app.post('/service/resetPassword', async (req, res) => {

  const { email, newPassword } = req.body;
  
  try {

    // Find the user by email
    const user = await UserModel.findOne({
      where: { email: email }
    });

    // Check if the user exists
    if (user) {
      // Update the password
      const hashedPassword = await bcrypt.hash(newPassword, 10);
      await user.update({ password: hashedPassword });
      res.json({ success: true });
    } else {
      console.log('User not found.');
    }
  } catch (error) {
    console.error('Error updating password:', error);
  }
});

/* For team generator generate token and save in database along with mobile number and name */
app.post('/service/teamTokenGenerator', async (req, res) => {

  try {

    const { name, mobile } = req.body;

    const getRandomThreeLetters = (str) => {
      const upperName = str.toUpperCase();
      const shuffled = upperName.split('').sort(() => 0.5 - Math.random()).join('');
      return shuffled.substring(0, 3);
    };
    const randomThreeLetters = getRandomThreeLetters(name);
    const lastFourDigits = mobile.replace(/\D/g, '').slice(-4);
    const randomChars = (Math.random() + 1).toString(36).substring(2, 5).toUpperCase();
    const token = `${randomThreeLetters}-${randomChars}-${lastFourDigits}`;
    const newTokenEntry = await TeamTokenGenModel.create({ name, mobile, token });
    res.status(200).json({ token, message: 'Token generated and saved successfully', data: newTokenEntry });
  } catch (e) {
    console.error(e); // Log the error for debugging
    res.status(500).json({ error: 'An error occurred while generating the token' });
  }
});

/* For team generator validate token to diplay Team Generator page */
app.get('/service/validate-token', async (req, res) => {
  const { mobile, token } = req.query;
  try {
    
    const tokenData = await TeamTokenGenModel.findOne({
      where: { mobile },
      attributes: ['id', 'token', 'createdAt'],
      order: [['createdAt', 'DESC']],
    });
    if (!tokenData) {
      return res.status(404).json({ isValid: false, message: 'Token not found' });
    }

    // Check if the provided token matches the latest token
    const isValid = tokenData.token === token;
    res.status(200).json({ isValid });

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to get the token details' });
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
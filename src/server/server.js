const express = require('express');
const bodyParser = require("body-parser");
const { Sequelize, DataTypes } = require("sequelize");
const path = require('path');
const dotenv = require('dotenv');
const bcrypt = require('bcryptjs');

dotenv.config({ path: path.resolve(__dirname, '../../.env') })

const usersSchema = require('../modals/user');

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

app.use(cors()) // Use this after the variable declaration

// app.use(cors({
//   origin: "http://localhost:3000"
// }));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


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
        res.status(403).json({ fail: "Password is incorrect..!" });
      }      
    } else {
      res.status(403).json({ fail: "Email address is not correct..!" });
    }
  } catch (e) {
    console.log(e);
    res.status(500).json();
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
const cors = require("cors");
const express = require("express");
//var config = require('./dbconfig.js');
const {Sequelize,DataTypes }= require('sequelize');


const sequelize = new Sequelize('DBTEST2','sa', 'Morales90', {
    dialect: 'mssql',
    dialectOptions: {
      // Observe the need for this nested `options` field for MSSQL
      options: {
        // Your tedious options here
        useUTC: false,
        dateFirst: 1
      }
    }
  });

const app = express();

var corsOptions = {
  origin: "http://localhost:8081"
};

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

  const Categoria = sequelize.define('TBL_CATEGORIA', {
    // Model attributes are defined here
    CAT_ID: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    CAT_NOMBRE: {
      type: DataTypes.STRING
    },
    CAT_OBS: {
        type: DataTypes.STRING
      }
  });

  const TB_USER = sequelize.define(
    "TB_USERs",
    { firstName: Sequelize.STRING },
    { timestamps: false }
  );

// simple route
app.get("/", (req, res) => {
  //res.json({ message: "Welcome to Student App - Backend!!!" });
  try {
    sequelize.authenticate();
    console.log('Connection has been established successfully.');
/*       Categoria.create({
        // CAT_ID : 0,
        CAT_NOMBRE: "Espuma limpiadora PC",
        CAT_OBS : "espuma pc"
      }); */
      TB_USER.create({
        firstName: "mazatlan"
      });
      

  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
});

// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is up and running on port ${PORT}.`);
});
const express = require('express');
const Sequelize = require('sequelize');
const bodyParser = require('body-parser');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');
const app = express();


app.use(bodyParser.json());

// seting up sqlite
const sequelize = new Sequelize('database', 'root', null, {
  host: 'localhost',
  dialect: 'sqlite',
  operatorsAliases: false,

  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  },

  // SQLite only
  storage: '../Database/database.sqlite',
});

sequelize
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });


  const User = sequelize.define('user', {
    email: {
      type: Sequelize.STRING
    },
    password: {
      type: Sequelize.STRING
    },
  });


//   User.findAll().then(users => {
//     console.log(users)
//   })


// routes

app.post('/api/signin', function(req, res) {
    const user = {
        email: req.body.email
    };
    const password = req.body.password;

    const validUser = User.find({
        attributes: ['email', 'password'],
        where: {
            email: user.email,
            password: password
        }
    });

    bcrypt.compare(password, validUser.password, function(err, valid) {
        if (valid) {
            res.json({
                success: true,
            });
        } else {
            res.json({
                success: false,
            });
        }
    })
});

app.post('/api/signup', function(req, res) {
    const newUser = {
        email: req.body.email,
    };
    const password = req.body.password;
    // console.log('this is req', req.body)
    bcrypt.hash(password, 10, function(err, hash) {
        // console.log('this is hash', hash)
        if (!err && hash) {
            newUser.password = hash;
            User.sync().then(() => {
                // Table created
                return User.create(newUser);
            });
            res.json({
                success: true,
            });
        } else {
            res.json({
                success: false,
            });
        }
    })
})

app.get('*', function(req, res) {
    console.log('get request from react app')
   res.send('app is working');
})

module.exports = app;
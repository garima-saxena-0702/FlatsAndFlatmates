const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const dbURL ='mongodb://localhost:27017/'

const userRoutes = require('./routes/user');

const app = express();

mongoose.connect(dbURL, {useUnifiedTopology: true,  useNewUrlParser: true, useCreateIndex: true });

    mongoose.connection.on('connected', function(){
        console.log("Mongoose default connection is open to ", dbURL);
    });

    mongoose.connection.on('error', function(err){
        console.log("Mongoose default connection has occured "+err+" error");
    });

    mongoose.connection.on('disconnected', function(){
        console.log("Mongoose default connection is disconnected");
    });

    process.on('SIGINT', function(){
        mongoose.connection.close(function(){
            console.log("Mongoose default connection is disconnected due to application termination");
            process.exit(0)
        });
});

app.use(bodyParser.json({ useNewUrlParser: true }));
app.use('/images', express.static(path.join('images')));

app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept, Autherization"
    );
    res.setHeader(
      "Access-Control-Allow-Methods",
      "GET, POST, PATCH, PUT, DELETE, OPTIONS"
    );
    next();
  });

app.use('/api/user',userRoutes);

module.exports = app;

const express = require('express');
const app = express();

app.get('*', function(req, res) {
    console.log('get request from react app')
   res.send('app is working');
})

module.exports = app;
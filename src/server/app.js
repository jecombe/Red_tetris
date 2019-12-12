import express from 'express';

const path = require('path');

const app = express();
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../client', 'index.html'));
});

module.exports = app;

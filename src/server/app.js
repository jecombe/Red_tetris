import express from 'express';

const path = require('path');
const rootDir = require('./utils/path');

const app = express();
app.get('/', (req, res) => {
  res.sendFile(path.join(rootDir, 'client', 'index.html'));
});

module.exports = app;

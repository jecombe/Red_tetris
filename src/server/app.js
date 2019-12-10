import express from 'express';

const path = require('path');
const rootDir = require('./helpers/path');
const app = express();

app.get('/', (req, res) => {
  res.sendFile(path.join(rootDir, 'client', 'index.html'));
});

export default app;

const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const cors = require('cors');

const app = express();

const server = require('http').Server(app);
const io = require('socket.io')(server);

mongoose.connect('mongodb://BrenoGO:1q2w3e@ds235947.mlab.com:35947/omnistack7', {
  useNewUrlParser: true,
});

app.use((req, res, next) => {
  req.io = io;
  next();
});
app.use(cors());
app.use('/files', express.static(path.resolve(__dirname, '..', 'uploads', 'resized')));

app.use(require('./routes'));

server.listen(3333);

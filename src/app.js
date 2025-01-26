const express = require('express');
const cors = require('cors');
const httpStatus = require('http-status');
const api = require('./routes/api');
const userRoutes = require('./api/users/routes/user.routes');
const app = express();


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.options('*', cors());

app.use('/api', api);
// app.use('/auth', userRoutes);

module.exports = app;
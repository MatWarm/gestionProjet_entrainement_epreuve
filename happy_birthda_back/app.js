const express = require('express');
const cors = require('cors');
var sequelize = require('./api/config/database');
const personBirthday = require('./api/models/personBirthday');
const quote = require('./api/models/quote');

const hostname = '0.0.0.0';
const port = 3002;

const server = express();

server.use(cors());
server.use(express.urlencoded());
server.use(express.json());

const birthdayRoute = require('./api/routes/birthdayRoute.js');
birthdayRoute(server);

const quoteRoute = require('./api/routes/quoteRoute.js');
quoteRoute(server);

sequelize.sync().then(() => {
  server.listen(port, hostname, () => {
    console.log(`Serveur qui tourne sur le port ${port}`);
  });
});


// catch 404 and forward to error handler
server.use(function(req, res, next) {
  next(createError(404));
});

// error handler
server.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // send the error response in JSON format
  res.status(err.status || 500).json({ error: err.message });
});

module.exports = server;
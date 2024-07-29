const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('database', 'user', 'pwd', {
    host: '192.168.1.113',
    dialect: 'mysql', // or 'sqlite', 'postgres', 'mssql'
    // Additional options like pool configuration could be here
});

module.exports = sequelize;
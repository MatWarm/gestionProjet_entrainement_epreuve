const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');


const quote = sequelize.define('Quote', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    quote: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    author: {
        type: DataTypes.STRING,
        allowNull: false,
    },
}, {
    tableName: 'Quote',
    timestamps: false,
});

module.exports = quote;
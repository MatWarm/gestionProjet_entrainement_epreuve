const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const personBirthday = sequelize.define('PersonBirthday', {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
    },
    birthday: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    lastname: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    firstname: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
    },
}, {
    tableName: 'PersonBirthday',
    timestamps: false,
});

module.exports = personBirthday;
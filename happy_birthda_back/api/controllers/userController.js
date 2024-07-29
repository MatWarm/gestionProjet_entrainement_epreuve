const user = require("../models/user");
const bcrypt = require('bcrypt');
const jwtToken = require('../utils/generateToken');
const SALT_ROUNDS = 10;


exports.createUser  = async (req, res) => {
    try {
        const data = req.body;
        const hashedPassword = await bcrypt.hash(data.password, SALT_ROUNDS)
        const newUser = await user.create({ ...data, password: hashedPassword });
        res.status(201).json({ message: 'User created successfully!', user: newUser });
    } catch (error) {
        res.status(500).json({ message: 'Failed to create user', error: error.message });
    }
}

exports.findUserByUsername = async (req, res) => {
    try {
        const username = req.params.username;
        const userFound = await user.findOne({ where: { username } });
        res.status(200).json({ user: userFound });
    }catch (error){
        res.status(500).json({ message: 'Failed to find user', error: error.message });
    }
}

exports.veriflogin = async (req, res) => {
    try{
        const { username, password } = req.body;
        const userFound = await user.findOne({ where: { username } });
        if (!userFound) {
            throw new Error('User not found');
        }
        const isPasswordValid = await bcrypt.compare(password, userFound.password);
        if (!isPasswordValid) {
            throw new Error('Incorrect password');
        }

        delete userFound.password
        const token = jwtToken.generateToken(userFound.dataValues);
        res.status(200).json({ message: 'User logged in successfully!', token: token });
    }catch (error){
        res.status(500).json({ message: 'Failed to login', error: error.message });
    }

}

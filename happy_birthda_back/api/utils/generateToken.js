const jwt = require('jsonwebtoken');

// algo : HS256
const secretKey = 'eyJhbGciOiJIUzI1NiJ9.eyJSb2xlIjoiQWRtaW4iLCJJc3N1ZXIiOiJJc3N1ZXIiLCJVc2VybmFtZSI6IkphdmFJblVzZSIsImV4cCI6MTcyMTg5NTA0OCwiaWF0IjoxNzIxODk1MDQ4fQ.v-bd5cqrBcBZPSisEYL4pRVcIwpqDf_5M4Vj-MCag5s';

const generateToken = (payload) => {
    const options = {
        expiresIn: '24h',
    };

    return jwt.sign(payload, secretKey, options);
};

const verifyToken = (token) => {
    return jwt.verify(token, secretKey);
};

module.exports = {
    generateToken,
    verifyToken
};

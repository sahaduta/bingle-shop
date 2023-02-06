const jwt = require('jsonwebtoken');
const ErrorResponse = require('../helpers/error.helper');

const verifyToken = (req, res, next) => {
    try {
        const bearerHeader = req.headers['authorization'];
        if (typeof bearerHeader != 'undefined') {
            const bearer = bearerHeader.split(' ');
            const bearerToken = bearer[1];
            
            result = jwt.verify(bearerToken, process.env.JWT_KEY);

            req.decodedJWT = result;
            
            next();
        }
    } catch (error) {
        return res.status(401).json({
            status: false,
            data: {},
            error
        })
    }

}

module.exports = verifyToken;
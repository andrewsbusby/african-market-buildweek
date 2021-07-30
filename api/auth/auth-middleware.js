const jwt = require('jsonwebtoken');
const { jwtSecret } = require('../../config/secrets');

module.exports = (req, res, next) =>{
    let token = req.headrs.authorization;
    if(!token) {
        return next({status: 401, message: 'login required, token missing'})
    }
    jwt.verify(token, jwtSecret, (err, decodedToken) => {
        if(err) {
            return next({status: 401, message: 'unauthorized user'})
        }
        req.jwt = decodedToken
    })
}
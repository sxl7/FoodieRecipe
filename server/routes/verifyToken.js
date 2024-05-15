const jwtToken = require('jsonwebtoken')

function auth (req, res,next){
    const token = req.header('auth-token');
    if(!token) return res.status(401).send('Access Denied');

    try{
        const verified = jwtToken.verify(token,process.env.JWT_TOKEN_KEY);
        req.user = verified;
        next();
    }catch(e){
        res.status(400).send('Invalid Token');
    }

}

module.exports = {auth}
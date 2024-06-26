const jwtToken = require('jsonwebtoken')

module.exports = function (req, res,next){
    const token = req.data.accessToken
    if(!token) return res.status(401).send('Access Denied');

    try{
        const verified = jwtToken.verify(token,process.env.JWT_TOKEN_KEY);
        req.user = verified;
        next();
    }catch(e){
        res.status(400).send('Invalid Token');
    }

}

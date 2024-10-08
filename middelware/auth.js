const jwt = require('jsonwebtoken')

const Auth = (req,res,next) => {
    //find token from header
    const token = req.cookies.token || req.headers['authorization']
    //check token is exist or not
    if (token) {
        req.isAuth = true; 
    } else {
        req.isAuth = false; // Not authenticated
    }

    //verify user from token
  
    const verifyUser = jwt.verify(token,process.env.TOKENSECRET,(err,decoded) => {

        if (err) {
            return res.status(403).json({ message: 'Invalid token' });
        }

        req.userId = decoded.userId
        req.isAuth = true
        next()

    })

}

module.exports = Auth
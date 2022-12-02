const jwt = require ('jsonwebtoken');
const secret_key ="This is my secret key"; //debe ser igual a lo largo de la app

module.exports.authenticate = (req, res, next) => {
    jwt.verify(req.cookies.usertoken, secret_key, (err, payload)=> {
        if(err) {
            res.status(401).json({message:"You are not allowed to be here, please sign up / login"})
        } else {
            next();
        }
    } )
}
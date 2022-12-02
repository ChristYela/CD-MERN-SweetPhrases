const User = require("../models/user.model");
const jwt = require('jsonwebtoken');
const secret_key = "This is my secret key"; //Debe ser la misma a lo largo de toda nuestra app

const bcrypt = require('bcrypt');

module.exports.register = (req, res) => {
    const user = new User(req.body);
    user.save()
        .then(user =>{
            //res.json(usuario);
            
            //Ponemos un payload -> todo lo que queremos guardar
            const payload = {
                _id: user._id
            }

            //Creamos nuestro token
            const myJWT = jwt.sign(payload, secret_key);

            res.cookie("usertoken", myJWT, secret_key,{
                    httpOnly: true //Esto significa que la cookie solamente puede ser leída por el servidor
                }).json(user);


        })
        .catch(err => res.status(400).json(err));
}

module.exports.login = (req, res) => {
    User.findOne({email: req.body.email})
        .then(user => {
            if(user === null) {
                res.json({error: true, message: "Wrong Email Address."});
            } else {
                bcrypt.compare(req.body.password, user.password)
                    .then(passwordValid => {
                        if(passwordValid) {
                            const payload = {
                                _id: user._id
                            }

                            const myJWT = jwt.sign(payload, secret_key);

                            res
                                .cookie("usertoken", myJWT, secret_key, {
                                    httpOnly: true
                                })
                                .json({error: false, message: "Log In correct."})

                        } else {
                            res.json({error: true, message: "Wrong Password."});
                        }
                    })
            }
        })
}

module.exports.logout = (req, res) => {
    res.clearCookie('usertoken');
    res.json({message: "Log Out!"});
}
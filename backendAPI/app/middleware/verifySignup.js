
const db = require("../models");
const ROLES = db.ROLES;
const User = db.user;

checkDupNameEmail = (req, res, next) => {
    //Checando Username
    User.findOne({
        where: { username: req.body.username }
        }).then (user => {
            if (user) 
            {
                res.status(400).send({ message: "Errou! Username já está em uso!" })
                return;
            }

            //Checando Email
            User.findOne({
                where: { email: req.body.email }
            }).then (user=> 
                {
                if (user) {
                    res.status(400).send({ message: "Errou! Email já está em uso!" 
                });
                return;
            }; 
            next();
        });
    });
};

checkRolesExisted = (req, res, next) => {
    if (req.body.roles) {
        for (let i = 0; i < req.body.roles.length; i++) {
            if (!ROLES.includes(req.body.roles[i])) {
                res.status(400).send({
                    message: `Não existe a role ${req.body.roles[i]}`
                });
                return;
            }
        }
    }
    next();
};

const signupVerify = {
    checkDupNameEmail: checkDupNameEmail,
    checkRolesExisted: checkRolesExisted
};

module.exports = signupVerify;

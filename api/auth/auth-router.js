const express = require('express');
const router = express.Router();

const bcryptjs =  require('bcryptjs');
const tokenBuilder = require('./tokenbuilder');
const Owners = require('../owners/owner-model');

router.post('/register', (req, res, next)=> {
    const credentials = req.body;
    const crypt = process.env.BCRYPT_ROUNDS || 8;
    const hash = bcryptjs.hashSync(credentials.password, crypt);

    credentials.password = hash;
    Owners.register(credentials)
        .then(([owner])=> {
            res.status(201).json({message: `Welcome ${owner.email}`, owner})
        })
        .catch(next)
})

router.post('/login', (req, res, next)=> {
    const creds = req.body;
    Owners.login({ email: creds.email})
        .then(user => {
            if(user && bcryptjs.compareSync(creds.password, user.password)) {
                let token = tokenBuilder(user);
                res.status(200).json({message: `Welcom back ${user.email}`, token})
            } else {
                next({ status: 401, message: 'invalid credentials'})
            }
        })
        .catch(next)
})

module.exports = router;
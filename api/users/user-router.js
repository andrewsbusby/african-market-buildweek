const router = require('express').Router()
const Users = require('../owners/owner-model');

router.get('/', (req, res, next)=> {
    Users.getListings()
        .then(listings => {
            if(listings){
                res.status(200).json(listings)
            } else {
                res.status(400).json({
                    message: 'no listings found'
                })
            }
        })
        .catch(next)
})

module.exports = router;
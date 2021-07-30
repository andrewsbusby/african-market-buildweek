const router = require('express').Router();
const Owner = require('./owner-model');

//GETS OWNER INFROMATION
router.get('/', (req, res, next) => {
    let ownerId = req.jwt.subject;
    Owner.getOwner(ownerId)
        .then(owner => {
            res.status(200).json(owner)
        })
        .catch(next)
})

//GETS ALL ITEMS LISTINGS 
router.get('/listing', (req, res, next) => {
    let ownerId = req.jwt.subject;
    Owner.getAllOwnerItems(ownerId)
        .then(items => {
            if(items == null) {
                res.status(404).json({message: 'no listing found'})
            } else {
                res.status(200).json(items)
            }
        })
        .catch(next)
})

//POST NEW ITEM LISTING
router.post('/listing', (req, res, next)=> {
    let ownerId = req.jst.subject
    let listing = {...req.body, owner_id: ownerId}

    Owner.addListing(listing)
        .then(([newListing]) =>{
            newListing.listing_price = Number(newListing.listing_price)
            res.status(201).json(newListing)
        })
        .catch(next)
})

//GET LISTING BY ID
router.get('/listing/:id', (req, res, next)=> {
    let { id } = req.params;
    Owner.getItemById(id)
        .then(listing =>{
            if(!listing) {
                res.status(404).json({message: `no item with id matching ${id} found`})
            } else {
                listing.listing_price = Number(listing.listing_price)
                res.status(200).json(listing)
            }
        })
        .catch(next)
})

//UPDATE    
router.put('/listing/:id', (req, res, next)=> {
    let id = req.params.id
    let changes = req.body
    if(changes.listing_catagory || changes.listing_name || changes.listing_description || changes.listing_location || changes.listing_price) {
        Owner.update(id, changes)
            .then(change => {
                if(!change) {
                    res.status(400).json({message: `no item with id matching ${id} found`})
                } else {
                    res.status(200).json(change)
                }
            })
            .catch(next)
    } else {
        res.status(400).json({message: 'requires at least one property to be updated'})
    }
})

//DELETE
router.delete('/listing/:id', (req, res, next)=> {
    let { id } = req.params

    Owner.remove(id)
        .then(removed => {
            if(removed == null) {
                res.status(400).json({message: `no item with id matching ${id} to delete found`})
            } else {
                if(removed > 0) {
                    res.status(200).json({message: `successfully removed listing under id: ${id}`})
                } else {
                    next();
                }
            }
        })
})

module.exports = router;
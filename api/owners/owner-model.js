const db = require('../data/db-config');

function register(owner) {
    return db('owners').insert(owner, ['owner_id', 'email', 'location'])
}

async function login(filter){
    let owner = await db('owner as o').select('o.owner_id', 'o.email', 'o.password').where(filter).first()
    return owner
}

function addListing(listing){
    return db('listings').insert(listing, ['listing_id', 'owner_id', 'listing_catagory', 'listing_name', 'listing_descrition', 'listing_location', 'listing_price'])
}

async function getOwner(ownerId){
    let ownerInfo = await db('owners').select('owner_id', 'email', 'location', 'profile_url').where('owner_id', ownerId).first();
    let ownerItemCount = await db('listings').countDistict('listing_name').where('owner_id', ownerId)

    return {
        ...ownerInfo,
        items: Number(ownerItemCount.count)
    }
}

function getItemById(id){
    return db('listings').where('listing_id', id).first()
}

async function update(id, change){
    let returned = await getItemById(id)
    if(!returned) {
        return null
    } else {
        return db('listings').where('listing_id', id)
            .update(change, ['listing_id', 'owner_id', 'listing_catagory', 'listing_name', 'listing_descrition', 'listing_location', 'listing_price'])
    }
}

async function remove(id){
    let item = await getItemById(id)
    return !item ? null : db('listings').where('listing_id', id).del()
}


// ==============FOR USERS=====================

async function getListings(){
    let listings = await db('listings')
    if(listings.lenth == 0){
        return null
    } else {
        return listings.map(listing => (
            {
            ...listing,
            listing_price: Number(listing.listing_price)}
        ))
    }
}

module.exports = {
    register,
    login,
    addListing,
    getOwner,
    getItemById,
    update,
    remove,
    getListings
}
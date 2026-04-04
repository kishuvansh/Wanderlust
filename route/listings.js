const express = require('express');
const router = express.Router();
const wrapAsync = require('../utils/wrapAsync.js');
const Listing = require('../models/listing');
const { isloggedIn, isOwner } = require("../middleware.js");
const { validateListing } = require("../middleware.js");

const listingControler = require('../controllers/listing.js');
const { listingSchema } = require('../schema.js');
// index
router.get("/", wrapAsync(listingControler.index));

// create new listing form
router.get("/new", isloggedIn, listingControler.randerNew);

// create route
router.post("/", validateListing, isloggedIn,
    wrapAsync(listingControler.createNew)
);
// cancel button from create new listing form
router.get('/', wrapAsync(async (req, res) => {
    res.redirect('/listings');

}));
// show route 
router.get("/:id", wrapAsync(listingControler.show));

router.get("/:id/edit", isloggedIn, wrapAsync(listingControler.editform));
// update route
router.put('/:id',
    isloggedIn,
    isOwner,
    validateListing,
    wrapAsync(listingControler.update));

// back to listings from show page
router.get('/', async (req, res) => {
    res.redirect('/listings');
})
// delete route
router.delete("/:id", isloggedIn, isOwner,
    wrapAsync(listingControler.deleteListing))
module.exports = router;
const express = require('express');
const router = express.Router();
const wrapAsync = require('../utils/wrapAsync.js');
const { isloggedIn, isOwner } = require("../middleware.js");
const { validateListing } = require("../middleware.js");
const listingControler = require('../controllers/listing.js');
const multer = require('multer');
const { storage } = require("../cloudConfig.js");
const upload = multer({ storage: storage })
router
    .route("/")
    // index
    .get(wrapAsync(listingControler.index))
    // create route
    .post(isloggedIn,
        upload.single("listing[image]"),
        validateListing,
        wrapAsync(listingControler.createNew)
    )

    // cancel button from create new listing form
    .get(wrapAsync(async (req, res) => {
        res.redirect('/listings');

    }))
    .get(async (req, res) => {
        res.redirect('/listings');
    })

// create new listing form
router.get("/new", isloggedIn, listingControler.randerNew);

router
    .route("/:id")
    // show route 
    .get(wrapAsync(listingControler.show))
    // delete route
    .delete(isloggedIn, isOwner,
        wrapAsync(listingControler.deleteListing))
    // update route
    .put(
        isloggedIn,
        isOwner,
        upload.single("listing[image]"),
        validateListing,
        wrapAsync(listingControler.update));


router.get("/:id/edit", isloggedIn, wrapAsync(listingControler.editform));



module.exports = router;
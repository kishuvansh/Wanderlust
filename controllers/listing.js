const Listing = require("../models/listing");
module.exports = {
    index: async (req, res) => {
        const allListings = await Listing.find({});
        res.render("listings/index", { allListings });
    },
    randerNew: (req, res) => {
        res.render("listings/new");
    },
    createNew: async (req, res, next) => {
        let url = req.file.path || req.file.url || req.file.secure_url;
        let filename = req.file.filename || req.file.public_id;
        const newlisting = new Listing(req.body.listing);
        newlisting.owner = req.user._id;
        newlisting.image = { url, filename };
        await newlisting.save();
        req.flash("success", "New listing created successfully!");
        res.redirect("/listings");
    },
    show: async (req, res) => {
        const { id } = req.params;
        const listing = await Listing.findById(id)
            .populate({
                path: "reviews", populate: { path: 'author' }
            })
            .populate("owner");
        if (!listing) {
            req.flash("error", "Listing not found");
            return res.redirect("/listings");
        }
        res.render("listings/show", { listing });
    },
    update: async (req, res) => {
        let { id } = req.params;
        let listing = await Listing.findByIdAndUpdate(id, { ...req.body.listing });
        if (!listing) {
            req.flash("error", "Listing not found");
            return res.redirect("/listings");
        }
        if (typeof req.file !== "undefined") {
            let url = req.file.path || req.file.url || req.file.secure_url;
            let filename = req.file.filename || req.file.public_id;
            listing.image = { url, filename };
            await listing.save();
        }
        
        req.flash("success", "Listing updated successfully!");
        res.redirect(`/listings/${id}`);
    },
    editform: async (req, res) => {
        let { id } = req.params;
        let listing = await Listing.findById(id);
        if (!listing) {
            req.flash("error", "Listing not found");
            return res.redirect("/listings");
        }
       let orignalImage= listing.image.url;
       orignalImage.replace("upload/","upload/w_250");
        res.render('listings/edit.ejs', { listing });
    },
    deleteListing: async (req, res) => {
        let { id } = req.params;
        await Listing.findByIdAndDelete(id);
        req.flash("success", "Listing deleted successfully!");
        res.redirect('/listings');
    }

}

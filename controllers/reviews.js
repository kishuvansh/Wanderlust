const Review = require('../models/review.js');
const Listing = require('../models/listing.js');

module.exports={
    createNew:async (req, res) => {
        let listing = await Listing.findById(req.params.id);
        let newreview = new Review(req.body.review);
        // listing.reviews.push(newreview);
        newreview.author=req.user._id;
        await newreview.save();
        listing.reviews.push(newreview._id);
        await listing.save();
        req.flash("success","New review created successfully!");
        res.redirect(`/listings/${listing._id}`);
    },
    deleteReview:async (req, res) => {
    let { id, reviewId } = req.params;
    // $pull work as pull the reviewId from reviews array in listing and then delete the review document from review collection using reviewId 
    await Listing.findByIdAndUpdate(id, { $pull: { reviews: reviewId } });
    await Review.findByIdAndDelete(reviewId);
    req.flash("success","Review deleted successfully!");
    res.redirect(`/listings/${id}`);
}
}
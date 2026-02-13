const express=require('express');
const app=express();
const Listing=require('./models/listing');
const mongoose=require('mongoose');
const path=require('path');
const methodeOverride=require('method-override');
const ejsMate=require('ejs-mate'); 
const {listingSchema,reviewSchema}=require("./schema.js");
const Review=require("./models/review.js");
const wrapAsync = require('./utils/wrapAsync.js');
const ExpressError=require("./utils/ExpressError.js");  




app.set("view engine","ejs");
app.set("views",path.join(__dirname,"view"));
app.use(express.urlencoded({extended:true}));
app.use(express.json());
app.use(methodeOverride("_method"));
app.use(express.static(path.join(__dirname,'public')));
app.engine('ejs',ejsMate);
app.get('/',(req,res)=>{
    res.send("Welcome to Wanderlust");
})

main()
.then(()=>{
    console.log('connected to Db');
})
.catch((err)=>{
    console.log(err);
});
async function main(){
    await mongoose.connect('mongodb://127.0.0.1:27017/wanderlust');
}

const validateListing=(req,res,next)=>{
    let {error}=listingSchema.validate(req.body);
      if(error){
        let errMsg=error.details.map((el)=>el.message).join(",");
    throw new ExpressError(400,errMsg);
  }
  else{
    next();
  }
}
const validateReview=(req,res,next)=>{
    let {error}=reviewSchema.validate(req.body);
      if(error){
        let errMsg=error.details.map((el)=>el.message).join(",");
    throw new ExpressError(400,errMsg);
  }
  else{
    next();
  }
}

// const validateListing = (req, res, next) => {
//     console.log("--- Validation Check ---");
//     console.log("Raw req.body:", req.body); // If this is {}, the issue is Hoppscotch or Body-Parser

//     let { error, value } = listingSchema.validate(req.body);
    
//     console.log("Joi Value Result:", value);
//     console.log("Joi Error Result:", error);

//     if (error) {
//         let errMsg = error.details.map(el => el.message).join(",");
//         throw new ExpressError(400, errMsg);
//     } else {
//         next();
//     }
// };
// app.get('/testlisting',async (req,res)=>{
//     let sampelisting=new  Listing({
//         title:"My new Villa",
//         description:"A beautiful villa with sea view",
//         image:"",
//         location:"Goa",
//         country:"India",
//         price:2000
//     });
//    await sampelisting.save();
//     console.log('sample saved');
//     res.send("listing created");
// });
app.get("/listings",wrapAsync(async(req,res)=>{
const allListings=await Listing.find({});
res.render("listings/index",{allListings});
}));
// create new listing form
app.get("/listings/new",(req,res)=>{
    res.render("listings/new");
    
});

// create route
app.post("/listings",validateListing,
    wrapAsync(async(req,res,next)=>{
  const newlisting=new Listing(req.body.listing);
    console.log(newlisting);
    await newlisting.save();
    res.redirect("/listings");
})
);
// cancel button from create new listing form
app.get('/listings',wrapAsync(async(req,res)=>{
    res.redirect('/listings');
    
}));
// show route 
app.get("/listings/:id",async(req,res)=>{
    const {id}=req.params;
   const listing=await Listing.findById(id).populate("reviews");
   res.render("listings/show",{listing});
})
app.get("/listings/:id/edit",wrapAsync(async(req,res)=>{
    let {id}=req.params;
    let listing=await Listing.findById(id);
    res.render('listings/edit.ejs',{listing});
}));
// update route
app.put('/listings/:id',validateListing,
    wrapAsync(async(req,res)=>{
    let{id}=req.params;
    await Listing.findByIdAndUpdate(id,{... req.body.listing});
    res.redirect(`/listings/${id}`);
}))
// back to listings from show page
app.get('/listings',async(req,res)=>{
    res.redirect('/listings');
})
// delete route
app.delete("/listings/:id",wrapAsync(async(req,res)=>{
    let{id}=req.params;
    await Listing.findByIdAndDelete(id);
    res.redirect('/listings');
}))
// app.use((req, res, next) => {
//   next(new ExpressError(404, "404! page not found"));
// });

// reviews-post route to add new reviews related to listings 
app.post("/listings/:id/reviews",validateReview,wrapAsync(async(req,res)=>{
    let listing=await Listing.findById(req.params.id);
    let newreview =new Review(req.body.review);
    listing.reviews.push(newreview);
    await newreview.save();
    await listing.save();
    res.redirect(`/listings/${listing._id}`);
}));
// delete Review route 
app.delete("/listings/:id/reviews/:reviewId",wrapAsync(async(req,res)=>{
    let{id,reviewId}=req.params;
    // $pull work as pull the reviewId from reviews array in listing and then delete the review document from review collection using reviewId 
    await Listing.findByIdAndUpdate(id,{$pull:{reviews:reviewId}});
    await Review.findByIdAndDelete(reviewId);
    

   res.redirect(`/listings/${id}`);
}))
app.use((err,req,res,next)=>{
    let {statusCode=500,message="something went wrong"}=err;
    res.status(statusCode).render("error.ejs",{err});
    // res.send("something went wrong");

});

app.listen(8080,()=>{
    console.log("server is running on port 8080");
});

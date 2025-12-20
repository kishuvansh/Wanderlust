const express=require('express');
const app=express();
const Listing=require('./models/listing');
const mongoose=require('mongoose');
const path=require('path');
const methodeOverride=require('method-override');
const ejsMate=require('ejs-mate'); 

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
app.set("view engine","ejs");
app.set("views",path.join(__dirname,"view"));
app.use(express.urlencoded({extended:true}));
app.use(methodeOverride("_method"));
app.engine('ejs',ejsMate);
app.get('/',(req,res)=>{
    res.send("Welcome to Wanderlust");
})
app.use(express.static(path.join(__dirname,'public')));

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
app.get("/listings",async(req,res)=>{
const allListings=await Listing.find({});
res.render("listings/index",{allListings});
});
// create new listing form
app.get("/listings/new",(req,res)=>{
    res.render("listings/new");
    
});
// create route
app.post("/listings",async(req,res)=>{
    const newlisting=new Listing(req.body.listing);
    console.log(newlisting);
    await newlisting.save();
    res.redirect("/listings");
})
// cancel button from create new listing form
app.get('/listings',async(req,res)=>{
    res.redirect('/listings');
    
})
// show route 
app.get("/listings/:id",async(req,res)=>{
    const {id}=req.params;
   const listing=await Listing.findById(id);
   res.render("listings/show",{listing});
})
app.get("/listings/:id/edit",async(req,res)=>{
    let {id}=req.params;
    let listing=await Listing.findById(id);
    res.render('listings/edit.ejs',{listing});
})
// update route
app.put('/listings/:id',async(req,res)=>{
    let{id}=req.params;
    await Listing.findByIdAndUpdate(id,{... req.body.listing});
    res.redirect(`/listings/${id}`);
})
// back to listings from show page
app.get('/listings',async(req,res)=>{
    res.redirect('/listings');
})
// delete route
app.delete("/listings/:id",async(req,res)=>{
    let{id}=req.params;
    await Listing.findByIdAndDelete(id);
    res.redirect('/listings');
})
app.listen(8080,()=>{
    console.log("server is running on port 8080");
});

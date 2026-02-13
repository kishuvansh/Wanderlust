// const mongoose=require("mongoose");
// 
// const listingSchema=new Schema({
//     title:{
//         type:String
//         ,required:true,
//        },

//     description:String,

//     image:{
//         type:String,
//         default:"https://images.unsplash.com/photo-1537304119-36263d2db05b?q=80&w=1635&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
//         set:(v)=>v===""?
//         "https://images.unsplash.com/photo-1537304119-36263d2db05b?q=80&w=1635&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
//         :v,
//     },
//     price:Number,
//     location:String,
//     country:String

// });
// const listing=mongoose.model('Listing',listingSchema);
// module.exports=listing;


const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const review=require('./review');
const listingSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },

    description: String,

    image: {
        filename: {
            type: String,
            default: "",
        },
        url: {
            type: String,
            default:
                "https://images.unsplash.com/photo-1537304119-36263d2db05b?q=80&w=1635&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            set: (v) =>
                v === ""
                    ? "https://images.unsplash.com/photo-1537304119-36263d2db05b?q=80&w=1635&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                    : v,
        },
    },
    price: {
        type: Number,
        required: true,
    },
    location: {
        type: String,
        required: true,
    },
    country: {
        type: String,
        required: true,
    },
    reviews: [
        {
            type: Schema.Types.ObjectId,
            ref: "Review",
        }
    ]
});
listingSchema.post("findOneAndDelete",async(listing)=>{
    if(listing){
        await review.deleteMany({_id:{$in:listing.reviews}});
    }
})
module.exports = mongoose.model("Listing", listingSchema);

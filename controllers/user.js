const User = require('../models/user.js');
module.exports={
    signupform:(req,res)=>{
    res.render("listings/users/signup");
},
signUp:async (req,res)=>{
   try{ let {username,email,password}=req.body;
    const newUser=new User({email,username});
    const registedUser=await User.register(newUser,password);
    console.log(registedUser);
    req.login(registedUser,(err)=>{ 
        if(err){
            return next(err);
        }
        req.flash("success","welcome to WanderLust");
        res.redirect("/listings");
    });}
    catch(err){
        req.flash("error",err.message);
        res.redirect("/signup");
    }
},
loginform:async (req,res)=>{
    res.render('listings/users/login.ejs');
},
login:async(req,res)=>
{
    req.flash("success","Welcome to WanderLust!");
    res.redirect( res.locals.redirectUrl || "/listings");
},
logout:(req, res) => {
    req.logout((err) => {
        if (err) {
            next(err);
        }
        req.flash("success", "logged out successfully!");
        res.redirect("/listings");
    });
},
}
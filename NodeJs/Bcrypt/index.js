const express=require('express');
const app=express();
const User=require('./models/user');
const mongoose=require('mongoose');
const bcrypt=require('bcrypt');
const session = require('express-session');
app.use(express.urlencoded({extended:true}))
mongoose.connect('mongodb://localhost:27017/auth', {useNewUrlParser:true})
.then(()=>{
    console.log("MONGO CONNECTION OPEN!!!")
})
app.set('view engine',"ejs");
app.set('views','views');
app.use(session({secret: "notagood secret"}));

const requirelogin= (req,res,next)=>{
    if(!req.session.user_id) {
        return res.redirect('/login')
    }
    next();
}
app.get('/',(req,res)=>{
    res.send('This the home page')
})
app.get('/login',(req,res)=>{
    res.render('login')
})
app.post("/login",async (req,res)=>{
    const {email,password}=req.body;
    //User.findByUsernameAndValidate(email,password)
    const user =await User.findOne({email});
   const validPassword= await bcrypt.compare(password,user.password)
   if(validPassword){
    req.session.user_id=user._id;
  res.send("YAY WELCOME");
   }
   else{
    res.send("TRY AGAIN")
   }
})
app.get('/register',(req,res)=>{
    res.render('register')
})
app.post("/register",async (req,res)=>{
    const {username,email,password,}=req.body;
    const user =new User({
        username,
        email,
        password:password
    })
    await user.save();
    res.redirect('/')
})
app.get('/logout',(req,res)=>{
    req.session.user_id=null;
    //req.session.destroy();
    res.redirect('/');
})
app.get("/secret",requirelogin,(req,res)=>{
    
res.render('secret')
})
app.get("/topsecret",requirelogin,(req,res)=>{
    
res.send('topsecret')
})


app.listen(3001, () => {
    console.log("Listening on port 3001!");
});
  
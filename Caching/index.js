const express =require("express");
const app=express();
 const connection=require("./database/database");
const redis=require("./lib/cache");
//Middleware
app.use(express.json());
app.use(express.urlencoded({extended:false}));
const port=4000;

app.get('/',(req,res)=>{
    console.log("Hello");
     res.send("Hello");
})
const user = require('./route/user.js');
app.use('/user', user);
app.listen(port, () => {
    console.log(`Listening on port ${port}`);
    connection.connect(function(err){
        if(err)console.log(err)
        else{
        console.log("connected to mysql")
        }
    })
});
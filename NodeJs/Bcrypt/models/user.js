const mongoose=require('mongoose');
const bcrypt=require('bcrypt')
const userSchema=new mongoose.Schema({
    username:{
        type: String,
        required: [true, 'Username cannot be blank']
    },
    email:{
        type: String,
        required: [true, 'Email cannot be blank']
    },

    password: {
        type: String,
        required: [true,'Password cannot be blank']
    }


})
userSchema.pre('save',async function(next){
    this.password=await bcrypt.hash(this.password,12);
    next();
})
module.exports=mongoose.model('User',userSchema);
const  mongoose = require("mongoose");
const  bcrypt = require("bcrypt");

const UserSchema = mongoose.Schema({
    name:{
        type: String,
        require: true
    },
    email:{
        type: String,
        require: true
    },
    phone:{
        type: Number,
        require: true
    },
    password:{
        type: String,
        require: true
    },cpassword:{
        type: String,
        require: true
    },

})

UserSchema.pre('save', async function(next){
    if(this.isModified("password")){
        this.password = await bcrypt.hash(this.password, 12)
        this.cpassword = await bcrypt.hash(this.cpassword, 12)
    }
    next();
})

const User = mongoose.model('USER',UserSchema);
module.exports = User;
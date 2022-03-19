const express = require('express');
const router = express.Router()
const User = require('../models/userSchema')
const bcrypt = require('bcrypt')

router.get('/', (req, res)=>{
    res.send("Hello Router.jd");
});

router.post('/register', (req, res)=>{
    const {name, email, phone, password, cpassword} = req.body;

    if(!name || !email || !phone || !password || !cpassword){
        return res.status(422).json({error : "please fill all details"})
    }

    User.findOne({email: email})
    .then((userExist)=>{
        if(userExist){
            return res.status(422).json({error : "Email already exist"})
        }else if(password != cpassword){
            return res.status(422).json({error : "Password and confirm password not match"})
        }else{
            const user = new User({name, email, phone, password, cpassword});

            user.save().then(()=>{
                res.status(201).json({Massage : "User registed successfully"})
            }).catch((err)=>{
                res.status(500).json({"Error" : "Failed to register " + err})
            })
        }
  
    }).catch((err)=>{
        console.log(err)
    })
})

router.post('/login', async (req, res)=>{
    const {email, password} = req.body;
    try {
        if(!email || !password){
            return res.status(422).json({error : "please fill all details"})
        }

        const loginDetails = await User.findOne({email:email})
        const isMatch = await bcrypt.compare(password, loginDetails.password)
        if(!isMatch){
            res.status(422).json({error: "email and password incorrect"})
        }else{
            res.status(200).json({error: "Login succesfully"})
        }

    } catch (error) {
        res.status(422).json({error: "email and password incorrect"})
    }
})

module.exports = router;
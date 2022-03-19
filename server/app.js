const express = require('express');
const dotenv = require('dotenv');
const app = express();
app.use(express.json());
app.use(require('./router/auth'))

// const User = require('./models/userSchema')

dotenv.config({path:'./config.env'})
require('./db/connection')

// app.get('/', (req, res)=>{
//     res.send("Hello app.js");
// });

app.get('/about', (req, res)=>{
    res.send("Hello About");
});
app.get('/contact', (req, res)=>{
    res.send("Hello Contact");
});

const PORT = process.env.PORT;
app.listen(PORT, ()=>{
    console.log("Server started on " +PORT)
})
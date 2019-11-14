const express = require('express')
const bcrypt = require("bcrypt");
const Usuario = require("../models/usuario");
const app = express();

app.post("/login",(req,res)=>{

    res.json({
        ok:true,
        message:"Bueno"
    })
});


module.exports = app;
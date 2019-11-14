const express = require('express')
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Usuario = require("../models/usuario");
const _ = require("underscore");
const app = express();

app.post("/login", (req, res) => {


    let body = req.body;

    Usuario.findOne({ email: body.email }, (err, usuarioBD) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                message: err
            });
        }

        if (!usuarioBD || !bcrypt.compareSync(body.password, usuarioBD.password)) {
            return res.status(400).json({
                ok: false,
                err: {
                    message: "El usuario o contraseña son incorrectos."
                }
            });
        }

        usuarioBD = _.pick(usuarioBD, ['nombre', 'email', 'img', 'role', 'estado']);

        let token = jwt.sign({
            usuario: usuarioBD
        }, "este-es-el-seed-desarrollo", { expiresIn: process.env.CADUCIDAD_TOKEN})

        res.json({
            ok: true,
            usuario: usuarioBD,
            token
        })

    });
});


module.exports = app;
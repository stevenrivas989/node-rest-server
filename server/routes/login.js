const express = require('express')
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { OAuth2Client } = require('google-auth-library');
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);
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

        usuarioBD = _.pick(usuarioBD, ['nombre', 'email', 'img', 'role', 'estado', '_id']);

        let token = jwt.sign({
            usuario: usuarioBD
        }, "este-es-el-seed-desarrollo", { expiresIn: process.env.CADUCIDAD_TOKEN })

        res.json({
            ok: true,
            usuario: usuarioBD,
            token
        });

    });
});

//Configuraciones de Google
verify = async (token) => {
    const ticket = await client.verifyIdToken({
        idToken: token,
        audience: process.env.GOOGLE_CLIENT_ID,  // Specify the CLIENT_ID of the app that accesses the backend
        // Or, if multiple clients access the backend:
        //[CLIENT_ID_1, CLIENT_ID_2, CLIENT_ID_3]
    });

    const payload = ticket.getPayload();

    // If request specified a G Suite domain:
    //const domain = payload['hd'];

    return {
        nombre: payload.name,
        email: payload.email,
        img: payload.picture,
        google: true
    }
}

app.post("/google", async (req, res) => {
    let token = req.body.idtoken

    try {
        let googleUsuario = await verify(token);

        Usuario.findOne({ email: googleUsuario.email }, async (err, usuarioBD) => {
            if (err) {
                return res.status(500).json({
                    ok: false,
                    err
                })
            }

            if (usuarioBD) {
                if (usuarioBD.google===false) {
                    return res.status(400).json({
                        ok: false,
                        err: "Debe de usar su autenticación normal."
                    })
                } else {
                    let token = jwt.sign({
                        usuario: usuarioBD
                    }, "este-es-el-seed-desarrollo", { expiresIn: process.env.CADUCIDAD_TOKEN });

                    usuarioBD = _.pick(usuarioBD, ['nombre', 'email', 'img', 'role', 'estado']);

                    res.json({
                        ok: true,
                        usuario: usuarioBD,
                        token
                    })
                }
            } else {
                let usuario = new Usuario({
                    nombre: googleUsuario.nombre,
                    email: googleUsuario.email,
                    img: googleUsuario.img,
                    password: "Autenticado con Google",
                    google:true
                });

                try {
                    await usuario.save();
                    usuario = _.pick(usuario, ['nombre', 'email', 'img', 'role', 'estado']);
                    res.json({
                        ok: true,
                        usuario,
                        token
                    });
                } catch (e) {
                    return res.status(403).json({
                        ok: false,
                        err: e
                    })
                }

            }

        })

    } catch (e) {
        return res.status(403).json({
            ok: false,
            err: e
        });
    }

});


module.exports = app;
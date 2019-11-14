const express = require('express')
const bcrypt = require("bcrypt");
const Usuario = require("../models/usuario");
const _ = require("underscore");
const { verificaToken, verificarAdminRol } = require("../middleware/authentication");
const app = express();



app.get("/usuario", verificaToken, (req, res) => {

    let desde = req.query.desde || 0;
    desde = Number(desde);

    let limite = req.query.limite || 0;
    limite = Number(limite);


    Usuario.find({ estado: true }, 'nombre email role estado google img')
        .skip(desde)
        .limit(limite)
        .exec((err, usuarios) => {
            if (err) {
                return res.status(400).json({
                    ok: false,
                    message: err
                });
            }

            Usuario.countDocuments({ estado: true }, (err, conteo) => {
                if (err) {
                    return res.status(400).json({
                        ok: false,
                        message: err
                    });
                }

                res.json({
                    ok: true,
                    usuarios,
                    cuantos: conteo
                })

            })

        })

})

app.post("/usuario", [verificaToken, verificarAdminRol], async (req, res) => {

    let body = req.body;

    try {

        let usuario = new Usuario({
            nombre: body.nombre,
            email: body.email,
            password: bcrypt.hashSync(body.password, 10),
            role: body.role
        });

        await usuario.save();
        res.json({
            ok: true,
            usuario
        });

    } catch (e) {
        let messagge = `Ocurrió un problema. ${e}`;
        res.status(400).json({
            ok: false,
            messagge
        });
    }
});


app.put("/usuario/:id", [verificaToken,verificarAdminRol], function (req, res) {

    let id = req.params.id;
    let body = _.pick(req.body, ['nombre', 'email', 'img', 'role', 'estado']);

    Usuario.findByIdAndUpdate(id, body, { new: true, runValidators: true }, (err, usuarioDB) => {

        if (err) {
            return res.status(400).json({
                ok: false,
                message: err
            });
        }

        res.json({
            ok: true,
            message: usuarioDB
        })
    })

});


app.delete("/usuario/:id", [verificaToken,verificarAdminRol], function (req, res) {
    let id = req.params.id;

    Usuario.findByIdAndRemove(id, (err, usuarioBorrado) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                message: err
            });
        }

        if (usuarioBorrado === null) {
            return res.status(400).json({
                ok: false,
                message: "Usuario no encontrado"
            });
        }

        res.json({
            ok: true,
            message: "Usuario borrado"
        })

    })
})

app.put("/usuario/desactivar/:id", [verificaToken,verificarAdminRol], function (req, res) {

    let id = req.params.id;
    let cambiaEstado = { estado: false };

    Usuario.findByIdAndUpdate(id, cambiaEstado, { new: true }, (err, usuarioDB) => {

        if (err) {
            return res.status(400).json({
                ok: false,
                message: err
            });
        }

        usuarioDB = _.pick(usuarioDB, ['nombre', 'email', 'img', 'role', 'estado']);

        res.json({
            ok: true,
            message: usuarioDB
        })
    })

});

module.exports = app;

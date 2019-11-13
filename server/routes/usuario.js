const express = require('express')
const app = express();
const bcrypt = require("bcrypt");
const Usuario = require("../models/usuario");

app.get("/usuario", function (req, res) {
    res.json("get usuario")
})

app.post("/usuario", async (req, res) => {
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

    res.json({ persona: body })
})
app.put("/usuario/:id", function (req, res) {

    let id = req.params.id;
    res.json({ id })
})
app.delete("/usuario", function (req, res) {
    res.json("delete usuario")
})

module.exports = app;

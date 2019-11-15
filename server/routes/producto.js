const express = require("express");

const { verificaToken } = require("../middleware/authentication");

let app = express();

let Producto = require("../models/producto");

/**
 *  Obtener todos los productos
 */
app.get("/producto", verificaToken, (req, res) => {

    let desde = req.query.desde || 0;
    desde = Number(desde);

    let limite = req.query.limite || 0;
    limite = Number(limite);

    Producto.find({})
        .limit(limite)
        .skip(desde)
        .populate("usuario")
        .populate("categoria")
        .exec((err, productos) => {
            if (err) {
                return res.status(500).json({
                    ok: false,
                    message: err
                });
            }

            res.json({
                ok: true,
                categorias,
                cuantos: conteo
            });
        })
})

/**
 *  Obtener producto por id
 */
app.get("/producto/:id", verificaToken, (req, res) => {

})

/**
 *  Guardar producto
 */
app.post("/producto", verificaToken, (req, res) => {
    let body = req.body;

    body.usuario = req.usuario._id;

    let producto = new Producto({
        nombre: body.nombre,
        precioUni: body.precioUni,
        descripcion: body.precioUni,
        disponible: true,
        categoria: body.categoria,
        usuario: body.usuario
    });

    producto.save((err, productoBD) => {

        if (err) {
            return res.status(500).json({
                ok: false,
                message: err
            });
        }

        if (!productoBD) {
            return res.status(400).json({
                ok: false,
                message: "Ocurrió un problema"
            });
        }

        res.json({
            ok: true,
            productoBD
        });

    });
});

/**
 *  Actualizar producto
 */
app.put("/producto:id", verificaToken, (req, res) => {

    let id = req.params.id;
    let body = req.body;

    Producto.findByIdAndUpdate(id, { new: true, runValidators: true }, (err, productoBD) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                message: err
            });
        }

        res.json({
            ok: true,
            productoBD
        });

    })
})

/**
 *  Borrar producto
 */
app.delete("/producto", (req, res) => {

})



module.exports = app;
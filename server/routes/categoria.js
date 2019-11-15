const express = require('express')
const Categoria = require("../models/categoria");
const { verificaToken, verificarAdminRol } = require("../middleware/authentication");
const app = express();

app.get("/categoria", verificaToken, (req, res) => {

    Categoria.find({})
    .sort("descripcion")
    .populate("usuario","nombre email")
        .exec((err, categorias) => {
            if (err) {
                return res.status(400).json({
                    ok: false,
                    message: err
                });
            }

            Categoria.countDocuments({}, (err, conteo) => {
                if (err) {
                    return res.status(400).json({
                        ok: false,
                        message: err
                    });
                }

                res.json({
                    ok: true,
                    categorias,
                    cuantos: conteo
                });

            });
        });
});

app.get("/categoria/:id", verificaToken, (req, res) => {

    let idCategoria = req.params.id;
    Categoria.findById(idCategoria, (err, categoria) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                message: err
            });
        }

        res.json({
            ok: true,
            categoria
        })
    });
});

app.post("/categoria", [verificaToken], async (req, res) => {

    let body = req.body;
    let usuario = req.usuario._id;
    
    try {

        let categoria = new Categoria({
            descripcion: body.descripcion,
            usuario
        });

        await categoria.save();
        res.json({
            ok: true,
            categoria
        });

    } catch (e) {
        let messagge = `Ocurrió un problema. ${e}`;
        res.status(400).json({
            ok: false,
            messagge
        });
    }
});

app.put("/categoria/:id", [verificaToken], function (req, res) {

    let id = req.params.id;
    let body = req.body;
    body.usuarios = req.usuario._id;

    Categoria.findByIdAndUpdate(id, body, { new: true, runValidators: true }, (err, categoriaDB) => {

        if (err) {
            return res.status(400).json({
                ok: false,
                message: err
            });
        }

        res.json({
            ok: true,
            message: categoriaDB
        })
    })

});


app.delete("/categoria/:id", [verificaToken, verificarAdminRol], function (req, res) {
    let id = req.params.id;

    Categoria.findByIdAndRemove(id, (err, categoriaBorrada) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                message: err
            });
        }

        if (categoriaBorrada === null) {
            return res.status(400).json({
                ok: false,
                message: "Categoría no encontrada"
            });
        }

        res.json({
            ok: true,
            message: "Categoría borrada"
        })

    })
})

module.exports = app;
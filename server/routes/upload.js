const express = require('express')
const fileUpload = require('express-fileupload');
const app = express();

app.use(fileUpload({
    useTempFiles: true
}));

app.put('/upload', function (req, res) {

    if (!req.files || Object.keys(req.files).length === 0) {
        return res.status(400).json({
            ok: false,
            message: 'No hay ningún archivo.'
        });
    }

    let archivo = req.files.archivo;

    archivo.mv('uploads/filename.jpg', (err) => {

        if (err) {
            console.log(err);
            return res.status(500).json({
                ok: false,
                message: ''
            });
        }

        res.json({
            ok: true,
            message: 'El archivo se subió correctamente'
        });
    });

});

module.exports = app;
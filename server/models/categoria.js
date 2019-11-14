const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");
let Schema = mongoose.Schema;


let categoriaSchema = new Schema({
    idUsuario: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model("Categoria", categoriaSchema);
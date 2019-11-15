const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");
let Schema = mongoose.Schema;


let categoriaSchema = new Schema({
    usuario: {
        type: Schema.Types.ObjectId,
        ref:"Usuario"
    },
    descripcion:{
        type:String,
        required:[true,"La descripción es requerida."]
    }
});

module.exports = mongoose.model("Categoria", categoriaSchema);
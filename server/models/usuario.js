const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");
let Schema = mongoose.Schema;

let rolesValidos = {
    values: ["ADMIN_ROLE", "USER_ROLE"],
    message: '{VALUE} no es un rol válido.'
}

let usuarioSchema = new Schema({
    nombre: {
        type: String,
        required: [true, "El nombre es necesario."]
    },
    email: {
        type: String,
        unique: [true, "El email ya existe"],
        required: [true, "El correo es necesario"]
    },
    password: {
        type: String,
        required: [true, "La contraseña es necesaria."]
    },
    img: {
        type: String,
        required: false
    },
    role: {
        type: String,
        default: "USER_ROLE",
        enum: rolesValidos
    },
    estado: {
        type: Boolean,
        default: true
    },
    google: {
        type: Boolean,
        default: false
    }
});

usuarioSchema.plugin(uniqueValidator, {
    message: '{PATH} debe de ser único.'
});

module.exports = mongoose.model("Usuario", usuarioSchema, "usuario");


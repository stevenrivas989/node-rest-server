const mongoose = require("mongoose");

conectarBaseDeDatos = async () => {
    try {
        await mongoose.connect(process.env.URLDB, {
            useNewUrlParser: true,
            useCreateIndex: true,
            useUnifiedTopology: true,
            useFindAndModify: false
        });

        console.log("BD conectada");
    } catch (e) {
        console.log("Error en BD");
    }
 
}

module.exports = {conectarBaseDeDatos};

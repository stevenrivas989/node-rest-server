require("./config/config");
const bodyParser = require('body-parser')
const express = require('express')
const app = express();
const mongoose = require("mongoose");

/**USE**/
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json())

app.use(require("./routes/usuario"))

conectarBaseDeDatos = async () => {
    try {
        await mongoose.connect('mongodb://localhost:27017/cafe', {
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

conectarBaseDeDatos();


/**REQUEST */

app.get('/', function (req, res) {
    res.send('Hello World')
})



/**LISTEN SERVER */

app.listen(process.env.PORT, () => {
    console.log("Escuchando en puerto", process.env.PORT);

})
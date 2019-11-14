require("./config/config");
require("./bd/index");
const bodyParser = require('body-parser')
const express = require('express')
const app = express();

/**USE**/
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json())

//Configuración global de rutas
app.use(require("./routes/index"));

//Conexión BD
conectarBaseDeDatos();

/**REQUEST */

app.get('/', function (req, res) {
    res.send('Hello World')
})



/**LISTEN SERVER */

app.listen(process.env.PORT, () => {
    console.log("Escuchando en puerto", process.env.PORT);

})
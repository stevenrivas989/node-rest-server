
//========================================
// PUERTO
//========================================
process.env.PORT = process.env.PORT || 3000;

//========================================
// ENTORNO
//========================================
process.env.NODE_ENV = process.env.NODE_ENV || 'dev'

/**Base de Datos */

bd_usuario = 'steven-rivas';
bd_password = 'jN91wfLypysZhV5T';

if(process.env.NODE_ENV==='dev'){
    urlDB = 'mongodb://localhost:27017/cafe'
}else{
    urlDB = `mongodb+srv://${bd_usuario}:${bd_password}@cluster0-wtu9g.mongodb.net/cafe?retryWrites=true&w=majority`
}

process.env.URLDB = urlDB;



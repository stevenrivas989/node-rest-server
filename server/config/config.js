
//========================================
// PUERTO
//========================================
process.env.PORT = process.env.PORT || 3000;

//========================================
// Authorization y Authentication
//========================================

// 1000 = 1 seg
process.env.CADUCIDAD_TOKEN = 1000 * 60 * 30;

process.env.SEED = process.env.SEED || "este-es-el-seed-desarrollo";

//========================================
// ENTORNO
//========================================
process.env.NODE_ENV = process.env.NODE_ENV || 'dev'

/**Base de Datos */
bd_usuario = 'steven-rivas';
bd_password = 'jN91wfLypysZhV5T';
if (process.env.NODE_ENV === 'dev') {
    urlDB = 'mongodb://localhost:27017/cafe'
} else {
    urlDB = `mongodb+srv://${bd_usuario}:${bd_password}@cluster0-wtu9g.mongodb.net/cafe?retryWrites=true&w=majority`
}
process.env.URLDB = urlDB;

/**Google */
process.env.GOOGLE_CLIENT_ID = "935717232240-99ktadku31j5c0vmhikvu85g6vsai42p.apps.googleusercontent.com";


const jwt = require("jsonwebtoken");

/**
 * Verificar token
 */
let verificaToken = (req, res, next) => {
    let authorization = req.get("Authorization");

    jwt.verify(authorization, process.env.SEED, (err, decoded) => {
        if (err) {
            return res.status(401).json({
                ok: false,
                err: "Token no válido"
            })
        }

        req.usuario = decoded.usuario;
        next();
    });

};

/**
 * Verificar el rol de admin
 */
let verificarAdminRol = (req, res, next) => {
    let usuario = req.usuario;

    if (usuario.role === "ADMIN_ROLE") {
        next();
    } else {
        return res.status(403).json({
            ok: false,
            err: "No tiene los permisos suficientes para realizar esta acción."
        });
    }


}

module.exports = {
    verificaToken,
    verificarAdminRol
}
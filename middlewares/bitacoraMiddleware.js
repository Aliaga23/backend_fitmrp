const BitacoraController = require('../controllers/bitacoraController');

const registrarBitacora = (accion) => {
    return async (req, res, next) => {
        try {
            const usuarioId = req.user?.id; // El ID del usuario autenticado
            const ip = req.ip || req.headers['x-forwarded-for'] || req.connection.remoteAddress; // Obtén la IP del cliente

            if (usuarioId) {
                // Registra la acción en la bitácora
                await BitacoraController.registrarAccion(usuarioId, ip, accion);
            }

            next(); // Continúa al siguiente middleware o controlador
        } catch (error) {
            console.error('Error registrando en la bitácora:', error.message);
            next(); // No bloquea la petición aunque falle el registro en la bitácora
        }
    };
};

module.exports = registrarBitacora;

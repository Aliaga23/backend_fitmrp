const Bitacora = require('../models/bitacoraModel');

const registrarAccion = async (usuarioId, ip, accion) => {
    try {
        await Bitacora.registrar(usuarioId, ip, accion);
    } catch (error) {
        console.error('Error registrando en la bitácora:', error.message);
    }
};

const obtenerBitacora = async (req, res) => {
    try {
        const registros = await Bitacora.obtenerRegistros();
        res.status(200).json(registros);
    } catch (error) {
        res.status(500).json({ error: 'Error obteniendo los registros de la bitácora' });
    }
};

module.exports = { registrarAccion, obtenerBitacora };

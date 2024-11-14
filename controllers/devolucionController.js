// devolucionController.js
const Devolucion = require('../models/devolucionModel');

// Crear devolución
exports.createDevolucion = async (req, res) => {
    try {
        const { pedido_id, motivo, estado } = req.body;
        const devolucion = await Devolucion.createDevolucion(pedido_id, motivo, estado);
        res.status(201).json({ success: true, data: devolucion });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Error al crear la devolución', error });
    }
};

// Obtener todas las devoluciones
exports.getDevoluciones = async (req, res) => {
    try {
        const devoluciones = await Devolucion.getDevoluciones();
        res.status(200).json(devoluciones); // Enviar solo el arreglo de devoluciones
    } catch (error) {
        res.status(500).json({ success: false, message: 'Error al obtener las devoluciones', error });
    }
};

// Obtener una devolución por ID
exports.getDevolucionById = async (req, res) => {
    try {
        const devolucion = await Devolucion.getDevolucionById(req.params.id);
        if (!devolucion) return res.status(404).json({ success: false, message: 'Devolución no encontrada' });
        res.status(200).json({ success: true, data: devolucion });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Error al obtener la devolución', error });
    }
};

// Actualizar devolución
exports.updateDevolucion = async (req, res) => {
    try {
        const { motivo, estado } = req.body;
        const devolucion = await Devolucion.updateDevolucion(req.params.id, motivo, estado);
        if (!devolucion) return res.status(404).json({ success: false, message: 'Devolución no encontrada' });
        res.status(200).json({ success: true, data: devolucion });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Error al actualizar la devolución', error });
    }
};

// Eliminar devolución
exports.deleteDevolucion = async (req, res) => {
    try {
        const devolucion = await Devolucion.deleteDevolucion(req.params.id);
        if (!devolucion) return res.status(404).json({ success: false, message: 'Devolución no encontrada' });
        res.status(200).json({ success: true, message: 'Devolución eliminada', data: devolucion });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Error al eliminar la devolución', error });
    }
};

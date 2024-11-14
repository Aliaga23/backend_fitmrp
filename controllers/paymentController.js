// archivo: controllers/paymentController.js

const { 
    getAllPaymentMethods, 
    createPaymentMethod, 
    updatePaymentMethod, 
    deletePaymentMethod 
  } = require('../models/paymentModel');
  
  // Obtener todos los métodos de pago
  exports.getPaymentMethods = async (req, res) => {
    try {
      const paymentMethods = await getAllPaymentMethods();
      res.status(200).json(paymentMethods);
    } catch (error) {
      console.error('Error al obtener métodos de pago:', error);
      res.status(500).json({ message: 'Error al obtener métodos de pago' });
    }
  };
  
  // Crear un nuevo método de pago
  exports.createPaymentMethod = async (req, res) => {
    const { nombre_metodo, detalles } = req.body;
    try {
      const newPaymentMethod = await createPaymentMethod(nombre_metodo, detalles);
      res.status(201).json(newPaymentMethod);
    } catch (error) {
      console.error('Error al crear método de pago:', error);
      res.status(500).json({ message: 'Error al crear método de pago' });
    }
  };
  
  // Actualizar un método de pago existente
  exports.updatePaymentMethod = async (req, res) => {
    const { id } = req.params;
    const { nombre_metodo, detalles } = req.body;
    try {
      const updatedPaymentMethod = await updatePaymentMethod(id, nombre_metodo, detalles);
      if (!updatedPaymentMethod) {
        return res.status(404).json({ message: 'Método de pago no encontrado' });
      }
      res.status(200).json(updatedPaymentMethod);
    } catch (error) {
      console.error('Error al actualizar método de pago:', error);
      res.status(500).json({ message: 'Error al actualizar método de pago' });
    }
  };
  
  // Eliminar un método de pago
  exports.deletePaymentMethod = async (req, res) => {
    const { id } = req.params;
    try {
      const deletedPaymentMethod = await deletePaymentMethod(id);
      if (!deletedPaymentMethod) {
        return res.status(404).json({ message: 'Método de pago no encontrado' });
      }
      res.status(200).json(deletedPaymentMethod);
    } catch (error) {
      console.error('Error al eliminar método de pago:', error);
      res.status(500).json({ message: 'Error al eliminar método de pago' });
    }
  };
  
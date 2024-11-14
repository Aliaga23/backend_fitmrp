const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const { createOrder, addProductsToOrderAndUpdateInventory, createInvoice, confirmOrderPayment } = require('../models/pedidoModel');
const { getCartItems, getActiveCartByUserId, completeCart } = require('../models/carritoModel'); 

// Crear una sesión de pago con Stripe
exports.createStripePayment = async (req, res) => {
    const { usuario_id } = req.body;

    try {
        // Obtener el carrito activo del usuario
        const cart = await getActiveCartByUserId(usuario_id);
        if (!cart) return res.status(400).json({ message: "Carrito no encontrado." });

        // Obtener los productos en el carrito
        const items = await getCartItems(cart.id);
        const totalAmount = items.reduce((acc, item) => acc + item.precio_unitario * item.cantidad, 0);

        // Aplicar descuento del 10% si el total supera 1500
        const totalWithDiscount = totalAmount > 1500 ? totalAmount * 0.9 : totalAmount;

        // Calcular el factor de descuento
        const discountFactor = totalWithDiscount / totalAmount;

        // Crear una sesión de pago con Stripe utilizando los precios ajustados
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            line_items: items.map((item) => ({
                price_data: {
                    currency: 'usd',
                    product_data: { name: item.nombre },
                    unit_amount: Math.round(item.precio_unitario * discountFactor * 100), // Precio ajustado con descuento
                },
                quantity: item.cantidad,
            })),
            mode: 'payment',
            metadata: { usuario_id },
            success_url: `${process.env.FRONTEND_URL}/success?session_id={CHECKOUT_SESSION_ID}`,
            cancel_url: `${process.env.FRONTEND_URL}/cancel`,
        });

        res.status(200).json({
            message: "Sesión de pago creada, esperando confirmación",
            sessionId: session.id,
            total: totalWithDiscount.toFixed(2) // Envía el total con descuento si es aplicable
        });
    } catch (error) {
        console.error('Error al crear la sesión de pago en Stripe:', error);
        res.status(500).json({ message: 'Error al crear la sesión de pago en Stripe' });
    }
};

// Confirmar el pago con Stripe y completar el pedido
exports.confirmStripePayment = async (req, res) => {
    const { sessionId } = req.body;

    try {
        const session = await stripe.checkout.sessions.retrieve(sessionId);

        if (session.payment_status === 'paid') {
            const usuario_id = session.metadata.usuario_id;

            // Obtener el carrito activo del usuario
            const cart = await getActiveCartByUserId(usuario_id);
            if (!cart) return res.status(404).json({ success: false, message: 'Carrito no encontrado.' });

            const items = await getCartItems(cart.id);
            const total = session.amount_total / 100;

            // Crear el pedido y actualizar el inventario
            const pedido = await createOrder(usuario_id, total);
            await addProductsToOrderAndUpdateInventory(pedido.id, items);

            // Completar el carrito después del pago
            await completeCart(cart.id);
            await confirmOrderPayment(pedido.id);

            // Generar la factura
            const factura = await createInvoice(pedido.id, total);

            res.status(200).json({ success: true, message: 'Pago confirmado y factura generada', factura });
        } else {
            res.status(400).json({ success: false, message: 'El pago no ha sido completado' });
        }
    } catch (error) {
        console.error('Error al confirmar el pago con Stripe:', error);
        res.status(500).json({ success: false, message: 'Error al confirmar el pago con Stripe' });
    }
};

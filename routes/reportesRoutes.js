const express = require('express');
const pool = require('../config/db'); // Conexión a la base de datos
const router = express.Router();

// Reporte: Valor total del inventario por producto
router.get('/valor-inventario-productos', async (req, res) => {
  const query = `
    SELECT 
        p.id AS producto_id,
        p.nombre AS producto_nombre,
        c.nombre AS categoria_nombre,
        p.precio AS precio_unitario,
        i.cantidad_disponible AS cantidad_en_inventario,
        (p.precio * i.cantidad_disponible) AS valor_total_inventario
    FROM 
        Inventario i
    JOIN 
        Producto p ON i.producto_id = p.id
    JOIN 
        Categoria c ON p.categoria_id = c.id
    ORDER BY 
        c.nombre, p.nombre;
  `;

  try {
    const { rows } = await pool.query(query);
    res.json(rows);
  } catch (error) {
    console.error('Error obteniendo valor de inventario por productos:', error.message);
    res.status(500).json({ error: 'Error obteniendo valor de inventario por productos' });
  }
});

// Reporte: Inventario de materias primas
router.get('/inventario-materias-primas', async (req, res) => {
  const query = `
    SELECT 
        mp.id AS materia_prima_id,
        mp.nombre AS materia_prima_nombre,
        mp.descripcion AS descripcion,
        imp.cantidad_disponible AS cantidad_en_inventario
    FROM 
        InventarioMateriaPrima imp
    JOIN 
        MateriaPrima mp ON imp.materia_prima_id = mp.id
    ORDER BY 
        mp.nombre;
  `;

  try {
    const { rows } = await pool.query(query);
    res.json(rows);
  } catch (error) {
    console.error('Error obteniendo inventario de materias primas:', error.message);
    res.status(500).json({ error: 'Error obteniendo inventario de materias primas' });
  }
});

// Reporte: Movimientos de productos
router.get('/movimientos-productos', async (req, res) => {
  const query = `
    SELECT 
        mp.id AS movimiento_id,
        p.id AS producto_id,
        p.nombre AS producto_nombre,
        c.nombre AS categoria,
        l.numero_lote AS lote,
        l.fecha_vencimiento AS fecha_vencimiento_lote,
        mp.tipo_movimiento AS tipo_de_movimiento,
        mp.cantidad AS cantidad_movida,
        mp.fecha_movimiento AS fecha_hora_movimiento,
        mp.observaciones AS comentarios
    FROM 
        MovimientoProducto mp
    JOIN 
        Producto p ON mp.producto_id = p.id
    LEFT JOIN 
        Categoria c ON p.categoria_id = c.id
    LEFT JOIN 
        Lote l ON mp.lote_id = l.id
    ORDER BY 
        mp.fecha_movimiento DESC;
  `;

  try {
    const { rows } = await pool.query(query);
    res.json(rows);
  } catch (error) {
    console.error('Error obteniendo movimientos de productos:', error.message);
    res.status(500).json({ error: 'Error obteniendo movimientos de productos' });
  }
});

// Reporte: Órdenes de compra y evaluación de proveedores
router.get('/ordenes-compra', async (req, res) => {
  const query = `
    SELECT 
        oc.id AS orden_compra_id,
        oc.fecha AS fecha_orden,
        oc.estado AS estado_orden,
        oc.tipo_orden AS tipo_de_orden,
        p.nombre AS proveedor_nombre,
        ev.puntaje AS evaluacion_proveedor,
        ev.fecha_evaluacion AS fecha_evaluacion,
        ev.observaciones AS observaciones_evaluacion,
        u.nombre AS usuario_nombre,
        CASE 
            WHEN oc.tipo_orden = 'producto' THEN pr.nombre
            WHEN oc.tipo_orden = 'materia_prima' THEN mp.nombre
            ELSE 'No especificado'
        END AS item_nombre,
        CASE 
            WHEN oc.tipo_orden = 'producto' THEN ocp.cantidad
            WHEN oc.tipo_orden = 'materia_prima' THEN ocmp.cantidad
            ELSE NULL
        END AS cantidad
    FROM 
        OrdenCompra oc
    LEFT JOIN 
        Usuario u ON oc.usuario_id = u.id
    LEFT JOIN 
        OrdenCompraProducto ocp ON oc.id = ocp.orden_compra_id
    LEFT JOIN 
        Producto pr ON ocp.producto_id = pr.id
    LEFT JOIN 
        OrdenCompraMateriaPrima ocmp ON oc.id = ocmp.orden_compra_id
    LEFT JOIN 
        MateriaPrima mp ON ocmp.materia_prima_id = mp.id
    LEFT JOIN 
        Proveedor p ON ocmp.proveedor_id = p.id
    LEFT JOIN 
        EvaluacionProveedor ev ON p.id = ev.proveedor_id
    ORDER BY 
        oc.fecha DESC;
  `;

  try {
    const { rows } = await pool.query(query);
    res.json(rows);
  } catch (error) {
    console.error('Error obteniendo órdenes de compra:', error.message);
    res.status(500).json({ error: 'Error obteniendo órdenes de compra' });
  }
});

module.exports = router;

const pool = require('../config/db');

const ArchivoModel = {
  // Insertar un archivo en la tabla
  async createArchivo(nombre_archivo, ruta_archivo, tipo_archivo, fecha_subida, url_archivo) {
    const query = `
      INSERT INTO Archivo (nombre_archivo, ruta_archivo, tipo_archivo, fecha_subida, url_archivo)
      VALUES ($1, $2, $3, $4, $5)
      RETURNING *;
    `;
    const values = [nombre_archivo, ruta_archivo, tipo_archivo, fecha_subida, url_archivo];
    try {
      const result = await db.query(query, values);
      return result.rows[0];  // Devuelve el archivo insertado
    } catch (error) {
      throw error;
    }
  },

  // Obtener archivo por ID
  async getArchivoById(id) {
    const query = `SELECT * FROM Archivo WHERE id = $1;`;
    try {
      const result = await db.query(query, [id]);
      return result.rows[0];  // Devuelve el archivo
    } catch (error) {
      throw error;
    }
  }
};

module.exports = ArchivoModel;

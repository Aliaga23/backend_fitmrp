const pool = require('../config/db');

const ArchivoModel = {
  // Función para insertar un archivo en la tabla
  async createArchivo(nombre_archivo, tipo_archivo, fecha_subida, url_archivo) {
    const query = `
      INSERT INTO Archivo (nombre_archivo, tipo_archivo, fecha_subida, url_archivo)
      VALUES ($1, $2, $3, $4)
      RETURNING *;
    `;
    const values = [nombre_archivo, tipo_archivo, fecha_subida, url_archivo];
    try {
      const result = await pool.query(query, values);
      return result.rows[0];  // Devuelve el archivo insertado
    } catch (error) {
      throw error;
    }
  },

  // Función para obtener un archivo por ID
  async getArchivoById(id) {
    const query = `SELECT * FROM Archivo WHERE id = $1;`;
    try {
      const result = await pool.query(query, [id]);
      return result.rows[0];  // Devuelve el archivo encontrado
    } catch (error) {
      throw error;
    }
  },

  // Función para obtener todos los archivos
  async getAllArchivos() {
    const query = `SELECT * FROM Archivo;`;
    try {
      const result = await pool.query(query);
      return result.rows;  // Devuelve todos los archivos
    } catch (error) {
      throw error;
    }
  }
};

module.exports = ArchivoModel;

const pg = require('pg');

// Función para conectar al cliente PostgreSQL
const connectClient = async () => {
    const client = new pg.Client({
        user: process.env.DB_USER,
        host: process.env.DB_HOST,
        database: process.env.DB_NAME,
        password: process.env.DB_PASS,
        port: process.env.DB_PORT
    });

    try {
        await client.connect(); // Intenta conectar al cliente PostgreSQL
        console.log('Conexión exitosa a PostgreSQL'); // Mensaje opcional de conexión exitosa
        return client; // Devuelve el cliente PostgreSQL conectado
    } catch (error) {
        console.error('Error al conectar a PostgreSQL:', error.message); // Manejo de errores de conexión
        throw error; // Relanza el error para que pueda ser manejado por el código que llama a connectClient
    }
};

// Exportación del módulo con la función connectClient
module.exports = {
    connectClient
};

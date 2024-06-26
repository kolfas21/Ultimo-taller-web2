// Importar dependencias
require('dotenv').config();
const express = require('express');
const routerTodos = require('./routes');
const flash = require('connect-flash');
const bodyParser = require('body-parser');
const session = require('express-session'); // Importar express-session

// Crear instancia de Express
const app = express();
const PORT = process.env.PORT || 3000;

// Configurar express-session
app.use(session({
  secret: 'tu_secreto_aqui', // Se utiliza para firmar el ID de la sesión
  resave: false, // Evita que la sesión se guarde de nuevo en el almacenamiento si no ha cambiado
  saveUninitialized: false // Evita que se guarde una sesión no inicializada
}));

// Configurar middleware adicional
app.use(flash()); // Middleware para mensajes flash
app.use(express.json()); // Middleware para manejar JSON en solicitudes
app.use(bodyParser.urlencoded({ extended: true })); // Middleware para parsear datos de formularios

// Middleware a nivel de aplicación para logging (comentado para evitar sobrecargar la consola)
app.use((req, res, next) => {
    // console.log(req);
    // console.log(req.params);
    // console.log(req.query);
    // console.log(req.ip);
    // console.log('Middleware de aplicación');
    // console.log(req.method, req.url);
    next();
});

// Configuración del motor de vistas EJS y carpeta de vistas
app.set('views', './src/views');
app.set('view engine', 'ejs');

// Configurar y usar las rutas
routerTodos(app);

// Levantar el servidor para escuchar por el puerto definido
app.listen(PORT, () => {
    console.log('Listening on port: ' + PORT);
});

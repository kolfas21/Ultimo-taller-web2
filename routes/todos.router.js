const express = require('express');
const router = express.Router();
const { connectClient } = require('../db/postgres'); // Asegúrate de que esta ruta sea correcta
const Todo = require('../src/todosmodel'); // Asegúrate de que esta ruta sea correcta

// Obtener todas las tareas
router.get('/', async (req, res) => {
  const client = await connectClient();
  try {
    const todos = await Todo.findAll();
    res.render('index', { todos, messages: req.flash() }); // Agregar messages: req.flash()
  } catch (error) {
    console.error(error);
    res.status(500).send('Error retrieving todos');
  } finally {
    await client.end();
  }
});

// Actualizar una tarea (completar/descompletar)
router.put('/:id/toggleComplete', async (req, res) => {
  const { id } = req.params;

  try {
    const todo = await Todo.findByPk(id);
    if (!todo) {
      return res.status(404).send('Tarea no encontrada');
    }
    // Invertir el estado de completado
    await todo.update({ completed: !todo.completed });
    res.json(todo);
  } catch (error) {
    res.status(500).json({ error: 'Error al actualizar la tarea' });
  }
});
// Obtener una tarea específica
router.get('/:id', async (req, res) => {
  try {
    const todo = await Todo.findByPk(req.params.id);
    if (todo) {
      res.json(todo); // Enviar JSON con los detalles de la tarea encontrada
    } else {
      res.status(404).json({ error: 'Tarea no encontrada' });
    }
  } catch (error) {
    console.error('Error al buscar tarea por ID:', error);
    res.status(500).json({ error: 'Error al buscar la tarea por ID' });
  }
});

// Crear una nueva tarea
router.post('/', async (req, res) => {
  try {
    const todo = await Todo.create({
      title: req.body.title,
      dueDate: req.body.dueDate,
      
    });
    res.redirect('/api/v1/todospanel');
  } catch (error) {
    res.status(500).send(error.message);
  }
});

// Ejemplo de una ruta para actualizar una tarea por su ID
router.put('/:id/edit', async (req, res) => {
  const { id } = req.params;
  const { title, dueDate } = req.body;

  try {
      const todo = await Todo.findByPk(id);

      if (!todo) {
          return res.status(404).json({ error: 'No se encontró ninguna tarea con el ID proporcionado' });
      }

      // Actualizar los campos específicos de la tarea
      todo.title = title;
      todo.dueDate = dueDate;

      await todo.save(); // Guardar los cambios en la base de datos

      res.status(200).json(todo); // Devolver la tarea actualizada como respuesta
  } catch (error) {
      console.error('Error al actualizar la tarea:', error.message);
      res.status(500).json({ error: 'Error al actualizar la tarea' });
  }
});

// Eliminar una tarea
router.delete('/:id/delete', async (req, res) => {
  const { id } = req.params;

  try {
    const todo = await Todo.findByPk(id);
    if (!todo) {
      req.flash('error', 'Tarea no encontrada');
      return res.status(404).send('Tarea no encontrada');
    }
    await todo.destroy();
    req.flash('success', 'Tarea eliminada exitosamente');
    res.redirect('/api/v1/todospanel');
  } catch (error) {
    console.error('Error al eliminar la tarea:', error);
    req.flash('error', 'Error al eliminar la tarea');
    res.status(500).send(error.message);
  }
});

module.exports = router;

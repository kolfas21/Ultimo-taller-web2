const router = require('express').Router()
const client = require('../db/postgres')
const Todo = require('../src/todosmodel')
//const sequelize = require('../db/sequelize')

//index
router.get('/', async (req, res) => {
    try{
        const todos = await Todo.findAll()
        res.json(todos)
    }
    catch (error) {
        res.status(500).send('error.message');        
    }




    //console.log('GET /api/v1/todos')
    //Obtener todos los "todos" de la BD
    //http://localhost:3000/api/v1/todos
    /*await client.connect()
    try {        
        const result = await client.query('SELECT * FROM todos')
        console.log(result)
        res.json(result.rows)
    } catch (error) {
        console.error(error)
        res.status(500).send('Error retrieving todos')
    } finally {
        await client.end()
    }*/
})

// store
router.post('/', async (req, res) => {
    await client.connect()
    try {        
        const result = await client.query('INSERT INTO todos (title, completed) VALUES ($1, $2)', [req.body.title, req.body.completed])
        console.log(result)
        res.status(201).send('Todo created')
    } catch (error) {
        console.error(error)
        res.status(500).send('Error creating todo')
    } finally {
        await client.end()
    }
})

// show
router.get('/:id', async (req, res) => {
    await client.connect()
    try {              
        const result = await client.query('SELECT * FROM todos WHERE id = $1', [req.params.id])
        console.log(result)
        res.json(result.rows)
    } catch (error) {
        console.error(error)
        res.status(500).send('Error retrieving todo')
    } finally {
        await client.end()
    }
})


// update
router.put('/:id', async (req, res) => {
    await client.connect()
    try {        
        const result = await client.query('UPDATE todos SET title = $1, completed = $2 WHERE id = $3', [req.body.title, req.body.completed, req.params.id])
        console.log(result)
        res.send('Todo updated')
    } catch (error) {
        console.error(error)
        res.status(500).send('Error updating todo')
    } finally {
        await client.end()
    }
})

// delete
router.delete('/:id', async (req, res) => {
    await client.connect()
    try {        
        const result = await client.query('DELETE FROM todos WHERE id = $1', [req.params.id])
        console.log(result)
        res.send('Todo deleted')
    } catch (error) {
        console.error(error)
        res.status(500).send('Error deleting todo')
    } finally {
        await client.end()
    }
})


module.exports = router


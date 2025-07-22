import { Hono } from 'hono'
import {
	getAllTodos,
	getTodoById,
	createTodo,
	updateTodo,
	deleteTodo,
	getCompletedTodos,
	clearAllTodos
} from '../services/todo.js'

const app = new Hono()

/**
 * Get all todos
 */
app.get('/', async (context) => {
	try {
		const result = await getAllTodos(context.env.DB)
		return context.json(result)
	} catch (error) {
		return context.json({ error: error.message }, 500)
	}
})

/**
 * Get completed todos only
 */
app.get('/completed', async (context) => {
	try {
		const result = await getCompletedTodos(context.env.DB)
		return context.json(result)
	} catch (error) {
		return context.json({ error: error.message }, 500)
	}
})

/**
 * Get todo by ID
 */
app.get('/:id', async (context) => {
	try {
		const id = parseInt(context.req.param('id'))
		if (isNaN(id)) {
			return context.json({ error: 'Invalid ID format' }, 400)
		}

		const todo = await getTodoById(context.env.DB, id)
		return context.json(todo)
	} catch (error) {
		if (error.message.includes('not found')) {
			return context.json({ error: error.message }, 404)
		}
		return context.json({ error: error.message }, 500)
	}
})

/**
 * Create new todo
 */
app.post('/', async (context) => {
	try {
		const todoData = await context.req.json()
		const newTodo = await createTodo(context.env.DB, todoData)
		return context.json(newTodo, 201)
	} catch (error) {
		return context.json({ error: error.message }, 400)
	}
})

/**
 * Update todo by ID
 */
app.put('/:id', async (context) => {
	try {
		const id = parseInt(context.req.param('id'))
		if (isNaN(id)) {
			return context.json({ error: 'Invalid ID format' }, 400)
		}

		const updateData = await context.req.json()
		const updatedTodo = await updateTodo(context.env.DB, id, updateData)
		return context.json(updatedTodo)
	} catch (error) {
		if (error.message.includes('not found')) {
			return context.json({ error: error.message }, 404)
		}
		return context.json({ error: error.message }, 400)
	}
})

/**
 * Delete todo by ID
 */
app.delete('/:id', async (context) => {
	try {
		const id = parseInt(context.req.param('id'))
		if (isNaN(id)) {
			return context.json({ error: 'Invalid ID format' }, 400)
		}

		const deletedTodo = await deleteTodo(context.env.DB, id)
		return context.json(deletedTodo)
	} catch (error) {
		if (error.message.includes('not found')) {
			return context.json({ error: error.message }, 404)
		}
		return context.json({ error: error.message }, 500)
	}
})

/**
 * Clear all todos (for testing)
 */
app.delete('/', async (context) => {
	try {
		const result = await clearAllTodos(context.env.DB)
		return context.json(result)
	} catch (error) {
		return context.json({ error: error.message }, 500)
	}
})

export default app




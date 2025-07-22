import { assert } from '../utils/jkutil'

/**
 * Convert database todo object to proper format with boolean values
 */
const formatTodo = (todo) => {
	if (!todo) return null
	return {
		...todo,
		completed: Boolean(todo.completed), // Convert 0/1 to false/true
		description: todo.description || '' // Ensure description is never null
	}
}

/**
 * Convert array of database todos to proper format
 */
const formatTodos = (todos) => {
	return todos.map(formatTodo)
}

/**
 * 모든 할일 목록 조회
 */
export const getAllTodos = async (db) => {
	const { results } = await db.prepare('SELECT * FROM todos').all()
	return {
		todos: formatTodos(results),
		total: results.length
	}
}

/**
 * ID로 특정 할일 조회
 */
export const getTodoById = async (db, id) => {
	assert(id, 'ID is required')
	assert(typeof id === 'number', 'ID must be a number')

	const todo = await db.prepare('SELECT * FROM todos WHERE id = ?').bind(id).first()
	if (!todo) {
		throw new Error(`Todo with id ${id} not found`)
	}
	return formatTodo(todo)
}

/**
 * 새로운 할일 생성
 */
export const createTodo = async (db, todoData) => {
	assert(todoData, 'Todo data is required')
	assert(todoData.title, 'Title is required')
	assert(typeof todoData.title === 'string', 'Title must be a string')
	assert(todoData.title.trim().length > 0, 'Title cannot be empty')

	const stmt = db.prepare('INSERT INTO todos (title, description) VALUES (?, ?)')
	const info = await stmt.bind(todoData.title.trim(), todoData.description || '').run()
	return await getTodoById(db, info.meta.last_row_id)
}

/**
 * 할일 수정
 */
export const updateTodo = async (db, id, updateData) => {
	assert(id, 'ID is required')
	assert(typeof id === 'number', 'ID must be a number')
	assert(updateData, 'Update data is required')

	const existing = await getTodoById(db, id)

	let updates = []
	let params = []

	if (updateData.title !== undefined) {
		assert(typeof updateData.title === 'string', 'Title must be a string')
		assert(updateData.title.trim().length > 0, 'Title cannot be empty')
		updates.push('title = ?')
		params.push(updateData.title.trim())
	}

	if (updateData.description !== undefined) {
		updates.push('description = ?')
		params.push(updateData.description)
	}

	if (updateData.completed !== undefined) {
		assert(typeof updateData.completed === 'boolean', 'Completed must be a boolean')
		updates.push('completed = ?')
		params.push(updateData.completed ? 1 : 0)
	}

	if (updates.length === 0) {
		return existing
	}

	updates.push('updated_at = CURRENT_TIMESTAMP')
	params.push(id)

	const stmt = db.prepare(`UPDATE todos SET ${updates.join(', ')} WHERE id = ?`)
	await stmt.bind(...params).run()

	return await getTodoById(db, id)
}

/**
 * 할일 삭제
 */
export const deleteTodo = async (db, id) => {
	assert(id, 'ID is required')
	assert(typeof id === 'number', 'ID must be a number')

	const todo = await getTodoById(db, id)

	await db.prepare('DELETE FROM todos WHERE id = ?').bind(id).run()

	return todo
}

/**
 * 완료된 할일들만 조회
 */
export const getCompletedTodos = async (db) => {
	const { results } = await db.prepare('SELECT * FROM todos WHERE completed = 1').all()
	return {
		todos: formatTodos(results),
		total: results.length
	}
}

/**
 * 모든 할일 삭제 (테스트용)
 */
export const clearAllTodos = async (db) => {
	await db.prepare('DELETE FROM todos').run()
	return { message: 'All todos cleared' }
}

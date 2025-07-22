/**
 * Welcome to Cloudflare Workers! This is your first worker.
 *
 * - Run `npm run dev` in your terminal to start a development server
 * - Open a browser tab at http://localhost:8787/ to see your worker in action
 * - Run `npm run deploy` to publish your worker
 *
 * Learn more at https://developers.cloudflare.com/workers/
 */
import { Hono } from 'hono'
import packagejson from '../package.json'
import todoRoutes from './routes/todo.js'

const app = new Hono()

/**
 * Check-in endpoint that returns version and server time
 */
app.get('/api/check_in', (context) => {
	return context.json({
		version: packagejson.version,
		server_time: new Date().toISOString(),
	})
})

/**
 * Random UUID endpoint
 */
app.get('/api/random', (context) => {
	return context.text(crypto.randomUUID())
})

/**
 * Todo routes
 */
app.route('/api/todos', todoRoutes)

/**
 * Default 404 handler for unmatched routes
 */
app.notFound((context) => {
	return context.text('Not Found', 404)
})

export default {
	async fetch(request, env, ctx) {
		return app.fetch(request, env, ctx)
	}
}

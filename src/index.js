/**
 * Welcome to Cloudflare Workers! This is your first worker.
 *
 * - Run `npm run dev` in your terminal to start a development server
 * - Open a browser tab at http://localhost:8787/ to see your worker in action
 * - Run `npm run deploy` to publish your worker
 *
 * Learn more at https://developers.cloudflare.com/workers/
 */
import packagejson from '../package.json'

export default {
	async fetch(request, env, ctx) {
		const url = new URL(request.url)
		switch (url.pathname) {
			case '/api/check_in':
				return new Response(JSON.stringify({
					version: packagejson.version,
					server_time: new Date().toISOString(),
				}))
			case '/api/random':
				return new Response(crypto.randomUUID())
			default:
				return new Response('Not Found', { status: 404 })
		}
	},
}

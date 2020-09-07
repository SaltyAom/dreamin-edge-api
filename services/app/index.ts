import fastify, { FastifyInstance } from "fastify"

import { isMaster, fork } from "cluster"
import { cpus } from "os"

const startInstance = async (app: FastifyInstance) => {
	try {
		await app.listen(3000)
	} catch (error) {
		console.warn(error)
	}
}

export const run = (app: FastifyInstance) => {
	if (isMaster) for (let server = 0; server < cpus().length; server++) fork()
	else startInstance(app)
}

const app = fastify()

app.register(require("fastify-compress"))
	.register(require("fastify-helmet"))
	.register(require("fastify-cors"), {
		origin: [
			"https://dreamin-edge.now.sh",
			"http://localhost:8080"
		]
	})

export default app

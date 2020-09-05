import { FastifyInstance } from "fastify"

import MaidreaminAPI from "../../services/api"

const api = new MaidreaminAPI()

const APIController = async (app: FastifyInstance) => {
    app.get("/menu", async () => await api.getMenu())

    app.get("/", async () => ({
        success: true
    }))    
}

export default APIController
import app, { run } from "./services/app"

import { APIController } from "./controllers"

app.register(APIController)

run(app)
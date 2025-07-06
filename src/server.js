import express from "express"
import cors from 'cors'
import taskRoutes from "./routes/taskRoutes.js"
import userRoutes from "./routes/userRoutes.js"
import { errorHandler } from "./middleware/errorsHandle.js"
import { logger } from "./middleware/logger.js"


const app = express();
const port = 3000;

//MidWare
app.use(logger)
app.use(cors())
app.use(express.json())

app.use("/user", userRoutes)
app.use("/task", taskRoutes)
app.use(errorHandler)

app.listen(port, () =>{
    console.log("Porta rodando");
})
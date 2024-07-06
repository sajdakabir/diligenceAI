import express from "express";
import cors from "cors";
import Joi from "joi";
import { initRoutes } from "./routers/index.js";
import { environment } from "./loaders/environment.loder.js";


const app = express()
app.use(cors())
const { ValidationError } = Joi;
app.use(express.json())
app.use(
    express.urlencoded({
        extended: true
    })
)

initRoutes(app)
// Express error handler
app.use((err, req, res, next) => {
    console.log(err)
    if (environment.SHOW_ADMIN) {
        console.log(err)
    }
    if (err) {
        if (err.statusCode === 500) {
            // sentry.captureException(err)
        }
        res.status(err instanceof ValidationError ? 400 : err.statusCode || 500).send({
            statusCode: err instanceof ValidationError ? 400 : err.statusCode || 500,
            message: process.env.NODE_ENV === 'development' ? err.message : 'Something went wrong. Please contact the administrator'
        })
    } else {
        next()
    }
})

export {
    app,
    express
}

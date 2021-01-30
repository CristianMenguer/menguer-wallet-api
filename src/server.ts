import express, { Response, Request, NextFunction } from 'express'
import cors from 'cors'
import 'express-async-errors'
import routes from './routes'
import AppError from './errors/AppError'

// Reading form environment variables
const HOSTNAME = process.env.HOSTNAME ? process.env.HOSTNAME : '0.0.0.0'
const PORT = process.env.PORT ? parseInt(process.env.PORT) : 3000

const app = express()

// Middleware to generate a log of all requests
app.use((request: Request, response: Response, _next: NextFunction) => {
    console.log('[%s] %s -- %s', new Date(), request.method, request.url)
    _next()
})

// This line enables requests from any address
app.use(cors({
    origin: '*'
}))

app.use(express.json())

// The file routes is called to handle all the requests received
app.use(routes)

// If any error is sent by any route, it will be handled and returned in this function
app.use(
    (err: Error, request: Request, response: Response, _next: NextFunction) => {

        if (err instanceof AppError) {
            console.log(`> Error: ${err.message}`)
            return response.status(err.statusCode).json({
                status: 'error',
                message: err.message
            })
        }

        return response.status(500).json({
            status: 'error',
            message: 'Internal Server Error!'
        })
    }
)

// Starts the server
app.listen(PORT, HOSTNAME, () => {
    console.log(`> Server started on ${HOSTNAME}:${PORT} 👌`)
})

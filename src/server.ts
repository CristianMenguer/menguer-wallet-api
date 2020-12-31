import express, { Response, Request, NextFunction } from 'express'
import cors from 'cors'
import cron from 'node-cron'
import 'express-async-errors'
import routes from './routes'
import AppError from './errors/AppError'
import updateDatabaseAPIService from './services/UpdateDatabaseAPIService'

const HOSTNAME = '0.0.0.0'

const PORT = process.env.PORT ? parseInt(process.env.PORT) : 3000

const app = express()

app.use((request: Request, response: Response, _next: NextFunction) => {
    console.log('[%s] %s -- %s', new Date(), request.method, request.url)
    _next()
})

app.use(cors())

app.use(express.json())

app.use(routes)

app.use(
    (err: Error, request: Request, response: Response, _next: NextFunction) => {

        if (err instanceof AppError) {
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

app.listen(PORT, HOSTNAME, () => {
    console.log(`> Server started on ${HOSTNAME}:${PORT} 👌`)
    updateDatabaseAPIService()
})

// cron.schedule('18,19,20,21,22,23 * * *', () => {
//     console.log('Running every hour at America/Sao_Paulo timezone')
//     updateDatabaseAPIService()
// }, {
//     scheduled: true,
//     timezone: "America/Sao_Paulo"
// })
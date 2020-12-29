import { Router, Request, Response } from 'express'

import userRoutes from './user.routes'
import sessionRoutes from './session.routes'

const routes = Router()

routes.use('/users', userRoutes)
routes.use('/session', sessionRoutes)

routes.get('/', (request: Request, response: Response) => {
    return response.json({
        message: 'Hey, welcome to Menguer Wallet - API 👍🏼'
    })
})

routes.get('*', (request: Request, response: Response) => {
    return response.status(404).json({
        message: 'Welcome to Menguer Wallet - API 👍🏼',
        error: 'Route not found! Check your URL/Request! 👎🏻',
        bad_url: request.url
    })
})

export default routes
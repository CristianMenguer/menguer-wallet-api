import { Router, Request, Response } from 'express'

import userRoutes from './user.routes'
import quoteRoutes from './quote.routes'
import sessionRoutes from './session.routes'
import companyRoutes from './company.routes'
import analysisRoutes from './analysis.routes'

/**
 * This is the main file that handles the routes.
 * It receives all the requests and redirect them 
 * to their specific route.
 */

const routes = Router()

// Here the routes are redirected
routes.use('/users', userRoutes)
routes.use('/companies', companyRoutes)
routes.use('/quotes', quoteRoutes)
routes.use('/session', sessionRoutes)
routes.use('/analysis', analysisRoutes)

// As there is nothing to do when the "root route" is accessed,
// it just returns a message
routes.get('/', (request: Request, response: Response) => {
    return response.json({
        message: 'Hey, welcome to Menguer Wallet - API 👍🏼'
    })
})

// This method is used when any no identified route is accessed
routes.get('*', (request: Request, response: Response) => {
    return response.status(404).json({
        message: 'Welcome to Menguer Wallet - API 👍🏼',
        error: 'Route not found! Check your URL/Request! 👎🏻',
        bad_url: request.url
    })
})

export default routes
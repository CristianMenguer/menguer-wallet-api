import { Router, Request, Response } from 'express'
import AuthenticateUserService from '../services/AuthenticateUserService'

const sessionRoutes = Router()

// All the routes for session are handled here.

// This file has only one route, and it is used to create a session.
// It receives an e-mail and password. If they are correct, return a token to be used
sessionRoutes.post('/', async (request: Request, response: Response) => {
    const { email, password } = request.body
    
    const authenticateUser = new AuthenticateUserService()

    const { user, token } = await authenticateUser.execute({
        email,
        password
    })

    return response.json({ user, token })
})

export default sessionRoutes
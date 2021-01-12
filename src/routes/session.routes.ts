import { Router, Request, Response } from 'express'
import AuthenticateUserService from '../services/AuthenticateUserService'

const sessionRoutes = Router()

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
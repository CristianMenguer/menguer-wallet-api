import { Router, Request, Response } from 'express'
import AppError from '../errors/AppError'

import ensureAuthenticated from '../middlewares/ensureAuthenticated'
import CreateUserService from '../services/CreateUserService'
import { getUsers } from '../models/User'
import { isOnlyLetterLowerCase, isValidEmail } from '../Utils/ValidateInputs'

const userRoutes = Router()

// All the routes for users are handled here.

// This route receives an user, validates an inserts it to the Database
userRoutes.post('/', async (request: Request, response: Response) => {

    const { fullname, username, email, password } = request.body

    //console.log(request.body)

    if (!fullname || !username || !email || !password)
        throw new AppError('It is missing some parameters!')
    //
    if (!isOnlyLetterLowerCase(username))
        throw new AppError('Only lowercase letters are accepted to username!')
    //
    if (!isValidEmail(email))
        throw new AppError('Email is invalid!')
    //
    const users = await getUsers({
        $or: [
            {
                username
            },
            {
                email
            }
        ]
    })

    if (users.length)
        throw new AppError('Username or email has already been registered!')

    const createUser = new CreateUserService()

    try {
        const user = await createUser.execute({
            fullname,
            username,
            email,
            password,
        })

        return response.json(user)
    } catch (err) {
        console.log('Error > user.routes > POST')
        console.log(err)
        return response.status(409).json({ error: err.message })
    }
})

// This line enables the need of authentication
// All the routes from here will need to have a valid token to access
userRoutes.use(ensureAuthenticated)

// This route returns all the users
userRoutes.get('/', async (request: Request, response: Response) => {

    const users = await getUsers()

    return response.json(users)

})

// This route receives and input, that can be an username or e-mail, 
// and returns the user, if found
userRoutes.get('/:input', async (request: Request, response: Response) => {

    const { input } = request.params

    let users

    if (isValidEmail(input))
        users = await getUsers({ email: input })
    else
        if (isOnlyLetterLowerCase(input))
            users = await getUsers({ username: input })
        else
            throw new AppError('Invalid Param!')
    //
    if (!users.length)
        throw new AppError('User not found!', 404)
    //

    const user = users[0]

    return response.json(user)

})

export default userRoutes
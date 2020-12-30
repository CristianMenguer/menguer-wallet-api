import { Router, Request, Response } from 'express'
import AppError from '../errors/AppError'

import ensureAuthenticated from '../middlewares/ensureAuthenticated'
import CreateUserService from '../services/CreateUserService'
import { getUsers } from '../models/user'
import { isOnlyLetterLowerCase, isValidEmail } from '../services/ValidateInputs'

const userRoutes = Router()


userRoutes.post('/', async (request: Request, response: Response) => {

    const { first_name, last_name, username, email, password, age, gender } = request.body

    console.log(request.body)

    if (!first_name || !last_name || !username || !email || !password || !age || !gender)
        throw new AppError('It is missing some parameters!')
    //
    if (!isOnlyLetterLowerCase(username))
        throw new AppError('Only lowercase letters are accepted to username!')
    //
    if (!isValidEmail(email))
        throw new AppError('Email is invalid!')
    //

    const createUser = new CreateUserService()

    try {
        const user = await createUser.execute({
            first_name,
            last_name,
            username,
            email,
            password,
            age,
            gender
        })

        return response.json(user)
    } catch (err) {
        console.log('Error > user.routes > POST')
        console.log(err)
        return response.status(409).json({ error: err.message })
    }
})

userRoutes.use(ensureAuthenticated)

userRoutes.get('/', async (request: Request, response: Response) => {

    const users = await getUsers()

    return response.json(users)

})

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
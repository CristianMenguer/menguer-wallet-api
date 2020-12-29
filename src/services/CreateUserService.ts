import { hash } from 'bcryptjs'

import { createNewUser, getUsers } from '../models/user'
import User from '../entities/User'
import AppError from '../errors/AppError'

interface RequestDTO {
    name: string
    username: string
    email: string
    password: string
    usertype: string
}

class CreateUserService {
    public async execute({ name, username, email, password, usertype }: RequestDTO): Promise<User> {

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

        try {
            const hashedPassword = await hash(password, 8)

            const user = await createNewUser(new User(
                name,
                username,
                email,
                hashedPassword,
                usertype
            ))

            return user
        } catch (err) {
            console.log('Error: > CreateUserService > execute:')
            console.log(err)
            throw new AppError('Internal error. Please, try again!', 500)
        }
    }
}

export default CreateUserService
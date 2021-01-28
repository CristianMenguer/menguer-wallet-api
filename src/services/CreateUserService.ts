import { hash } from 'bcryptjs'

import { createNewUser, getUsers } from '../models/User'
import User from '../entities/User'
import AppError from '../errors/AppError'

/**
 * This class is exclusively used to create an user in the Database.
 * It receives the necessary data and insert it. 
 */

interface RequestDTO {
    fullname: string
    username: string
    email: string
    password: string
}

class CreateUserService {
    public async execute({ fullname, username, email, password }: RequestDTO): Promise<User> {

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
                fullname,
                username,
                email,
                hashedPassword
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
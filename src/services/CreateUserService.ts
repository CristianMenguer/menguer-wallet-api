import { hash } from 'bcryptjs'

import { createNewUser, getUsers } from '../models/User'
import User from '../entities/User'
import AppError from '../errors/AppError'

interface RequestDTO {
    first_name: string
    last_name: string
    username: string
    email: string
    password: string
    age: number
    gender: string
}

class CreateUserService {
    public async execute({ first_name, last_name, username, email, password, age, gender }: RequestDTO): Promise<User> {

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
                first_name,
                last_name,
                username,
                email,
                hashedPassword,
                age,
                gender
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
import { compare } from 'bcryptjs'
import { sign } from 'jsonwebtoken'

import User from '../entities/User'
import { getUsers } from '../models/user'
import authConfig from '../config/auth'
import AppError from '../errors/AppError'

interface RequestDTO {
    username: string
    password: string
}

interface ResponseDTO {
    user: User
    token: string
}

class AuthenticateUserService {

    public async execute({ username, password }: RequestDTO): Promise<ResponseDTO> {

        if (!username)
            throw new AppError('Username is empty!', 401)

        if (!password)
            throw new AppError('Password is empty!', 401)

        const users = await getUsers({ username })

        if (!users.length) {
            throw new AppError('User not found!', 401)
        }

        const userByUsername = users[0]

        let passwordMatched = false

        if (userByUsername.password)
            passwordMatched = await compare(password, userByUsername.password)

        if (!passwordMatched) {
            throw new AppError('Incorrect username/password combination!', 401)
        }

        const { secret, expiresIn } = authConfig.jwt
        
        userByUsername._id += ''

        const token = sign({ username }, secret, {
            subject: userByUsername._id,
            expiresIn
        })

        return {
            user: userByUsername,
            token
        }
    }
}

export default AuthenticateUserService
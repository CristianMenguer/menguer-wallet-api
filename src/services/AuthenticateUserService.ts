import { compare } from 'bcryptjs'
import { sign } from 'jsonwebtoken'

import User from '../entities/User'
import { getUsers } from '../models/User'
import authConfig from '../config/auth'
import AppError from '../errors/AppError'

interface RequestDTO {
    email: string
    password: string
}

interface ResponseDTO {
    user: User
    token: string
}

class AuthenticateUserService {

    public async execute({ email, password }: RequestDTO): Promise<ResponseDTO> {

        if (!email)
            throw new AppError('E-mail is empty!', 401)

        if (!password)
            throw new AppError('Password is empty!', 401)

        const users = await getUsers({ email })
        
        if (!users.length) {
            throw new AppError('User not found!', 401)
        }

        const userByEmail = users[0]

        let passwordMatched = false

        if (userByEmail.password)
            passwordMatched = await compare(password, userByEmail.password)

        if (!passwordMatched) {
            throw new AppError('Incorrect username/password combination!', 401)
        }

        const { secret, expiresIn } = authConfig.jwt
        
        userByEmail._id += ''

        const token = sign({ email }, secret, {
            subject: userByEmail._id,
            expiresIn
        })

        return {
            user: userByEmail,
            token
        }
    }
}

export default AuthenticateUserService
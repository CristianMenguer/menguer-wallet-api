import { Request, Response, NextFunction } from 'express'
import { verify } from 'jsonwebtoken'

import authConfig from '../config/auth'
import AppError from '../errors/AppError'

// This function is the one that guarantee that the API will be access only by authenticated users
export default function ensureAuthenticated(request: Request, response: Response, next: NextFunction): void {
    // Get the header of the request, that must contain the token
    const authHeader = request.headers.authorization

    // Validate if contains any header of authorization
    if (!authHeader) 
        throw new AppError('JWT token is missing!', 401)

    // Get the token from the header
    const [, token] = authHeader.split(' ')

    const { secret } = authConfig.jwt

    try {
        // Validates the token
        const decoded = verify(token, secret)

        const { sub } = decoded as TokenPayload

        // if valid, gets the user ID
        request.user = {
            id: sub
        }

        return next()
    } catch {
        // An error is returned if the token is invalid
        throw new AppError('Invalid JWT token!', 401)
    }
}
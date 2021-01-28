import { Router, Request, Response } from 'express'
import AppError from '../errors/AppError'

import ensureAuthenticated from '../middlewares/ensureAuthenticated'
import CreateUserService from '../services/CreateUserService'
import { getCompanies, getNumberCompanies } from '../models/Company'
import { isOnlyLetterLowerCase, isValidEmail } from '../Utils/ValidateInputs'

const companyRoutes = Router()

// All the routes for companies are handled here.

// This line enables the need of authentication
// All the routes from here will need to have a valid token to access
companyRoutes.use(ensureAuthenticated)

// This route returns the total quantity of companies in the Database
companyRoutes.get('/total', async (request: Request, response: Response) => {

    const users = await getNumberCompanies()

    return response.json(users)

})

// This route returns all the companies in the Database
companyRoutes.get('/', async (request: Request, response: Response) => {

    const users = await getCompanies()

    return response.json(users)

})

export default companyRoutes
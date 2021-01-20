import { Router, Request, Response } from 'express'
import AppError from '../errors/AppError'

import ensureAuthenticated from '../middlewares/ensureAuthenticated'
import CreateUserService from '../services/CreateUserService'
import { getCompanies, getNumberCompanies } from '../models/Company'
import { isOnlyLetterLowerCase, isValidEmail } from '../Utils/ValidateInputs'

const companyRoutes = Router()

//companyRoutes.use(ensureAuthenticated)

companyRoutes.get('/total', async (request: Request, response: Response) => {

    const users = await getNumberCompanies()

    return response.json(users)

})

companyRoutes.get('/', async (request: Request, response: Response) => {

    const users = await getCompanies()

    return response.json(users)

})

export default companyRoutes
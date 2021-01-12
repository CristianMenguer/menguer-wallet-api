import { Router, Request, Response } from 'express'
import AppError from '../errors/AppError'

import ensureAuthenticated from '../middlewares/ensureAuthenticated'
import { isNumber, isOnlyLetterLowerCase, isValidEmail, isValidInputDate, isValidStockCode } from '../Utils/ValidateInputs'
import { getLastQuoteByCodeStock, getQuoteByCodeStockAndDate } from '../models/Quote'

const quoteRoutes = Router()

//quoteRoutes.use(ensureAuthenticated)

quoteRoutes.get('/:input', async (request: Request, response: Response) => {

    const { input } = request.params
    const { strategy } = request.query
    
    console.log(request.query)

    if (!isValidStockCode(input))
        throw new AppError('Invalid Stock Code!')
    //
    let quotes = await getLastQuoteByCodeStock(input)
    //
    if (!!!quotes)
        throw new AppError('Quote not found!', 404)
    //

    return response.json(quotes)

})

export default quoteRoutes
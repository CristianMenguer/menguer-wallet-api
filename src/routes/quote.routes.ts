import { Router, Request, Response } from 'express'
import AppError from '../errors/AppError'

import ensureAuthenticated from '../middlewares/ensureAuthenticated'
import CreateUserService from '../services/CreateUserService'
import { getUsers } from '../models/User'
import { isNumber, isOnlyLetterLowerCase, isValidEmail, isValidInputDate, isValidStockCode } from '../Utils/ValidateInputs'
import { getLastQuoteByCodeStock, getQuoteByCodeStockAndDate } from '../models/Quote'

const quoteRoutes = Router()

//quoteRoutes.use(ensureAuthenticated)

quoteRoutes.get('/:input', async (request: Request, response: Response) => {

    const { input } = request.params
    const { date, dateFrom, dateTo } = request.query

    if (!isValidStockCode(input))
        throw new AppError('Invalid Stock Code!')
    //
    if (!!date && isNumber(date.toString()) && !isValidInputDate(date.toString()))
        throw new AppError('Date has a wrong format(yyyy-mm-dd)!', 400)
    //
    if (!!dateFrom && isNumber(dateFrom.toString()) && !isValidInputDate(dateFrom.toString()))
        throw new AppError('Date "From" has a wrong format(yyyy-mm-dd)!', 400)
    //
    if (!!dateTo && isNumber(dateTo.toString()) && !isValidInputDate(dateTo.toString()))
        throw new AppError('Date "To" has a wrong format(yyyy-mm-dd)!', 400)
    //
    let quotes
    //
    if (!!date || !!dateFrom || !!dateTo) {
        quotes = await getQuoteByCodeStockAndDate({
            codeStock: input,
            date: date ? date.toString() : '',
            dateFrom: dateFrom ? dateFrom.toString() : '',
            dateTo: dateTo ? dateTo.toString() : '',
        })
    } else
        quotes = await getLastQuoteByCodeStock(input)
    //
    if (!!!quotes)
        throw new AppError('Quote not found!', 404)
    //

    return response.json(quotes)

})

export default quoteRoutes
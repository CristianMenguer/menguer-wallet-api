import * as db from '../database'
import Quote from '../entities/Quote'
import { pregaoToDate } from '../Utils/ValidateInputs'

const COLLECTION = 'quote'

export const upsertQuote = async (quote: Quote): Promise<void> => {
    try {
        const filter = { $and: [{ code_stock: quote.code_stock }, { date: quote.date }] }
        const update = { $set: { ...quote } }
        const options = { upsert: true }
        const results = await db.update(COLLECTION, filter, update, options)
        // console.log('results')
        // console.log(results)
    } catch (err) {
        console.log('Error: > Quote.model > upsertQuote:')
        console.log(err)
        //return {} as Quote
    }
}

interface LastUpdateResponse {
    _id: string
    lastDate: Date
}

export const getLastUpdateByCodeStock = async (codeStock: string): Promise<Date | null> => {

    const LOOKUP = [
        {
            $match: {
                code_stock: codeStock
            }
        },
        {
            $group:
            {
                _id: '$code_stock',
                lastDate: { $max: '$date' }
            }
        }
    ]

    try {
        // @ts-ignore
        const response = await db.aggregate(COLLECTION, LOOKUP) as LastUpdateResponse[]
        return !!response.length ? response[0].lastDate : null
    } catch (err) {
        console.log('Error: > Quote.model > getLastUpdateByCodeStock:')
        console.log(err)
        return null
    }
}

export const getLastQuoteForEachCodeStock = async (): Promise<LastUpdateResponse[]> => {

    const LOOKUP = [
        {
            $group:
            {
                _id: '$code_stock',
                lastDate: { $max: '$date' }
            }
        }
    ]

    try {
        // @ts-ignore
        const response = await db.aggregate(COLLECTION, LOOKUP) as LastUpdateResponse[]
        if (!!response && !!response.length)
            return response
        //
        return []
    } catch (err) {
        console.log('Error: > Quote.model > getLastQuoteForEachCodeStock:')
        console.log(err)
        return []
    }
}

export const getLastQuoteByCodeStock = async (codeStock: string): Promise<Quote | null> => {

    const date = await getLastUpdateByCodeStock(codeStock)

    const filter = { $and: [{ code_stock: codeStock }, { date: date }] }

    try {

        // @ts-ignore
        const response = await db.get(COLLECTION, filter) as Quote[]
        return (!!response.length && !!response[0]) ? response[0] : null
    } catch (err) {
        console.log('Error: > Quote.model > getLastUpdateByCodeStock:')
        console.log(err)
        return null
    }
}

interface ParamDates {
    codeStock: string
    date?: string
    dateFrom?: string
    dateTo?: string
}

export const getQuoteByCodeStockAndDate = async (params: ParamDates): Promise<Quote[]> => {

    const { codeStock, date, dateFrom, dateTo } = params
    let dateToQuery = dateTo
    let dateFromQuery = dateFrom
    //
    if (dateToQuery === '') {
        const tempDate = new Date()
        tempDate.setFullYear(tempDate.getFullYear() + 1)
        dateToQuery = tempDate.getFullYear() + '12-31'
    }
    //
    if (dateFromQuery === '') {
        const tempDate = new Date()
        tempDate.setFullYear(tempDate.getFullYear() - 1)
        dateFromQuery = tempDate.getFullYear() + '01-01'
    }

    let filter

    if (!!date && date !== '') {
        const dateFormatted = date.replace(/\D+/g, '')
        console.log(pregaoToDate(parseInt(dateFormatted)))
        filter = { $and: [{ code_stock: codeStock }, { date: pregaoToDate(parseInt(dateFormatted)) }] }
    }
    else
        if (!!dateFromQuery && dateFromQuery !== '' && !!dateToQuery && dateToQuery !== '') {
            const dateFromFormatted = dateFromQuery.replace(/\D+/g, '')
            const dateToFormatted = dateToQuery.replace(/\D+/g, '')

            filter = {
                $and:
                    [
                        { code_stock: codeStock },
                        {
                            date: {
                                $gte: pregaoToDate(parseInt(dateFromFormatted)),
                                $lte: pregaoToDate(parseInt(dateToFormatted))
                            }
                        }
                    ]
            }
        }
    //

    try {

        // @ts-ignore
        const response = await db.get(COLLECTION, filter) as Quote[]
        return (!!response.length && response.length > 0) ? response : []
    } catch (err) {
        console.log('Error: > Quote.model > getLastUpdateByCodeStock:')
        console.log(err)
        return []
    }
}

export const getAmountQuotesByCodeStock = async (codeStock: string): Promise<number> => {

    try {
        const filter = { code_stock: codeStock }
        const response = await db.count(COLLECTION, filter)
        return response as number
    } catch (err) {
        console.log('Error: > Quote.model > getAmountQuotesByCodeStock:')
        console.log(err)
        return 0
    }
}
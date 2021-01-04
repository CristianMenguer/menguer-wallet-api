import * as db from '../database'
import Quote from '../entities/Quote'

const COLLECTION = 'quote'

export const upsertQuote = async (quote: Quote): Promise<void> => {
    try {
        const filter = { $and: [{code_stock: quote.code_stock}, {date: quote.date}]}
        const update = { $set: { ...quote } }
        const options = { upsert: true }
        const results = await db.update(COLLECTION, filter, update, options)
        console.log('results')
        console.log(results)
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
                _id: "$code_stock",
                lastDate: { $max: "$dt_pregao" }
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
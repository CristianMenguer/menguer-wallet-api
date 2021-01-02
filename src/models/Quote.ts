import * as db from '../database'
import Quote from '../entities/Quote'

const COLLECTION = 'quote'

export const upsertQuote = async (quote: Quote): Promise<void> => {
    try {
        const filter = { code: quote.id_api }
        const update = { $set: { ...quote } }
        const options = { upsert: true }
        const results = await db.update(COLLECTION, filter, update, options)
    } catch (err) {
        console.log('Error: > Quote.model > upsertQuote:')
        console.log(err)
        //return {} as Quote
    }
}
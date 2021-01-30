import * as db from '../database'
import Company from '../entities/Company'

const COLLECTION = 'company'

// This function receives a Company object and insert it to the Database.
// If it already exists, it is updated
export const upsertCompany = async (company: Company): Promise<void> => {
    try {
        const filter = { code: company.code }
        const update = { $set: { ...company } }
        const options = { upsert: true }
        const results = await db.update(COLLECTION, filter, update, options)
        // console.log('results')
        // console.log(results)
        //return results
    } catch (err) {
        console.log('Error: > Company.model > createNewCompany:')
        console.log(err)
        //return {} as Company
    }
}

// This function returns all the Company Objects from the Database
export const getCompanies = async (query = {}): Promise<Company[]> => {
    
    try {
        const companies = await db.get(COLLECTION, query) as Company[]
        
        return companies
    }
    catch (err) {
        console.log('Error: > Company.model > getCompanies:')
        console.log(err)
        return []
    }
}

// This function returns the quantity os Company documents in the Database
export const getNumberCompanies = async (): Promise<number> => {
    
    try {
        const total = await db.count(COLLECTION) as number
        
        return total
    }
    catch (err) {
        console.log('Error: > Company.model > getCompanies:')
        console.log(err)
        return 0
    }
}
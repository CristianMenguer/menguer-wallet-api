import * as db from '../database'
import Company from '../entities/Company'

const COLLECTION = 'company'

export const upsertCompany = async (company: Company): Promise<Company> => {
    try {
        const filter = { cd_acao: company.code }
        const update = { $set: { ...company } }
        const options = { upsert: true }
        const results = await db.update(COLLECTION, filter, update, options)
        console.log('results')
        const result = results as CompanyResponseInsert
        return result.ops[0]
    } catch (err) {
        console.log('Error: > Company.model > createNewCompany:')
        console.log(err)
        return {} as Company
    }
}

export const getCompanies = async (query = {}): Promise<Company[]> => {
    
    try {
        const Companys = await db.get(COLLECTION, query) as Company[]
        
        return Companys
    }
    catch (err) {
        console.log('Error: > Company.model > getCompanys:')
        console.log(err)
        return []
    }
}
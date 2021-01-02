import Company from "../entities/Company"
import Quote from "../entities/Quote"
import { upsertCompany } from "../models/Company"
import { upsertQuote } from "../models/Quote"
import apiCompanies from "./GetCompaniesApiService"
import { apiDaily } from "./GetDailyApiService"
import sysInfoApiDaily from "./GetLastUpdateApiService"

const updateQuotesService = async (): Promise<void> => {
    // const sysInfo = await sysInfoApiDaily()
    // const lastTest = 20201229
    // if (sysInfo.dt_ultimo_pregao !== lastTest) 
    {
        console.log('It needs to be updated!')
        const id_company = 5
        // const companies = await apiCompanies()
        // companies.map(async (data) => {
        //    const company: Company = new Company(data.id, data.nm_empresa, data.cd_acao, data.setor_economico, data.subsetor, data.subsetor)
        //        upsertCompany(company)
        //        const quote = await apiDaily(company.id_api)
        const quotes = await apiDaily(id_company)
        let count = 0
        quotes.map(object => {
            if (count < 5) {
                // YYYYMMDD
                const dateStr = object.dt_pregao
                const date = new Date(parseInt(dateStr.toString().substr(0, 4)), parseInt(dateStr.toString().substr(4, 2)) - 1, parseInt(dateStr.toString().substr(6, 2)))
                const quote = new Quote(object.id, id_company, object.cd_acao, object.vl_abertura, object.vl_fechamento, object.vl_maximo, object.vl_minimo, object.vl_volume, date)
                upsertQuote(quote)
            }
            count++
        })
        //})
        //

    } //else 
    {
        console.log('It does not need to update!')
    }
}

export default updateQuotesService
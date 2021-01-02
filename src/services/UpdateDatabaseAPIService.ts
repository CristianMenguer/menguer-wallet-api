import Company from "../entities/Company"
import { upsertCompany } from "../models/Company"
import apiCompanies from "./GetCompaniesApiService"
import { apiDaily } from "./GetDailyApiService"
import sysInfoApiDaily from "./GetLastUpdateApiService"

const updateQuotesService = async (): Promise<void> => {
    const sysInfo = await sysInfoApiDaily()
    const lastTest = 20201229
    if (sysInfo.dt_ultimo_pregao !== lastTest) {
        console.log('It needs to be updated!')
        const companies = await apiCompanies()
        let count = 0
        const insert = 4
        companies.map(async (data) => {
            const company: Company = new Company(data.id, data.nm_empresa, data.cd_acao, data.setor_economico, data.subsetor, data.subsetor)
            if (count === insert) {
                upsertCompany(company)
                const quote = await apiDaily(company.id_api)
                console.log('quote')
                console.log(quote)
            }
            count++
        })
        //

    } else {
        console.log('It does not need to update!')
    }
}

export default updateQuotesService
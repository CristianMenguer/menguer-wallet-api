import Company from "../entities/Company"
import { upsertCompany } from "../models/Company"
import apiCompanies from "./GetCompaniesApiService"
import sysInfoApiDaily from "./GetLastUpdateApiService"

const updateQuotesService = async (): Promise<void> => {
    const sysInfo = await sysInfoApiDaily()
    const lastTest = 20201230
    if (sysInfo.dt_ultimo_pregao !== lastTest) {
        console.log('It needs to update!')
        const companies = await apiCompanies()
        companies.map(data => {
            const company: Company = new Company(data.nm_empresa, data.cd_acao, data.setor_economico, data.subsetor, data.subsetor)
            upsertCompany(company)
        })
    } else {
        console.log('It does not need to update!')
    }
}

export default updateQuotesService
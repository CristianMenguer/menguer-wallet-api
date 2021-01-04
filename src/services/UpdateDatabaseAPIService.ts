import Company from '../entities/Company'
import Quote from '../entities/Quote'
import { upsertCompany } from '../models/Company'
import { upsertQuote, getLastUpdateByCodeStock } from '../models/Quote'
import { replaceAll, sleep, sleep2 } from '../Utils/Utils'
import { dateToPregao, pregaoToDate } from '../Utils/ValidateInputs'
import apiCompanies from './GetCompaniesApiService'
import { apiDaily } from './GetDailyApiService'
import apiHistorical from './GetHistoricalApiService'
import sysInfoApiDaily from './GetLastUpdateApiService'

export const firstInsertion = async (): Promise<void> => {

    const sysInfo = await sysInfoApiDaily()
    if (!!!sysInfo) {
        console.log('API LABDO not responding!')
        return
    }

    const companies = await apiCompanies()

    const lenCompanies = companies.length
    let countCompanies = 0

    let count = 0
    await Promise.all(companies.map(async (companyAPI) => {
        countCompanies++
        console.log(`log => companies: ${countCompanies}/${lenCompanies}`)
        const codes: string[] = replaceAll(companyAPI.cd_acao, ' ', '').split(',')
        //
        await Promise.all(codes.map(async (code) => {
            if (code.length >= 4) {
                count++
                //
                sleep2(50)
                const quotes = await apiHistorical(code, true)
                const lenQuotes = Object.keys(quotes).length
                console.log(lenQuotes)
                //
                if (!!quotes && lenQuotes > 0) {
                    let countQuotes = 0
                    const company: Company = new Company(companyAPI.id, companyAPI.cd_acao_rdz, companyAPI.nm_empresa, companyAPI.cd_acao, companyAPI.setor_economico, companyAPI.subsetor, companyAPI.subsetor)
                    await upsertCompany(company)
                    //
                    const lastUpdate = await getLastUpdateByCodeStock(code)
                    //
                    await Promise.all(Object.keys(quotes).map(async (keyDate) => {
                        countQuotes++
                        console.log(`log => companies: ${countCompanies}/${lenCompanies} ... => quotes: ${countQuotes}/${lenQuotes}`)
                        const dateAPI = new Date(keyDate)
                        const needsUpdate = !lastUpdate || (dateAPI !== lastUpdate)
                        //
                        if (needsUpdate) {
                            //console.log('\n-' + code + `- needs update (${keyDate})`)

                            // @ts-ignore
                            const quoteAPI = quotes[keyDate] as HistoricalResponse
                            // console.log('quoteAPI')
                            // console.log(quoteAPI)
                            const quoteToInsert = new Quote(company.id_api, code, parseFloat(quoteAPI['1. open']), parseFloat(quoteAPI['4. close']), parseFloat(quoteAPI['2. high']), parseFloat(quoteAPI['3. low']), parseFloat(quoteAPI['6. volume']), dateAPI, parseFloat(quoteAPI['7. dividend amount']), parseFloat(quoteAPI['8. split coefficient']))
                            // console.log('quoteToInsert')
                            // console.log(quoteToInsert)
                            await upsertQuote(quoteToInsert)
                            sleep2(100)
                        } else {
                            //console.log('\n-' + code + '- is up to date')
                        }
                    }))
                }
            }
        }))
    }))
}

export const updateQuotesService = async (): Promise<void> => {
    /**
        const sysInfo = await sysInfoApiDaily()
        if (!!!sysInfo) {
            console.log('API LABDO not responding!')
            return
        }
    
        const lastDateAPI = sysInfo.dt_ultimo_pregao
    
        sleep(1000)
    
        const companies = await apiCompanies()
    
        companies.map(async (data) => {
            const company: Company = new Company(data.id, data.cd_acao_rdz, data.nm_empresa, data.cd_acao, data.setor_economico, data.subsetor, data.subsetor)
            upsertCompany(company)
            //
            const codes: string[] = replaceAll(company.code, ' ', '').split(',')
    
            codes.map(async (code) => {
                if (code.length >= 4) {
                    const lastUpdate = await getLastUpdateByCodeStock(code)
                    const needsUpdate = !lastUpdate || (lastDateAPI !== dateToPregao(lastUpdate))
                    //
                    if (needsUpdate) {
                        console.log('\n-' + code + '- needs update')
                        sleep(1000)
                        const quotes = await apiDaily(code)
                        quotes.map(async (object) => {
                            // YYYYMMDD
                            const dtPregao = pregaoToDate(object.dt_pregao)
                            if (!!dtPregao && !!lastUpdate && dtPregao > lastUpdate) {
                                const quote = new Quote(object.id, company.id_api, object.cd_acao, object.vl_abertura, object.vl_fechamento, object.vl_maximo, object.vl_minimo, object.vl_volume, dtPregao)
                                console.log(quote)
                                sleep(1000)
                                //upsertQuote(quote)
                            }
                        })
                        //
                    } else {
                        console.log('\n-' + code + '- is up to date')
                    }
    
                }
            })
    
        })
    
        // console.log('\nlastUpdate')
        // console.log(lastUpdate)
    
        // if (lastUpdate !== null)
        //     console.log(dateToPregao(lastUpdate))
     */
}


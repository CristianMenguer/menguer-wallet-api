import Company from '../entities/Company'
import Quote from '../entities/Quote'
import { mapSeries } from 'async'

import { getCompanies, upsertCompany } from '../models/Company'
import { upsertQuote, getLastUpdateByCodeStock, getAmountQuotesByCodeStock } from '../models/Quote'
import { padL, replaceAll, sleep, sleep2 } from '../Utils/Utils'
import apiCompanies from './GetCompaniesApiService'
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
    let previousPerc = 0
    let previousDate = new Date()
    //
    await mapSeries(companies, async (companyAPI, callbackCompany): Promise<void> => {
        countCompanies++
        console.log(`\n\nlog => companies => ${padL((companyAPI.nm_empresa), ' ', 20)}: ${padL(countCompanies + '/' + lenCompanies, ' ', 10)} - ${Math.trunc((countCompanies * 100) / lenCompanies)}%`)
        const codes: string[] = replaceAll(companyAPI.cd_acao, ' ', '').split(',')
        //
        if (countCompanies >= 40) {
            await mapSeries(codes, async (code, callbackCode): Promise<void> => {
                if (code.length >= 4) {
                    while (((new Date()).getTime() - previousDate.getTime()) < 15000)
                        await sleep(1000)
                    //
                    const quotes = await apiHistorical(code, true)
                    previousDate = new Date()
                    const lenQuotes = Object.keys(quotes).length
                    const lenQuotesDB = await getAmountQuotesByCodeStock(code)
                    //
                    console.log(`lenQuotes: ${lenQuotes} <==> lenQuotesDB: ${lenQuotesDB}`)
                    //
                    if (!!quotes && lenQuotes > 0 && lenQuotes > lenQuotesDB) {
                        let countQuotes = 0
                        const company: Company = new Company(companyAPI.id, companyAPI.cd_acao_rdz, companyAPI.nm_empresa, companyAPI.cd_acao, companyAPI.setor_economico, companyAPI.subsetor, companyAPI.subsetor)
                        await upsertCompany(company)
                        //
                        const lastUpdate = await getLastUpdateByCodeStock(code)
                        //
                        await mapSeries(Object.keys(quotes), async (keyDate, callbackDate): Promise<void> => {
                            countQuotes++
                            if (previousPerc !== Math.trunc((countQuotes * 100) / lenQuotes)) {
                                previousPerc = Math.trunc((countQuotes * 100) / lenQuotes)
                                //
                                console.log(`log => companies ${(code)}: ${countCompanies}/${lenCompanies} (${Math.trunc((countCompanies * 100) / lenCompanies)}%) ... => quotes (${keyDate}): ${countQuotes}/${lenQuotes} (${previousPerc}%)`)
                            }
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
                            } else {
                                //console.log('\n-' + code + '- is up to date')
                            }
                            callbackDate()
                        })
                    }
                }
                callbackCode()
            })
        }
        callbackCompany()
    })
}

export const updateQuotesService = async (): Promise<void> => {

    let previousDate = new Date()

    const companies = await getCompanies()

    const lenCompanies = companies.length
    let countCompanies = 0
    //
    await mapSeries(companies, async (companyDB, callbackCompany): Promise<void> => {
        countCompanies++
        console.log(`\n\nlog => companies => ${padL((companyDB.name), ' ', 20)}: ${padL(countCompanies + '/' + lenCompanies, ' ', 10)} - ${Math.trunc((countCompanies * 100) / lenCompanies)}%`)
        const codes: string[] = replaceAll(companyDB.code, ' ', '').split(',')
        //
        await mapSeries(codes, async (code, callbackCode): Promise<void> => {
            if (code.length >= 4) {
                while (((new Date()).getTime() - previousDate.getTime()) < 15000)
                    await sleep(1000)
                //
                const quotes = await apiHistorical(code, false)
                previousDate = new Date()
                const lenQuotes = Object.keys(quotes).length
                //
                if (!!quotes && lenQuotes > 0) {
                    //
                    const lastUpdate = await getLastUpdateByCodeStock(code)
                    //
                    await mapSeries(Object.keys(quotes), async (keyDate, callbackDate): Promise<void> => {
                        const dateAPI = new Date(keyDate)
                        const needsUpdate = !lastUpdate || (dateAPI > lastUpdate)
                        //
                        //console.log(`DateAPI: ${dateAPI} <==> DateLastUpdate: ${lastUpdate} <==> needsUpdate: ${needsUpdate}`)
                        if (needsUpdate) {
                            // @ts-ignore
                            const quoteAPI = quotes[keyDate] as HistoricalResponse
                            const quoteToInsert = new Quote(companyDB.id_api, code, parseFloat(quoteAPI['1. open']), parseFloat(quoteAPI['4. close']), parseFloat(quoteAPI['2. high']), parseFloat(quoteAPI['3. low']), parseFloat(quoteAPI['6. volume']), dateAPI, parseFloat(quoteAPI['7. dividend amount']), parseFloat(quoteAPI['8. split coefficient']))
                            await upsertQuote(quoteToInsert)
                        } else {
                            //console.log('\n-' + code + '- is up to date')
                        }
                        callbackDate()
                    })
                }
            }
            callbackCode()
        })
        callbackCompany()
    })
}


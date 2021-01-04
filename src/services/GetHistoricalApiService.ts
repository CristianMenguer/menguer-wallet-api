import axios from 'axios'

const API_ALPHAVANTAGE_KEY = process.env.API_ALPHAVANTAGE_KEY as string

export const apiHistorical = async (companyCode: string, fullData: boolean = false): Promise<HistoricalResponse[]> => {
    const api = 'https://www.alphavantage.co/query?function=TIME_SERIES_DAILY_ADJUSTED'
    const link = `${api}&symbol=${companyCode}.SA${fullData ? '&outputsize=full' : '&outputsize=compact'}&apikey=${API_ALPHAVANTAGE_KEY}`

    return new Promise(async (resolve, reject) => {
        try {
            const response = await axios.get(link)
            if (!!response && !!response.data && response.data['Time Series (Daily)']) {
                resolve(response.data['Time Series (Daily)'])
            }
            else
                resolve([])
            //
        } catch (err) {
            console.log(' > GetHistoricalApiService.ts > apiHistorical > Error')
            console.log(err)
            resolve([])
        }

    })
}

export default apiHistorical
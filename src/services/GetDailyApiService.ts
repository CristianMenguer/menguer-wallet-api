import axios from 'axios'

// https://api-cotacao-b3.labdo.it/

export const apiDaily = async (companyIdAPI: number): Promise<DailyResponse[]> => {
    const api = 'https://api-cotacao-b3.labdo.it/api/empresa'
    const link = `${api}/${companyIdAPI}/cotacoes/02`

    return new Promise(async (resolve, reject) => {
        try {
            const response = await axios.get(link)

            if (!!response) {
                console.log('response.data')
                console.log(response.data[0])
                await sleep(2000)
                resolve(response.data)
            }
            else
                reject({
                    error: 'error',
                    message: 'Empty return!'
                })
        } catch (err) {
            console.log(' > GetDailyApiService.ts > apiDaily > Error')
            console.log(err)
            reject(err)
        }

    })
}

export default apiDaily
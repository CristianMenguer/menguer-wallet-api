import axios from 'axios'
import { sleep } from '../Utils/Sleep'

// https://api-cotacao-b3.labdo.it/

export const apiDaily = async (companyIdAPI: number): Promise<DailyResponse[]> => {
    const api = 'https://api-cotacao-b3.labdo.it/api/empresa'
    const link = `${api}/${companyIdAPI}/cotacoes/02`

    return new Promise(async (resolve, reject) => {
        try {
            const response = await axios.get(link)

            if (!!response) {
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
import axios from 'axios'

// https://api-cotacao-b3.labdo.it/

const sysInfoApiDaily = async (): Promise<SysInfoResponse | null> => {
    const link = 'https://api-cotacao-b3.labdo.it/api/sysinfo'
    
    return new Promise(async (resolve, reject) => {
        try {
            const response = await axios.get(link)
            
            if (!!response)
                resolve(response.data)
            else
                reject({
                    error: 'error',
                    message: 'Empty return!'
                })
        } catch (err) {
            console.log(' > GetLastUpdateApiService.ts > sysInfoApiDaily > Error')
            console.log(err)
            resolve(null)
        }

    })
}

export default sysInfoApiDaily
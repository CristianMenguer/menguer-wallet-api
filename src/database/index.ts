import { MongoClient } from 'mongodb'
import { config } from 'dotenv'

config()

const uri = process.env.MONGO_URI as string
const DB_NAME = process.env.MONGO_DB_NAME as string
const MONGO_OPTIONS = {
    useUnifiedTopology: true, useNewUrlParser: true
}

export const info = () => {
    console.log('uri: ' + uri)
    console.log('db_name: ' + DB_NAME)    
}

export const aggregate = (collectionName: string, pipeline = [], query = {}) => {

    return new Promise((resolve, reject) => {
        MongoClient.connect(uri, MONGO_OPTIONS, (err, client) => {
            if (err) {
                console.log(' --- aggregate ERROR --- ')
                console.log(err)
                reject(err)
            }

            const db = client.db(DB_NAME)
            const collection = db.collection(collectionName)

            const newPipe = createPipeline(pipeline, query)
            
            collection.aggregate(newPipe).toArray((err, docs) => {
                if (err) {
                    console.log(' --- aggregate ERROR --- ')
                    console.log(err)
                    reject(err)
                }
                resolve(docs)
                client.close()
            })
        })
    })
}

const createPipeline = (pipeline: {}[], query = {}): {}[] => {
    const queryArr = Object.entries(query)

    if (queryArr.length) {
        const LOOKUP_MATCH = [
            {
                $match: query
            }
        ]
        //
        return [...pipeline, ...LOOKUP_MATCH]
    }
    //
    return pipeline
}

export const get = (collectionName: string, query = {}): Promise<Object[]> => {

    return new Promise((resolve, reject) => {
        MongoClient.connect(uri, MONGO_OPTIONS, (err, client) => {
            if (err) {
                console.log(' --- get ERROR --- ')
                console.error('An error occurred connecting to MongoDB: ', err)
                reject(err)
            }
            //
            const db = client.db(DB_NAME)
            const collection = db.collection(collectionName)

            collection.find(query).toArray((err, docs) => {
                if (err) {
                    console.error('An error occurred getting data from MongoDB: ', err)
                    reject(err)
                }
                //
                resolve(docs)
                client.close()
            })
        })
    })
}

export const add = (collectionName: string, item: object) => {
    return new Promise((resolve, reject) => {
        MongoClient.connect(uri, MONGO_OPTIONS, (err, client) => {
            if (err) {
                console.log(' --- add ERROR --- ')
                console.log(err)
                reject(err)
            }
            const db = client.db(DB_NAME)
            const collection = db.collection(collectionName)
            collection.insertOne(item, (err, result) => {
                if (err) {
                    console.log(' --- add ERROR --- ')
                    console.log(err)
                    reject(err)
                }
                resolve(result)
                client.close()
            })
        })
    })
}

export const update = (collectionName: string, filter = {}, update = {}, options = {}) => {
    return new Promise((resolve, reject) => {
        MongoClient.connect(uri, MONGO_OPTIONS, (err, client) => {
            if (err) {
                console.log(' --- update ERROR --- ')
                console.log(err)
                reject(err)
            }
            const db = client.db(DB_NAME)
            const collection = db.collection(collectionName)
            collection.findOneAndUpdate(filter, update, { returnOriginal: false, ...options }, (err, result) => {
                if (err) {
                    console.log(' --- update ERROR --- ')
                    console.log(err)
                    reject(err)
                }
                //
                resolve(result.value)
                client.close()
            })
        })
    })
}

export const count = ((collectionName: string) => {
    return new Promise((resolve, reject) => {
        MongoClient.connect(uri, MONGO_OPTIONS, (err, client) => {
            if (err) {
                console.log(' --- count ERROR --- ')
                console.log(err)
                reject(err)
            }
            const db = client.db(DB_NAME)
            const collection = db.collection(collectionName)
            collection.countDocuments({}, (err, docs) => {
                if (err) {
                    console.log(' --- count ERROR --- ')
                    console.log(err)
                    reject(err)
                }
                resolve(docs)
                client.close()
            })
        })
    })
})

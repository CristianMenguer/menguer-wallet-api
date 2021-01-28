import { MongoClient } from 'mongodb'
import { config } from 'dotenv'

/**
 * This is the file that connects to the MongoDB Database, all the connections 
 * are in this file.
 */


// This method is necessary to read the environment variables
config()

// Here the enviroment variables are read
const uri = process.env.MONGO_URI as string
const DB_NAME = process.env.MONGO_DB_NAME as string
const MONGO_OPTIONS = {
    useUnifiedTopology: true, useNewUrlParser: true
}

// Method used only for tests, to check if the variables were read correctly
export const info = () => {
    console.log('uri: ' + uri)
    console.log('db_name: ' + DB_NAME)
}

// Function that use the method Aggregate from MongoDB, 
// receiving a Pipeline and sending it as a parameter
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

// Function that creates a Pipeline properly to be sent
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

// Function that use the method find from MongoDB, 
// sending a query as parameter if sent to the function
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

// Function that use the method insertOne from MongoDB, 
// adding a new object to the Database
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

// Function that use the method findOneAndUpdate from MongoDB, 
// updating an object in the Database
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

// Function that use the method countDocuments from MongoDB, 
// returning the total of documents in a specific collection
export const count = ((collectionName: string, filter = {}) => {
    return new Promise((resolve, reject) => {
        MongoClient.connect(uri, MONGO_OPTIONS, (err, client) => {
            if (err) {
                console.log(' --- count ERROR --- ')
                console.log(err)
                reject(err)
            }
            const db = client.db(DB_NAME)
            const collection = db.collection(collectionName)
            collection.countDocuments(filter, (err, docs) => {
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

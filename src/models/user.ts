import * as db from '../database'
import User from '../entities/User'

const COLLECTION = 'user'

export const createNewUser = async (user: User): Promise<User> => {
    try {
        const results = await db.add(COLLECTION, user) as UserResponseInsert
        return results.ops[0]
    } catch (err) {
        console.log('Error: > user.model > createNewUser:')
        console.log(err)
        return {} as User
    }
}

export const getUsers = async (query = {}): Promise<User[]> => {
    
    try {
        const users = await db.get(COLLECTION, query) as User[]
        console.log(users)
        return users
    }
    catch (err) {
        console.log('Error: > user.model > getUsers:')
        console.log(err)
        return []
    }
}
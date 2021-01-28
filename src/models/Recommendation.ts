import * as db from '../database'
import Recommendation from '../entities/Recommendation'

const COLLECTION = 'recommendation'

// This function returns all the Recommendations from the Database
export const getRecommendations = async (query = {}): Promise<Recommendation[]> => {
    
    try {
        const recommendations = await db.get(COLLECTION, query) as Recommendation[]
        
        return recommendations
    }
    catch (err) {
        console.log('Error: > Recommendation.model > getRecommendations:')
        console.log(err)
        return []
    }
}
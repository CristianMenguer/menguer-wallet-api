import * as db from '../database'
import Recommendation from '../entities/Recommendation'

const COLLECTION = 'recommendation'

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
import { Router, Request, Response } from 'express'

import ensureAuthenticated from '../middlewares/ensureAuthenticated'
import { getRecommendations } from '../models/Recommendation'

const analysisRoutes = Router()

//analysisRoutes.use(ensureAuthenticated)

analysisRoutes.get('/', async (request: Request, response: Response) => {

    const dateFilter = new Date()
    dateFilter.setMonth(dateFilter.getMonth() - 1)
    const recommendations = await getRecommendations({date: {$gte: dateFilter}})

    return response.json(recommendations)

})

export default analysisRoutes
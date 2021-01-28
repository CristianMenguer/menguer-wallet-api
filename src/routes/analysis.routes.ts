import { Router, Request, Response } from 'express'

import ensureAuthenticated from '../middlewares/ensureAuthenticated'
import { getRecommendations } from '../models/Recommendation'

const analysisRoutes = Router()

// All the routes for analysis are handled here.

// This line enables the need of authentication
// All the routes from here will need to have a valid token to access
analysisRoutes.use(ensureAuthenticated)

// This route returns all the recommendations from the past month
analysisRoutes.get('/', async (request: Request, response: Response) => {

    const dateFilter = new Date()
    dateFilter.setMonth(dateFilter.getMonth() - 1)
    const recommendations = await getRecommendations({date: {$gte: dateFilter}})

    return response.json(recommendations)

})

export default analysisRoutes
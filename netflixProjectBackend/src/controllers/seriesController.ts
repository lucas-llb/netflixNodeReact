import { Request, Response } from "express";
import { serieService } from "../services/serieService";
import { getPaginationParams } from "../helpers/getPaginationParams";
import { AuthenticatedRequest } from "../middlewares/authMiddleware";
import { likeService } from "../services/likeService";
import { favoriteService } from "../services/favoriteService";

export const seriesController = {
    show: async (req: AuthenticatedRequest, res: Response) => {
        const serieId = req.params.id;
        console.log(serieId)
        const userId = req.user!.id;
        try {
            const series = await serieService.findByIdWithEpisodes(serieId);

            if(!series) {
                return res.status(400).json({message: 'Serie not found'});
            }
            
            const liked = await likeService.isLiked(userId, Number(serieId));
            const favorited = await favoriteService.isFavorite(userId, Number(serieId));
            return res.json({...series.get(), liked, favorited})
        }
        catch (err) {
            if(err instanceof Error){
                return res.status(400).json({ message: err.message })
            }
        }
    },

    featured: async (req: Request, res: Response) => {
        try {
            const featuredSeries = await serieService.getRandomFeaturedSeries();

            return res.json(featuredSeries);
        }
        catch (err) {
            if(err instanceof Error){
                return res.status(400).json({ message: err.message })
            }
        }
    },

    newest: async (req: Request, res: Response) => {
        try {
            const newestSeries = await serieService.getTopTenNewest();

            return res.json(newestSeries);
        }
        catch (err) {
            if(err instanceof Error){
                return res.status(400).json({ message: err.message })
            }
        }
    },

    search: async (req: Request, res: Response) => {
        const { name } = req.query;
        const [page, perPage] = getPaginationParams(req.query)
        try {
            if(typeof name !== 'string'){
                throw new Error('Name must be a string')
            }

            const filteredSeries = await serieService.findByName(name, page, perPage);

            return res.json(filteredSeries);
        }
        catch (err) {
            if(err instanceof Error){
                return res.status(400).json({ message: err.message })
            }
        }
    },

    popular: async (req: Request, res: Response) => {
        try{
            const topTen = await serieService.getTopTenByLikes();
            return res.json(topTen)
        }
        catch (err){
            if(err instanceof Error){
                return res.status(400).json({ message: err.message })
            }
        }
    }
}
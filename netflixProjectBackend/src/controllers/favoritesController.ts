import { Response } from "express";
import { AuthenticatedRequest } from "../middlewares/authMiddleware";
import { favoriteService } from "../services/favoriteService";

export const favoritesController = {
    save: async (req: AuthenticatedRequest, res: Response) => {
        const userId = req.user!.id;
        const { serieId } = req.body;

        try {
            const favorite = await favoriteService.create(userId, serieId);
            return res.status(201).json(favorite)
        }
        catch (err) {
            if(err instanceof Error){
                return res.status(400).json({ message: err.message })
            }
        }
    },

    index: async (req: AuthenticatedRequest, res: Response) => {
        const userId = req.user!.id;

        try {
            const favorite = await favoriteService.findByUserId(userId);
            return res.status(201).json(favorite)
        }
        catch (err) {
            if(err instanceof Error){
                return res.status(400).json({ message: err.message })
            }
        }
    },

    remove: async (req: AuthenticatedRequest, res: Response) => {
        const userId = req.user!.id;
        const serieId = req.params.id

        try {
             await favoriteService.remove(userId, Number(serieId));
            return res.status(204).send()
        }
        catch (err) {
            if(err instanceof Error){
                return res.status(400).json({ message: err.message })
            }
        }
    }
}
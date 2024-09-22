import { Response } from "express";
import { AuthenticatedRequest } from "../middlewares/authMiddleware";
import { likeService } from "../services/likeService";

export const likesController = {
    save: async (req: AuthenticatedRequest, res: Response) => {
        const userId = req.user!.id;
        const { serieId } = req.body;

        try {
            const like = await likeService.create(userId, serieId)
            return res.status(201).json(like);
        }
        catch (err) {
            if(err instanceof Error){
                return res.status(400).json({ message: err.message })
            }
        }
    },

    remove: async (req: AuthenticatedRequest, res: Response) => {
        const userId = req.user!.id;
        const serieId = req.params.id;

        try {
            await likeService.remove(userId, Number(serieId))
            return res.status(204).send();
        }
        catch (err) {
            if(err instanceof Error){
                return res.status(400).json({ message: err.message })
            }
        }
    }
}
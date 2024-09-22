import { Request, Response } from "express";
import { episodeService } from "../services/episodeService";
import { AuthenticatedRequest } from "../middlewares/authMiddleware";


export const episodesController = {
    stream: async (req: Request, res: Response) => {
        const { videoUrl } = req.query;

        try {
            if(typeof videoUrl !== 'string'){
                throw new Error('VideoUrl must be a string');
            }
            const range = req.headers.range; //bytes=0-1024

            episodeService.streamEpisodeToResponse(res, videoUrl, range);
        }
        catch (err) {
            if (err instanceof Error){
                res.status(400).json( { message: err.message });
            }
        }
    },

    getWatchTime: async (req: AuthenticatedRequest, res: Response) => {
        const userId = req.user!.id;
        const episodeId = req.params.id;

        try {
            const watchTime = await episodeService.getWatchTime(userId, Number(episodeId));
            return res.json(watchTime);
        }
        catch(err){
            if (err instanceof Error){
                res.status(400).json( { message: err.message });
            }
        }
    },

    setWatchTime: async (req: AuthenticatedRequest, res: Response) => {
        const userId = req.user!.id;
        const episodeId = Number(req.params.id);
        const { seconds } = req.body;
        console.log(seconds)
        

        try {
            const watchTime = await episodeService.setWatchTime({ userId, episodeId, seconds });
            return res.json(watchTime);
        }
        catch(err){
            if (err instanceof Error){
                res.status(400).json( { message: err.message });
            }
        }
    }
}
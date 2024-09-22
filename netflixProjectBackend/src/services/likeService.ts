import { Like } from "../models"

export const likeService = {
    create: async (userId: number, serieId: number) => {
        const like = await Like.create({
            userId,
            serieId,
        });

        return like;
    },

    remove: async (userId: number, serieId: number) => {
        await Like.destroy({
            where: {
                userId,
                serieId
            }
        });
    },

    isLiked: async (userId: number, serieId: number) => {
        const like = await Like.findOne( {
            where: {
                userId,
                serieId
            }
        })

        return like !== null;
    }
}
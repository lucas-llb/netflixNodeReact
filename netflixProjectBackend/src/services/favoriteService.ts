import { Favorite } from "../models"

export const favoriteService = {
    create: async (userId: number, serieId: number) => {
        const favorite = Favorite.create({
            serieId,
            userId
        })

        return favorite;
    },

    findByUserId: async (userId: number) => {
        const favorites = await Favorite.findAll({
            where: {
                userId
            },
            attributes: [['user_id', 'userId']],
            include:{
                association: 'Serie',
                attributes: [
                    'id',
                    'name',
                    'synopsis',
                    ['thumbnail_url', 'thumbnailUrl']
                ]
            }
        })

        return {
            userId,
            series: favorites.map(fav => fav.Serie)
        };
    },

    remove: async (userId: number, serieId: number) => {
        await Favorite.destroy( {
            where: {
                userId,
                serieId
            }
        })
    },

    isFavorite: async (userId: number, serieId: number) => {
        const favorite = await Favorite.findOne({
            where: {
                userId,
                serieId
            }
        })

        return favorite !== null;
    }
}
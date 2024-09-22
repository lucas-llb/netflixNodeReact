import { User } from "../models"
import { EpisodeInstance } from "../models/Episode";
import { UserCreationAttributes } from "../models/User";

function filterLastEpisodesBySerie(episodes: EpisodeInstance[]){
    const seriesOnList: number[] = [];

    const lastEpisodes = episodes.reduce((currentList, episode) => {
        if(!seriesOnList.includes(episode.serieId)){
            seriesOnList.push(episode.serieId);
            currentList.push(episode);
            return currentList;
        }

        const episodeFromSameSerie = currentList.find(ep => ep.serieId == episode.serieId);
        if(episodeFromSameSerie!.order > episode.order){
            return currentList;
        }

        const listWithoutEpisodeFromSameSerie = currentList.filter(ep => ep.serieId !== episode.serieId);
        listWithoutEpisodeFromSameSerie.push(episode);

        return listWithoutEpisodeFromSameSerie;
    }, [] as EpisodeInstance[]);

    return lastEpisodes;
}

export const userService = {
    findByEmail: async (email: string) => {
        const user = await User.findOne({
            where: {
                email
            }
        })

        return user;
    },

    create: async (attributes: UserCreationAttributes) => {
        const user = await User.create(attributes);
        return user;
    },

    getKeepWatchingList: async (userId: number) => {
        const userWithWatchingEpisodes = await User.findByPk(userId, {
            include: {
                association: 'episodes',
                attributes: [
                    'id',
                    'name',
                    'synopsis',
                    'order',
                    ['serie_id', 'serieId'],
                    ['video_url', 'videoUrl'],
                    ['seconds_long', 'secondsLong']
                ],
                include: [{
                    association: 'series',
                    attributes: [
                        'id',
                        'name',
                        'synopsis',
                        ['thumbnail_url', 'thumbnailUrl']
                    ],
                    as: 'serie'
                }],
                through: {
                    as: 'watchTime',
                    attributes: [
                        'seconds',
                        ['updated_at', 'updatedAt']
                    ]
                }
            }
        });

        if(!userWithWatchingEpisodes){
            throw new Error('User not found')
        }
//@ts-ignore
        return filterLastEpisodesBySerie(userWithWatchingEpisodes.Episodes!).sort((a, b) => a.watchTime!.updatedAt < b.watchTime.updatedAt ? 1: -1)
    },

    update: async (id: number, attributes: {
        firstName: string
        lastName: string
        phone: string
        birth: Date
        email: string
    }) => {
        const [affectedRows, updatedUsers ] = await User.update(attributes, {
            where: {
                id
            },
            returning: true
        });

        return updatedUsers[0];
    },

    updatePassword: async (id: number, password: string) => {
        const [affectedRows, updatedUsers ] = await User.update({ password }, {
            where: { id },
            returning: true,
            individualHooks: true
        });

        return updatedUsers[0];
    }
}
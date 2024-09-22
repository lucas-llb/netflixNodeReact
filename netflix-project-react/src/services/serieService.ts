import api from './api';

export type EpisodeType = {
    id: number;
    name: string;
    synopsis: string;
    order: number;
    videoUrl: string;
    secondsLong: number;
}

export type SerieType = {
    id: number;
    name: string;
    thumbnailUrl: string;
    synopsis: string;
    episodes?: EpisodeType[];
};

const SerieService = {
    getNewestSeries: async () => {
        const res = await api.get("/series/newest").catch((error) => {
            return error.response;
        });

        return res;
    },
    getFeaturedSeries: async () => {
        const token = sessionStorage.getItem("netflix-token");

        const res = await api.get("/series/featured", {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }).catch((error) => {
            return error.response;
        });

        return res;
    },
    addToFavorite: async (serieId: number | string) => {
        const token = sessionStorage.getItem("netflix-token");

        const res = await api.post("/favorites", {serieId},{
            headers: {
                Authorization: `Bearer ${token}`
            }
        }).catch((error) => {
            return error.response;
        });

        return res;
    },
    removeFavorite: async (serieId: number | string) => {
        const token = sessionStorage.getItem("netflix-token");

        const res = await api.delete(`/favorites/${serieId}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }).catch((error) => {
            return error.response;
        });

        return res;
    },
    getFavorites: async () => {
        const token = sessionStorage.getItem("netflix-token");

        const res = await api.get("/favorites", {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }).catch((error) => {
            return error.response;
        });

        return res;
    },
    getSearch: async (name: string) => {
        const token = sessionStorage.getItem("netflix-token");

        const res = await api.get(`/series/search?name=${name}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }).catch((error) => {
            return error.response;
        });

        return res;
    },
    getEpisodes: async (id: string | number) => {
        const token = sessionStorage.getItem("netflix-token");

        const res = await api.get(`/series/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }).catch((error) => {
            return error.response;
        });

        return res;
    },
    addLike: async (serieId: number | string) => {
        const token = sessionStorage.getItem("netflix-token");

        const res = await api.post("/likes", {serieId}, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }).catch((error) => {
            return error.response;
        });

        return res;
    },
    removeLike: async (serieId: number | string) => {
        const token = sessionStorage.getItem("netflix-token");

        const res = await api.delete(`/likes/${serieId}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }).catch((error) => {
            return error.response;
        });

        return res;
    }

};

export default SerieService;
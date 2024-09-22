import api from "./api"
import { SerieType } from "./serieService";

export type CategoryType = {
    id: number;
    name: string;
    position: number;
    series?: SerieType[];
};

const CategoriesService = {
    getCategories: async () => {
        const token = sessionStorage.getItem("netflix-token");

        const res = await api.get("/categories", {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }).catch((error) => {
            return error.response;
        });

        return res;
    },
    getSeries: async (id: number) => {
        const token = sessionStorage.getItem("netflix-token");

        const res = await api.get(`/categories/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }).catch((error) => {
            return error.response;
        });

        return res;
    }
}

export default CategoriesService;
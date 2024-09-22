import AdminJs, { PageHandler } from "adminjs";
import { Category, Episode, Serie, User } from "../models";

export const dashboardOptions: {
    handler?: PageHandler,
    component?:string
} = {
    component: AdminJs.bundle("./components/Dashboard"),
    handler: async (req, res, context) => {
      const series = await Serie.count();
      const episodes = await Episode.count();
      const categories = await Category.count();
      const users = await User.count({where: { role:'user'}})

      res.json({
        'Series': series,
        'Episódios': episodes,
        'Categorias': categories,
        'Usuários': users
      })
    }
  }
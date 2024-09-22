import { DataTypes, Model } from "sequelize"
import { sequelize } from "../database"
import { UserInstance } from "./User"
import { SerieInstance } from "./Serie"

export interface Favorite {
  userId: number
  serieId: number
}

export interface FavoriteInstance extends Model<Favorite>, Favorite {
  Serie?: SerieInstance
  User?: UserInstance
}

export const Favorite = sequelize.define<FavoriteInstance, Favorite>('Favorite', {
  userId: {
    allowNull: false,
    primaryKey: true,
    type: DataTypes.INTEGER,
    references: {
      model: 'users',
      key: 'id'
    },
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE'
  },
  serieId: {
    allowNull: false,
    primaryKey: true,
    type: DataTypes.INTEGER,
    references: {
      model: 'series',
      key: 'id'
    },
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE'
  }
})
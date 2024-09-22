import { Optional, Model, DataTypes } from "sequelize"
import { sequelize } from "../database"

export interface Serie {
    id: number
    name: string
    synopsis: string
    thumbnailUrl: string
    featured: boolean
    categoryId: number
}

export interface SerieCreationAttributes extends Optional<Serie, 'id' | 'thumbnailUrl' | 'featured'> { }

export interface SerieInstance extends Model<Serie, SerieCreationAttributes>, Serie {}

export const Serie = sequelize.define<SerieInstance, Serie>('Serie', {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER
  },
  name: {
    allowNull: false,
    type: DataTypes.STRING
  },
  synopsis: {
    allowNull: false,
    type: DataTypes.TEXT
  },
  thumbnailUrl: {
    type: DataTypes.STRING
  },
  featured: {
    defaultValue: false,
    type: DataTypes.BOOLEAN
  },
  categoryId: {
    allowNull: false,
    type: DataTypes.INTEGER,
    references: { model: 'categories', key: 'id' },
    onUpdate: 'CASCADE',
    onDelete: 'RESTRICT'
  }
})
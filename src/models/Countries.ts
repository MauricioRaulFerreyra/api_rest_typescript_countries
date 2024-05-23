// src/models/Country.ts
import { DataTypes, Model, Sequelize } from 'sequelize'

interface CountryAttributes {
  id: string
  name: string
  image: any // Puedes ajustar este tipo según la estructura real de tu imagen
  continent: string[]
  capital: string[]
  subregion?: string
  area?: number
  population?: number
}

class Country extends Model<CountryAttributes> implements CountryAttributes {
  public id!: string
  public name!: string
  public image!: any // Puedes ajustar este tipo según la estructura real de tu imagen
  public continent!: string[]
  public capital!: string[]
  public subregion?: string
  public area?: number
  public population?: number

  // timestamps!
  public readonly createdAt!: Date
  public readonly updatedAt!: Date
}

export function initCountry (sequelize: Sequelize) {
  Country.init(
    {
      id: {
        type: DataTypes.STRING(3),
        allowNull: false,
        primaryKey: true
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false
      },
      image: {
        type: DataTypes.JSON,
        allowNull: false
      },
      continent: {
        type: DataTypes.ARRAY(DataTypes.STRING),
        allowNull: false
      },
      capital: {
        type: DataTypes.ARRAY(DataTypes.STRING),
        allowNull: false
      },
      subregion: {
        type: DataTypes.STRING
      },
      area: {
        type: DataTypes.FLOAT
      },
      population: {
        type: DataTypes.INTEGER
      }
    },
    {
      sequelize,
      timestamps: false,
      modelName: 'Country'
    }
  )

  return Country
}

export default Country

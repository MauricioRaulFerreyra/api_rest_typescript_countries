// src/models/Activity.ts
import { DataTypes, Model, Optional, Sequelize } from 'sequelize'

interface ActivityAttributes {
  id: string
  name: string
  difficulty?: '1' | '2' | '3' | '4' | '5'
  duration?: string
  season?: 'Verano' | 'Otoño' | 'Invierno' | 'Primavera'
}

interface ActivityCreationAttributes
  extends Optional<ActivityAttributes, 'id'> {}

class Activity
  extends Model<ActivityAttributes, ActivityCreationAttributes>
  implements ActivityAttributes
{
  public id!: string
  public name!: string
  public difficulty?: '1' | '2' | '3' | '4' | '5'
  public duration?: string
  public season?: 'Verano' | 'Otoño' | 'Invierno' | 'Primavera'

  public readonly createdAt!: Date
  public readonly updatedAt!: Date
}

export function initActivity (sequelize: Sequelize) {
  Activity.init(
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        primaryKey: true
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false
      },
      difficulty: {
        type: DataTypes.ENUM('1', '2', '3', '4', '5')
      },
      duration: {
        type: DataTypes.STRING
      },
      season: {
        type: DataTypes.ENUM('Verano', 'Otoño', 'Invierno', 'Primavera')
      }
    },
    {
      sequelize,
      timestamps: false,
      modelName: 'Activity'
    }
  )

  return Activity
}

export default Activity

import { Sequelize } from 'sequelize'
import dotenv from 'dotenv'
import { initCountry } from './models/Countries'
import { initActivity } from './models/Activities'

dotenv.config()

interface Config {
  logging: boolean
  native: boolean
  dialect?: string
  dialectOptions?: {
    ssl: {
      require: boolean
      rejectUnauthorized: boolean
    }
  }
}

const dbUser = process.env.DB_USER ?? ''
const dbPassword = process.env.DB_PASSWORD ?? ''
const dbHost = process.env.DB_HOST ?? ''
const dbName = process.env.DB_NAME ?? ''
const databaseUrl = process.env.DATABASE_URL ?? ''

if (!dbUser || !dbPassword || !dbHost || !dbName) {
  throw new Error('Missing required database environment variables')
}

const url: string =
  databaseUrl || `postgres://${dbUser}:${dbPassword}@${dbHost}/${dbName}`

let config: Config = {
  logging: false,
  native: false
}

if (databaseUrl) {
  config = {
    ...config,
    dialect: 'postgres',
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false
      }
    }
  }
}

const sequelize = new Sequelize(url, config as any)

sequelize
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.')
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err)
  })

const models = [initCountry, initActivity]
models.forEach(initModel => initModel(sequelize))

// Capitalize the model names
const entries = Object.entries(sequelize.models)
const capsEntries = entries.map(([name, model]) => [
  name[0].toUpperCase() + name.slice(1),
  model
])
export const capitalizedModels = Object.fromEntries(capsEntries)

// Define the types of the models
interface CapitalizedModels {
  Country: typeof sequelize.models.Country
  Activity: typeof sequelize.models.Activity
}

export const { Country, Activity } = capitalizedModels as CapitalizedModels

// Define associations after defining the models
Country.belongsToMany(Activity, { through: 'country_activity' })
Activity.belongsToMany(Country, { through: 'country_activity' })

export default {
  conn: sequelize,
  authenticate: () => sequelize.authenticate()
}

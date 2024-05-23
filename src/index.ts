import cors from 'cors'
const { app } = require('./app')
const { Country } = require('./db')
import db from './db'
const dotenv = require('dotenv')

// Importar el archivo JSON de la API
const map = require('./api_restcountries.json')

dotenv.config()
app.use(cors())

/** LLAMAMOS A LA API */
const getAll = async () => {
  try {
    const data = map.map((res: any) => {
      return {
        id: res.cca3,
        name: res.name.common || 'no data', // Use || for default value
        img: res.flags && res.flags.png,
        continent: res.continents && res.continents.map((el: string) => el),
        capital: res.capital
          ? res.capital.map((el: string) => el)
          : ['no data'],
        subregion: res.subregion,
        area: res.area,
        population: res.population
      }
    })
    return data
  } catch (err) {
    console.log(err)
    throw new Error('Error fetching data from API')
  }
}

const countriesTableLoad = async () => {
  try {
    const countries = await getAll()
    countries.forEach(
      async (el: {
        name: string
        id: any
        img: any
        continent: string
        capital: string
        subregion: string
        area: string
        population: string
      }) => {
        // Changed map to forEach
        await Country.findOrCreate({
          where: { name: el.name },
          defaults: {
            id: el.id,
            name: el.name,
            image: el.img,
            continent: el.continent,
            capital: el.capital,
            subregion: el.subregion,
            area: el.area,
            population: el.population
          }
        })
      }
    )
  } catch (err) {
    console.error('Error loading countries into database:', err)
  }
}

db.conn.sync({ alter: true }).then(() => {
  countriesTableLoad()

  const port = process.env.PORT || 3001
  app.listen(port, () => {
    console.log(`Server listening at port ${port}`)
  })
})

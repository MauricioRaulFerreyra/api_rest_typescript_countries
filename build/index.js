"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cors_1 = __importDefault(require("cors"));
const { app } = require('./app');
const { Country } = require('./db');
const db_1 = __importDefault(require("./db"));
const dotenv = require('dotenv');
// Importar el archivo JSON de la API
const map = require('./api_restcountries.json');
dotenv.config();
app.use((0, cors_1.default)());
/** LLAMAMOS A LA API */
const getAll = async () => {
    try {
        const data = map.map((res) => {
            return {
                id: res.cca3,
                name: res.name.common || 'no data', // Use || for default value
                img: res.flags && res.flags.png,
                continent: res.continents && res.continents.map((el) => el),
                capital: res.capital
                    ? res.capital.map((el) => el)
                    : ['no data'],
                subregion: res.subregion,
                area: res.area,
                population: res.population
            };
        });
        return data;
    }
    catch (err) {
        console.log(err);
        throw new Error('Error fetching data from API');
    }
};
const countriesTableLoad = async () => {
    try {
        const countries = await getAll();
        countries.forEach(async (el) => {
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
            });
        });
    }
    catch (err) {
        console.error('Error loading countries into database:', err);
    }
};
db_1.default.conn.sync({ alter: true }).then(() => {
    countriesTableLoad();
    const port = process.env.PORT || 3001;
    app.listen(port, () => {
        console.log(`Server listening at port ${port}`);
    });
});

"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a;
var _b, _c, _d, _e, _f;
Object.defineProperty(exports, "__esModule", { value: true });
exports.Activity = exports.Country = exports.capitalizedModels = void 0;
const sequelize_1 = require("sequelize");
const dotenv_1 = __importDefault(require("dotenv"));
const Countries_1 = require("./models/Countries");
const Activities_1 = require("./models/Activities");
dotenv_1.default.config();
const dbUser = (_b = process.env.DB_USER) !== null && _b !== void 0 ? _b : '';
const dbPassword = (_c = process.env.DB_PASSWORD) !== null && _c !== void 0 ? _c : '';
const dbHost = (_d = process.env.DB_HOST) !== null && _d !== void 0 ? _d : '';
const dbName = (_e = process.env.DB_NAME) !== null && _e !== void 0 ? _e : '';
const databaseUrl = (_f = process.env.DATABASE_URL) !== null && _f !== void 0 ? _f : '';
if (!dbUser || !dbPassword || !dbHost || !dbName) {
    throw new Error('Missing required database environment variables');
}
const url = databaseUrl || `postgres://${dbUser}:${dbPassword}@${dbHost}/${dbName}`;
let config = {
    logging: false,
    native: false
};
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
    };
}
const sequelize = new sequelize_1.Sequelize(url, config);
sequelize
    .authenticate()
    .then(() => {
    console.log('Connection has been established successfully.');
})
    .catch(err => {
    console.error('Unable to connect to the database:', err);
});
const models = [Countries_1.initCountry, Activities_1.initActivity];
models.forEach(initModel => initModel(sequelize));
// Capitalize the model names
const entries = Object.entries(sequelize.models);
const capsEntries = entries.map(([name, model]) => [
    name[0].toUpperCase() + name.slice(1),
    model
]);
exports.capitalizedModels = Object.fromEntries(capsEntries);
_a = exports.capitalizedModels, exports.Country = _a.Country, exports.Activity = _a.Activity;
// Define associations after defining the models
exports.Country.belongsToMany(exports.Activity, { through: 'country_activity' });
exports.Activity.belongsToMany(exports.Country, { through: 'country_activity' });
exports.default = {
    conn: sequelize,
    authenticate: () => sequelize.authenticate()
};

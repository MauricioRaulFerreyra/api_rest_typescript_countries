"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.initCountry = void 0;
// src/models/Country.ts
const sequelize_1 = require("sequelize");
class Country extends sequelize_1.Model {
}
function initCountry(sequelize) {
    Country.init({
        id: {
            type: sequelize_1.DataTypes.STRING(3),
            allowNull: false,
            primaryKey: true
        },
        name: {
            type: sequelize_1.DataTypes.STRING,
            allowNull: false
        },
        image: {
            type: sequelize_1.DataTypes.JSON,
            allowNull: false
        },
        continent: {
            type: sequelize_1.DataTypes.ARRAY(sequelize_1.DataTypes.STRING),
            allowNull: false
        },
        capital: {
            type: sequelize_1.DataTypes.ARRAY(sequelize_1.DataTypes.STRING),
            allowNull: false
        },
        subregion: {
            type: sequelize_1.DataTypes.STRING
        },
        area: {
            type: sequelize_1.DataTypes.FLOAT
        },
        population: {
            type: sequelize_1.DataTypes.INTEGER
        }
    }, {
        sequelize,
        timestamps: false,
        modelName: 'Country'
    });
    return Country;
}
exports.initCountry = initCountry;
exports.default = Country;

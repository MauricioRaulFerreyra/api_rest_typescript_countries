"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.initActivity = void 0;
// src/models/Activity.ts
const sequelize_1 = require("sequelize");
class Activity extends sequelize_1.Model {
}
function initActivity(sequelize) {
    Activity.init({
        id: {
            type: sequelize_1.DataTypes.UUID,
            defaultValue: sequelize_1.DataTypes.UUIDV4,
            allowNull: false,
            primaryKey: true
        },
        name: {
            type: sequelize_1.DataTypes.STRING,
            allowNull: false
        },
        difficulty: {
            type: sequelize_1.DataTypes.ENUM('1', '2', '3', '4', '5')
        },
        duration: {
            type: sequelize_1.DataTypes.STRING
        },
        season: {
            type: sequelize_1.DataTypes.ENUM('Verano', 'Otoño', 'Invierno', 'Primavera')
        }
    }, {
        sequelize,
        timestamps: false,
        modelName: 'Activity'
    });
    return Activity;
}
exports.initActivity = initActivity;
exports.default = Activity;

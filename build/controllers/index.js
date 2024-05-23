"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.controllers = void 0;
const db_1 = require("../db");
const sequelize_1 = require("sequelize");
exports.controllers = {
    getAll: async function (req, res, _next) {
        try {
            let name = req.query.name;
            if (name) {
                const countries = await db_1.Country.findAll({
                    include: {
                        model: db_1.Activity,
                        attributes: ['name', 'difficulty', 'duration', 'season'],
                        through: {
                            attributes: []
                        },
                        where: {
                            name: { [sequelize_1.Op.iLike]: `%${name}%` }
                        }
                    }
                });
                res.status(200).json(countries);
            }
            else {
                const countries = await db_1.Country.findAll({
                    include: {
                        model: db_1.Activity,
                        attributes: ['name', 'difficulty', 'duration', 'season'],
                        through: {
                            attributes: []
                        }
                    }
                });
                res.status(200).json(countries);
            }
        }
        catch (err) {
            console.error(err);
            res.status(500).json({
                error: 'An error occurred while fetching countries'
            });
        }
    },
    getById: async function (req, res, _next) {
        try {
            let newId = req.params.id;
            const country = await db_1.Country.findOne({
                include: {
                    model: db_1.Activity,
                    attributes: ['name', 'difficulty', 'duration', 'season'],
                    through: {
                        attributes: []
                    }
                },
                where: {
                    id: { [sequelize_1.Op.eq]: newId }
                }
            });
            if (country) {
                res.status(200).json(country);
            }
            else {
                res.status(404).json({ error: 'Country not found' });
            }
        }
        catch (err) {
            console.error(err);
            res.status(500).json({
                error: 'An error occurred while fetching country'
            });
        }
    },
    postActivity: async function (req, res, _next) {
        try {
            const { name, difficulty, duration, season, idCountry } = req.body;
            const activity = (await db_1.Activity.create({
                name,
                difficulty,
                duration,
                season
            })); // Añade esto para resolver el error
            const country = await db_1.Country.findByPk(idCountry);
            if (country) {
                await activity.addCountry(country);
                res.status(200).json(activity);
            }
            else {
                res.status(404).json({ error: 'Country not found' });
            }
        }
        catch (err) {
            console.error(err);
            res.status(500).json({
                error: 'An error occurred while creating activity'
            });
        }
    },
    getActivity: async function (_req, res, _next) {
        try {
            const allActivities = await db_1.Activity.findAll({
                attributes: ['name', 'difficulty', 'duration', 'season']
            });
            res.status(200).json(allActivities);
        }
        catch (err) {
            console.error(err);
            res.status(500).json({
                error: 'An error occurred while fetching activities'
            });
        }
    }
};

import { Request, Response, NextFunction } from 'express'
import { Country, Activity } from '../db'
import { Op } from 'sequelize'

interface ErrorResponse {
  error: string
}

export const controllers = {
  getAll: async function (
    req: Request,
    res: Response<any>,
    _next: NextFunction
  ): Promise<void> {
    try {
      let name = req.query.name as string | undefined
      if (name) {
        const countries = await Country.findAll({
          include: {
            model: Activity,
            attributes: ['name', 'difficulty', 'duration', 'season'],
            through: {
              attributes: []
            },
            where: {
              name: { [Op.iLike]: `%${name}%` }
            }
          }
        })
        res.status(200).json(countries)
      } else {
        const countries = await Country.findAll({
          include: {
            model: Activity,
            attributes: ['name', 'difficulty', 'duration', 'season'],
            through: {
              attributes: []
            }
          }
        })
        res.status(200).json(countries)
      }
    } catch (err) {
      console.error(err)
      res.status(500).json({
        error: 'An error occurred while fetching countries'
      } as ErrorResponse)
    }
  },

  getById: async function (
    req: Request<{ id: string }>,
    res: Response<any>,
    _next: NextFunction
  ): Promise<void> {
    try {
      let newId = req.params.id
      const country = await Country.findOne({
        include: {
          model: Activity,
          attributes: ['name', 'difficulty', 'duration', 'season'],
          through: {
            attributes: []
          }
        },
        where: {
          id: { [Op.eq]: newId }
        }
      })
      if (country) {
        res.status(200).json(country)
      } else {
        res.status(404).json({ error: 'Country not found' } as ErrorResponse)
      }
    } catch (err) {
      console.error(err)
      res.status(500).json({
        error: 'An error occurred while fetching country'
      } as ErrorResponse)
    }
  },

  postActivity: async function (
    req: Request<
      {},
      {},
      {
        name: string
        difficulty: string
        duration: number
        season: string
        idCountry: string
      }
    >,
    res: Response<any>,
    _next: NextFunction
  ): Promise<void> {
    try {
      const { name, difficulty, duration, season, idCountry } = req.body
      const activity = (await Activity.create({
        name,
        difficulty,
        duration,
        season
      })) as any // Añade esto para resolver el error
      const country = await Country.findByPk(idCountry)
      if (country) {
        await activity.addCountry(country)
        res.status(200).json(activity)
      } else {
        res.status(404).json({ error: 'Country not found' } as ErrorResponse)
      }
    } catch (err) {
      console.error(err)
      res.status(500).json({
        error: 'An error occurred while creating activity'
      } as ErrorResponse)
    }
  },

  getActivity: async function (
    _req: Request,
    res: Response<any>,
    _next: NextFunction
  ): Promise<void> {
    try {
      const allActivities = await Activity.findAll({
        attributes: ['name', 'difficulty', 'duration', 'season']
      })
      res.status(200).json(allActivities)
    } catch (err) {
      console.error(err)
      res.status(500).json({
        error: 'An error occurred while fetching activities'
      } as ErrorResponse)
    }
  }
}

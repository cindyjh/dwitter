import { validationResult } from 'express-validator'

export const validate = (req, res, next) => {
    const error = validationResult(req)
    if (error.isEmpty()) return next()

    console.error(error)
    res.status(400).json(error.array())
}

import rateLimit from 'express-rate-limit'
import { config } from '../config.js'


export default rateLimit({
    windowMs: config.rateLimit.windowMs,
    max: config.rateLimit.maxRequest, // limit each IP to XX requests per windowMs
})


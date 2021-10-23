import rateLimit from 'express-rate-limit'
import { config } from '../config.js'


export default rateLimit({
    windowMs: config.rateLimit.windowMs,
    max: config.rateLimit.maxRequest, // limit each key to XX requests per windowMs
    keyGenerator: (req, res) => 'dwitter', // 기본값은 IP
})


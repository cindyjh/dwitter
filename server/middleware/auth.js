import jwt from 'jsonwebtoken'
import { config } from '../config.js'
import * as userRepository from '../data/user.js'

const AUTH_ERROR = { message: 'Autentication Error' }

export const isAuth = async (req, res, next) => {
    // token이 어디를 통해 오는지 확인
    // 1. Cookie (for Browser)
    // 2. Header (for Non-Browser)

    let token
    // check header first.
    const authHeader = req.get('Authorization')
    if (authHeader && authHeader.startsWith('Bearer ')) {
        token = authHeader.split(' ')[1]
    }
    // if no token in the header, check the cookie
    if (!token) {
        token = req.cookies['dwitter token']
    }

    if (!token) {
        return res.status(401).json(AUTH_ERROR)
    }

    jwt.verify(
        token,
        config.jwt.secretKey,
        async (error, decoded) => {
            if (error) {
                return res.status(401).json(AUTH_ERROR)
            }

            const user = await userRepository.findById(decoded.id)
            if (!user) {
                return res.status(401).json(AUTH_ERROR)
            }

            req.user_id = user.id // request에 customData로 user id를 넣어준다.!
            req.token = token
            next()
        }
    )
}

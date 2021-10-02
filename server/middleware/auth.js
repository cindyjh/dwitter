import jwt from 'jsonwebtoken'
import * as userRepository from '../data/user.js'

const AUTH_ERROR = { message: 'Autentication Error'}

export const isAuth = async (req, res, next) => {
    const authHeader = req.get('Authorization')
    if (!(authHeader && authHeader.startsWith('Bearer '))) {
        return res.status(401).json(AUTH_ERROR)
    }

    const token = authHeader.split(' ')[1]
    jwt.verify(token,
        'Pa$SQo6ycQ0PH7Taswvd$g*TcRNQ0lCN',
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

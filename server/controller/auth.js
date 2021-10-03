import * as userRepository from '../data/user.js'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import { config } from '../config.js'

const jwtSecretKey = process.env.JWT_SECRET

export async function signup(req, res) {
    const { 
        username,
        password,
        name,
        email,
        url
    } = req.body
    // 아이디 중복 체크
    const found = await userRepository.findByUsername(username)
    if (found) {
        return res.status(409).json({
            message: `${username} already exist.`
        })
    }
    const hashed = bcryptPassword(password)
    const user = await userRepository.create({
        username,
        password: hashed,
        name,
        email,
        url
    })

    const token = createJwtToken(createUserJwtPayload(user.id))
    res.status(201).json({ token, username })
}

export async function login(req, res) {
    const { username, password } = req.body

    const user = await userRepository.findByUsername(username)
    if (!user) {
        // user or password로 하는 이유는 보안을 위해서이다.
        return res.status(401).json({ message: 'Invalid user or password'})
    }
    const isValidPassword = await bcrypt.compare(password, user.password)
    if (!isValidPassword) {
        return res.status(401).json({ message: 'Invalid user or password'})
    }

    const token = createJwtToken(createUserJwtPayload(user.id))

    res.status(200).json({ username, token })
}

/**
 * application이 실행이 될 때 기존에 가지고 있는 token이 있다면 이 token이 유효한지 검증해주는 용도의 API
 * @param {*} req 
 * @param {*} res 
 * @returns 
 */
export async function me(req, res) {
    const userId = req.user_id
    const user = await userRepository.findById(userId)
    if (!user) {
        return res.status(404).json({ message: 'User not found' })
    }

    res.status(200).json({ token: req.token, username: user.username })
}

function createUserJwtPayload(userId) {
    return {
        id: userId
    }
}

function createJwtToken(payload, options) {
    return jwt.sign(
        payload,
        config.jwt.secretKey,
        {
            ...options,
            expiresIn: config.jwt.expiresInSec
        }
    )
}

function bcryptPassword(password) {
    return bcrypt.hashSync(password, config.bcrypt.saltRounds)
}

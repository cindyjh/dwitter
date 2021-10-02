import * as userRepository from '../data/user.js'
import jwt from 'jsonwebtoken'

export async function signup(req, res) {
    const { 
        username,
        password,
        name,
        email,
        url
    } = req.body
    // 아이디 중복 체크
    const validUsername = await userRepository.validateUsername(username)
    if (!validUsername) {
        return res.status(409).json({
            message: 'User already exist.'
        })
    }

    const user = await userRepository.create(
        username,
        password,
        name,
        email,
        url
    )
    res.status(201).json(user)
}

export async function login(req, res) {
    const { username, password } = req.body
    
    const user = await userRepository.get(
        username,
        password
    )

    if (!user) {
        return res.sendStatus(401)
    }

    const token = createJwtToken({
        'username': username
    })

    res.status(200).json({
        'username': username,
        'token': token
    })
}

export async function me(req, res) {
    const { username, password } = req.body
    
    const bcryptedPassword = bcryptPassword(password)

    const user = await userRepository.get(
        username,
        bcryptedPassword
    )

    if (!user) {
        res.sendStatus(401)
    }

    const token = createJwtToken({
        'username': username
    })

    res.status(200).json({
        'username': username,
        'token': token
    })
}

function createJwtToken(payload, options) {
    const secret = 'Pa$SQo6ycQ0PH7Taswvd$g*TcRNQ0lCN' // 권장되는 길이는 32byte
    return jwt.sign(payload, secret,
        {
            ...options,
            expiresIn: 2 // seconds
        }
    )
}
import * as userRepository from '../data/user.js'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'

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

    const token = createJwtToken(createUserJwtPayload(user.id))

    res.status(200).json({
        'username': username,
        'token': token
    })
}

function createUserJwtPayload(userId) {
    return {
        id: userId
    }
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

function bcryptPassword(password) {
    return bcrypt.hashSync(password, 10)
}

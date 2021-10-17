import * as userRepository from '../data/user.js'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import { config } from '../config.js'

const AUTH_TOKEN_NAME = 'dwitter token'

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
    const userId = await userRepository.create({
        username,
        password: hashed,
        name,
        email,
        url
    })

    const token = createJwtToken(createUserJwtPayload(userId))
    setToken(res, token)
    // body에 token 을 주지 않고 cookie header에만 주면 REST API를 이용하는 브라우저 외의 다른 클라이언트(모바일)는 사용 할 수 없다. 그래서 body에 token을 그대로 둘 것이다.
    res.status(201).json({ token, username })
}

export async function login(req, res) {
    const { username, password } = req.body

    const user = await userRepository.findByUsername(username)
    if (!user) {
        // user or password로 하는 이유는 보안을 위해서이다.
        return res.status(401).json({ message: 'Invalid user or password' })
    }
    const isValidPassword = await bcrypt.compare(password, user.password)
    if (!isValidPassword) {
        return res.status(401).json({ message: 'Invalid user or password' })
    }

    const token = createJwtToken(createUserJwtPayload(user.id))
    setToken(res, token)
    res.status(200).json({ username, token })
}

export async function logout(req, res, next) {
    res.cookie(AUTH_TOKEN_NAME, '')
    res.status(200).json({ message: 'User has been logged out.' })
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

export async function csrfToken(req, res, next) {
    const csrfToken = await generateCSRFToken()
    res.status(200).json({ csrfToken })
}

async function generateCSRFToken() {
    // salt round를 줘서 랜덤한 해시코드를 주도록 한다.
    return bcrypt.hash(config.csrf.plainToken, 1)
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

function setToken(res, token) {
    const options = { // HTTP-Only 로 설정하자.
        maxAge: config.jwt.expiresInSec * 1000, // 해당 시간이 지나면 쿠키를 파기
        httpOnly: true,
        sameSite: 'none', //server와 client가 동일한 도메인이 아니더라도  http only가 동작 할 수 있도록 한다.
        secure: true,
    }
    res.cookie(AUTH_TOKEN_NAME, token, options)
}

function bcryptPassword(password) {
    return bcrypt.hashSync(password, config.bcrypt.saltRounds)
}

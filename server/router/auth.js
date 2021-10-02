import express from 'express'
import 'express-async-error'
import { body } from 'express-validator'

import * as authController from '../controller/auth.js'
import { validate } from '../middleware/validator.js'

const router = express.Router()

const validateCredential = [
    // 5~20자의 영문 소문자, 숫자와 특수기호(_),(-)만 사용 가능합니다.
    body('username').trim().isLength({min: 5, max: 20}).matches(/^[a-z0-9_-]+$/).withMessage('5~20자의 영문 소문자, 숫자와 특수기호(_),(-)만 사용 가능합니다.'),
    // 8~16자 영문 대 소문자, 숫자, 특수문자를 사용하세요.
    body('password').trim().isLength({min: 8, max: 16}).withMessage('8~16자 영문 대 소문자, 숫자, 특수문자를 사용하세요.'),
    validate,
]

const validateSignup = [
    ...validateCredential,
    body('name').trim().notEmpty().withMessage('이름이 필요합니다.'),
    body('email').trim().isEmail().normalizeEmail().withMessage('이메일 형식에 맞지 않습니다.'),
    body('url').trim().isURL().withMessage('url 형식이 아닙니다.').optional({nullable: true, checkFalsy: true}),
    validate,
]

// POST /auth/signup
router.post('/signup', validateSignup, authController.signup)

// POST /auth/login
router.post('/login', validateCredential, authController.login)

// GET /auth/me
router.get('/me', validate, authController.me)

export default router
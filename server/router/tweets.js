import express from 'express'
import 'express-async-error'
import { param, body } from 'express-validator'

import * as tweetController from '../controller/tweet.js'
import { isAuth } from '../middleware/auth.js'
import { validate } from '../middleware/validator.js'

const router = express.Router()

const validateTweet = [
    body('text').trim().isLength({min: 3}).withMessage('text should be at least 3 characters.'),
]

// GET /tweets
// GET /tweets?username=:username
router.get('/', isAuth, validate, tweetController.getTweets)
// GET /tweets/:id
router.get('/:id', isAuth, validate, tweetController.getTweet)
// POST /tweets
router.post('/', isAuth, validateTweet, validate, tweetController.createTweet)
// PUT /tweets/:id
router.put('/:id', isAuth, validateTweet, validate, tweetController.updateTweet)
// DELETE /tweets/:id
router.delete('/:id', isAuth, validate, tweetController.deleteTweet)

export default router
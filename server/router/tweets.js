import express from 'express'
import 'express-async-error'
import { body } from 'express-validator'

import * as tweetController from '../controller/tweet.js'
import { validate } from '../middleware/validator.js'

const router = express.Router()

const validateTweet = [
    body('text').trim().isLength({min: 3}).withMessage('text should be at least 3 characters.'),
]

// GET /tweets
// GET /tweets?username=:username
router.get('/', 
    
validate
    , tweetController.getTweets)
// GET /tweets/:id
router.get('/:id', validate
    , tweetController.getTweet)
// POST /tweets
router.post('/', validateTweet, validate, tweetController.createTweet)
// PUT /tweets/:id
router.put('/:id', validateTweet, validate, tweetController.updateTweet)
// DELETE /tweets/:id
router.delete('/:id', validate
    , tweetController.deleteTweet)

export default router
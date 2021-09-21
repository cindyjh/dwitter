import express, { Router } from 'express'
import 'express-async-error'

const router = express.Router()

let tweets = [
    {
        id: '1',
        text: '첫 번째 트윗 입니다!',
        createdAt: Date.now().toString(),
        name: 'Bob',
        username: 'bob',
        url: 'https://image.shutterstock.com/image-photo/people-joined-hands-team-600w-754453969.jpg'
    },
    {
        id: 1,
        text: '두번째 트윗 입니다!',
        createdAt: Date.now().toString(),
        name: 'Cindy',
        username: 'cindy'
    },
]

// GET /tweets
// GET /tweets?username=:username
// GET /tweets/:id
// POST /tweets
// PUT /tweets/:id
// DELETE /tweets/:id
router.get('/', (req, res, next) => {
    const username = req.query.username
    const data = username
    ? tweets.filter(tweet => tweet.username === username)
    : tweets
    res.status(200).send(data)
})

router.get('/:id', (req, res, next) => {
    const id = req.params.id
    const tweet = tweets.find(tweet => tweet.id === id)
    if (tweet) {
        res.status(200).send(tweet)
    } else {
        res.status(404).json({message: `Tweet id(${id}) not found`})
    }
    
})

router.post('/', (req, res, next) => {
    const {text, name, username} = req.body
    const tweet = {
        id: Date.now().toString(),
        text,
        createdAt: new Date(),
        name,
        username
    }
    tweets = [tweet, ...tweets] // tweets 앞에 추가를 해준다.
    res.status(201).json(tweet)
})

router.put('/:id', (req, res, next) => {
    const id = req.params.id
    const { text } = req.body
    const tweet = tweets.find(tweet => tweet.id === id)
    if (tweet) {
        tweet.text = text
        res.status(200).json(tweet)
    } else {
        res.status(404).json({message: `Tweet id(${id}) not found`})
    }
})

router.delete('/:id', (req, res, next) => {
    const id = req.params.id
    tweets = tweets.filter(tweet => tweet.id !== id)
    res.sendStatus(204)
})

export default router
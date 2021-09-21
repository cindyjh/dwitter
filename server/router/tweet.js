import express, { Router } from 'express'
const tweetRouter = express.Router()

tweetRouter.get('/', (req, res, next) => {
    res.status(200).send('GET tweets')
})

tweetRouter.post('/', (req, res, next) => {
    res.status(201).send('POST tweets')
})

tweetRouter.put('/:id', (req, res, next) => {
    res.status(200).send('PUT tweets')
})

tweetRouter.delete('/:id', (req, res, next) => {
    res.status(204).send('DELETE tweets')
})

export default tweetRouter
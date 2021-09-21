import express, { Router } from 'express'
import 'express-async-error'

const router = express.Router()

router.get('/', (req, res, next) => {
    res.status(200).send('GET tweets')
})

router.post('/', (req, res, next) => {
    res.status(201).send('POST tweets')
})

router.put('/:id', (req, res, next) => {
    res.status(200).send('PUT tweets')
})

router.delete('/:id', (req, res, next) => {
    res.status(204).send('DELETE tweets')
})

export default router
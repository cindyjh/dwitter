import * as tweetRepository from '../data/tweet.js'
import { getSocketIO } from '../connection/socket.js'

export async function getTweets(req, res) {
    const username = req.query.username
    const tweets = await(username
        ? tweetRepository.getAllByUsername(username)
        : tweetRepository.getAll())

    res.status(200).send(tweets)
}

export async function getTweet(req, res, next) {
    const id = parseInt(req.params.id)
    const tweet = await tweetRepository.getById(id)
    if (tweet) {
        res.status(200).send(tweet)
    } else {
        res.status(404).json({message: `Tweet id(${id}) not found`})
    }
}

export async function createTweet(req, res, next) {
    const { text } = req.body
    const userId = req.user_id
    const tweet = await tweetRepository.create(userId, text)
    res.status(201).json(tweet)
    // 소켓에게 tweets 카테고리에 새로만들어진 tweet을 Boradcast 해준다.
    getSocketIO().emit('tweets', tweet)
}

export async function updateTweet(req, res, next) {
    const id = parseInt(req.params.id)
    const { text } = req.body
    const userId = req.user_id
    const tweet = await tweetRepository.getById(id)
    // 없는 트윗을 업데이트 할 수 없다
    if (!tweet) {
        return res.status(404).json({message: `Tweet id(${id}) not found`})
    }
    // 본인이 만든 tweet만 업데이트 가능 해야 한다.
    if (tweet.userId !== userId) {
        return res.sendStatus(403)
    }

    const updatedTweet = await tweetRepository.update(id, text)
    res.status(200).json(updatedTweet)
}

export async function deleteTweet(req, res, next) {
    // TODO: data를 완전히 지우는게 아니라 deleted_at을 넣어서 soft delete를 해주면 더 좋겠다.
    const id = parseInt(req.params.id)
    const userId = req.user_id

    const tweet = await tweetRepository.getById(id)
    // 없는 트윗을 삭제 할 수 없다
    if (!tweet) {
        return res.status(404).json({message: `Tweet id(${id}) not found`})
    }
    // 본인이 만든 tweet만 샥제 가능 해야 한다.
    if (tweet.userId !== userId) {
        return res.sendStatus(403)
    }

    await tweetRepository.removes(id)
    res.sendStatus(204)
}
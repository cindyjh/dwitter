import * as tweetRepository from '../data/tweet.js'

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
}

export async function updateTweet(req, res, next) {
    // TODO: 본인이 만든 tweet만 업데이트 가능해야겠지.
    const id = parseInt(req.params.id)
    const { text } = req.body
    
    const tweet = await tweetRepository.update(id, text)
    if (tweet) {
        res.status(200).json(tweet)
    } else {
        res.status(404).json({message: `Tweet id(${id}) not found`})
    }
}

export async function deleteTweet(req, res, next) {
    // TODO: 관리자이거나 본인이 만든 tweet만 업데이트 가능해야겠지.
    // TODO: data를 완전히 지우는게 아니라 deleted_at을 넣어서 soft delete를 해주면 더 좋겠다.
    const id = parseInt(req.params.id)
    await tweetRepository.removes(id)
    res.sendStatus(204)
}
import * as userRepository from './user.js'
import MongoDB from 'mongodb'
import { getTweets } from '../database/database.js'

const ObjectId = MongoDB.ObjectId

export async function getAll() {
    return getTweets()
        .find()
        .sort({createdAt: -1})
        .toArray()
        .then(mapTweets)
}

export async function getAllByUsername(username) {
    return getTweets()
        .find({ username })
        .sort({createdAt: -1})
        .toArray()
        .then(mapTweets)
}

export async function getById(id) {
    return getTweets()
        .findOne({ _id: new ObjectId(id) })
        .then(mapOptionalTweet)
}

export async function create(userId, text) {
    const { username, name, url } = await userRepository.findById(userId)
    const tweet = {
        text,
        userId,
        username,
        name,
        url,
        createdAt: new Date().toString(),
    }

    return getTweets()
        .insertOne(tweet)
        .then((data) => mapOptionalTweet({ ...tweet, _id: data.insertedId }))
}

export async function update(id, text) {
    const filter = { _id: new ObjectId(id) }
    const updateDoc = { $set: { text } }
    const options = { returnDocument: 'after' }
    return getTweets()
        .findOneAndUpdate(filter, updateDoc, options)
        .then(result => result.value)
        .then(mapOptionalTweet)
}

export async function removes(id) {
    return getTweets()
        .deleteOne({ _id: new ObjectId(id) })
}

function mapTweets(tweets) {
    return tweets.map(mapOptionalTweet)
}

function mapOptionalTweet(tweet) {
    return tweet ? { ...tweet, id: tweet._id.toString() } : tweet
}
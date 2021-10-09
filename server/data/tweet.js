import * as userRepository from './user.js'
import { useVirtualId } from "../database/database.js"
import Mongoose from 'mongoose'

const tweetSchema = new Mongoose.Schema(
    {
        text: { type: String, required: true },
        userId: { type: String, required: true},
        username: { type: String, required: true, trim: true },
        name: { type: String, required: true, trim: true },
        url: { type: String, trim: true },
    },
    { timestamps: true }
)

useVirtualId(tweetSchema)
const Tweet = Mongoose.model('Tweet', tweetSchema)

export async function getAll() {
    return Tweet.find().sort({ createdAt: -1 })
}

export async function getAllByUsername(username) {
    return Tweet.find({ username }).sort({ createdAt: -1})
}

export async function getById(id) {
    return Tweet.findById(id)
}

export async function create(userId, text) {
    return userRepository.findById(userId)
        .then(user => {
            const { username, name, url } = user
            return new Tweet({ text, userId, username, name, url}).save()
        })
}

export async function update(id, text) {
    return Tweet.findByIdAndUpdate(id, { text }, { returnOriginal: false })
}

export async function removes(id) {
    return Tweet.findByIdAndDelete(id)
}

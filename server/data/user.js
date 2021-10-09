import { useVirtualId } from "../database/database.js"
import Mongoose from 'mongoose'

const userSchema = new Mongoose.Schema(
    {
        username: { type: String, required: true, index: true, unique: true, trim: true },
        name: { type: String, required: true, trim: true },
        email: { type: String, required: true, trim: true },
        password: { type: String, required: true, trim: true },
        url: { type: String, trim: true },
    }, { timestamps: true }
)

useVirtualId(userSchema)
const User = Mongoose.model('User', userSchema)


export async function findByUsername(username) {
    return User.findOne({ username })
}

export async function findById(id) {
    return User.findById(id)
}

export async function create(userInfo) {
    return new User(userInfo)
        .save()
        .then(data => data.id)
}

import { getUsers } from "../database/database.js"
import MongoDB from 'mongodb'

const ObjectId = MongoDB.ObjectId

export async function findByUsername(username) {
    return getUsers()
        .findOne({ username })
        .then(mapOptionalUser)
}

export async function findById(id) {
    return getUsers()
        .findOne({ _id: new ObjectId(id) })
        .then(mapOptionalUser)
}

export async function create(userInfo) {
    return getUsers().insertOne(userInfo)
        .then((data) => data.insertedId.toString())
}

function mapOptionalUser(user) { // user는 null일 수도 있으므로 Optional 이라는 키워드를 붙여주었다.
    return user ? { ...user, id: user._id } : user
}
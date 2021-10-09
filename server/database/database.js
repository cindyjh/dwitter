
import MongoDB from 'mongodb'
import { config } from "../config.js"


const { host, database } = config.db

let db
export async function connectDB() {
    return MongoDB.MongoClient.connect(host)
        .then(client => {
            db = client.db(database)
        })
}

export function getUsers() {
    return db.collection('users')
}

export function getTweets() {
    return db.collection('tweets')
}
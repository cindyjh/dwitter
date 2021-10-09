
import MongoDB from 'mongodb'
import { config } from "../config.js"


const { host, database } = config.db

export async function connectDB() {
    return MongoDB.MongoClient.connect(host)
        .then(client => client.db())
}
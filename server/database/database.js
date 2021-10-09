import Mongoose from 'mongoose'
import { config } from "../config.js"

// NoSQL 은 관계를 가지는 것 보다 정보의 중복을 더 선호한다.
// 중요!!
// '모든 사용자가 트윗을 쿼리하는 횟수' 보다 '사용자가 사용자의 정보를 업데이트 하는 횟수' 가 더 많기 때문에
// 데이터를 일단 중복으로 가지게 하고,
// 사용자의 정보가 업데이트 되는 것을 고려해서 tweets 정보도 업데이트를 해주고자 한다면,
// 업데이트 하는 처리를 서버 사용률이 낮은 때로 스케줄링을 걸어서 해주는 방안을 채택해도 좋다.
// 관계형 조인 쿼리의 성능이 좋지 않다.

const { host, database } = config.db

export async function connectDB() {
    return Mongoose.connect(host, {
        useNewUrlParser: true,
    })
}

export function useVirtualId(schema) {
    // _id 를 id로 읽자
    // https://mongoosejs.com/docs/guide.html#virtuals
    // this키워드를 써야 하기 때문에 arrow function을 사용 할 수 없다!!!!
    // https://medium.com/@lucasdavidferrero/dont-use-arrow-functions-when-you-use-mongoose-schema-method-190b79f1640c
    schema.virtual('id').get(function() { 
        return this._id.toString()
    })
    // https://mongoosejs.com/docs/guide.html#toJSON
    schema.set('toJson', { virtuals: true }) 
    // https://mongoosejs.com/docs/guide.html#toObject
    schema.set('toObject', { getters: true }) // which converts the mongoose document into a plain JavaScript object
}

// TODO(cindy): delete blow
let db

export function getTweets() {
    return db.collection('tweets')
}
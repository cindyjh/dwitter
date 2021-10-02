import * as userRepository from './user.js'
let tweets = [
    {
        id: '1',
        text: '첫 번째 트윗 입니다!',
        createdAt: new Date().toString(),
        userId: '1',
    },
    {
        id: '2',
        text: '두번째 트윗 입니다!',
        createdAt: new Date().toString(),
        userId: '1',
    },
    {
        id: '3',
        text: '세번째 트윗 입니다!',
        createdAt: new Date().toString(),
        userId: '2',
    },
]

export async function getAll() {
    return Promise.all(
        tweets.map(async (tweet) => {
            return appendUserInfo(tweet)
        })
    )
}

export async function getAllByUsername(username) {
    const user = await userRepository.findByUsername(username)
    const filteredTweets = tweets.filter(tweet => tweet.userId === user.id)
    return Promise.all(
        filteredTweets.map(async (tweet) => {
            return appendUserInfo(tweet)
        })
    )
}

export async function getById(id) {
    const findedTweet = tweets.find(tweet => tweet.id === id)
    return appendUserInfo(findedTweet)
}

export async function create(userId, text) {
    const tweet = {
        id: Math.max(...tweets.map(tweet => tweet.id)) + 1,
        text,
        createdAt: new Date().toString(),
        userId,
    }
    tweets = [tweet, ...tweets] // tweets 앞에 추가를 해준다.
    return tweet
}

export async function update(id, text) {
    const tweet = tweets.find(tweet => tweet.id === id) 
    if (tweet) {
        tweet.text = text
    }
    return tweet
}

export async function removes(id) {
    tweets = tweets.filter(tweet => tweet.id !== id)
}

async function appendUserInfo(tweet) {
    const userId = tweet.userId
    const { username, name, url} = await userRepository.findById(userId)
    return {
        ...tweet, username, name, url
    }
}
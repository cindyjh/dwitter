let tweets = [
    {
        id: '1',
        text: '첫 번째 트윗 입니다!',
        createdAt: Date.now().toString(),
        name: 'Bob',
        username: 'bob',
        url: 'https://image.shutterstock.com/image-photo/people-joined-hands-team-600w-754453969.jpg'
    },
    {
        id: 1,
        text: '두번째 트윗 입니다!',
        createdAt: Date.now().toString(),
        name: 'Cindy',
        username: 'cindy'
    },
]

export function getAll() {
    return tweets
}

export function getAllByUsername(username) {
    return tweets.filter(tweet => tweet.username === username)
}

export function getById(id) {
    return tweets.find(tweet => tweet.id === id)
}

export function create(text, name, username) {
    const tweet = {
        id: Date.now().toString(),
        text,
        createdAt: new Date(),
        name,
        username
    }
    tweets = [tweet, ...tweets] // tweets 앞에 추가를 해준다.
    return tweet
}

export function update(id, text) {
    const tweet = tweets.find(tweet => tweet.id === id) 
    if (tweet) {
        tweet.text = text
    }
    return tweet
}

export function removes(id) {
    tweets = tweets.filter(tweet => tweet.id !== id)
}
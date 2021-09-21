export default class TweetService {
  constructor(baseURL) {
    this.baseURL = baseURL
  }
  async getTweets(username) {
    const query = username ? `?usename=${username}` : ''
    const response = await fetch(`${this.baseURL}/tweets${query}`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json'}
    })
    const data = await response.json()
    if (response.status !== 200) {
      throw new Error(data.message)
    }
    return data
  }

  async postTweet(text) {
    const tweet = {
      name: 'Cindy',
      username: 'cindy',
      text,
    };
    
    const response = await fetch(`${this.baseURL}/tweets`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json'},
      body: JSON.stringify(tweet)
    })
    
    const data = response.json()

    if (response.status != 201) {
      throw new Error(data.message)
    }

    return data;
  }

  async deleteTweet(tweetId) {
    const response = await fetch(`${this.baseURL}/tweets/${tweetId}`, {
      mehotd: "DELETE",
      header: { 'Content-Type': 'application/json' }
    })

    const data = response.json()
    if (response.status !== 204) {
      throw new Error(data.message)
    }
  }

  async updateTweet(tweetId, text) {
    const tweet = {
      text
    }
    const response = fetch(`${this.baseURL}/tweets/${tweetId}`, {
      method: "PUT",
      header: "application/jaon",
      body: JSON.stringify(tweet)
    })
    
    const data = response.json()

    if (response.status !== 200) {
      throw new Error(data.message)
    }

    return data
  }
}

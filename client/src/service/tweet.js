export default class TweetService {
  constructor(http) {
    this.http = http
  }
  async getTweets(username) {
    const query = username ? `?usename=${username}` : ''
    return this.http.fetch(`/tweets${query}`, {
      method: 'GET'
    })
  }

  async postTweet(text) {
    const tweet = {
      name: 'Cindy',
      username: 'cindy',
      text,
    };
    
    return this.http.fetch(`/tweets`, {
      method: 'POST',
      body: JSON.stringify(tweet)
    })
  }

  async deleteTweet(tweetId) {
    return this.http.fetch(`/tweets/${tweetId}`, {
      mehotd: "DELETE"
    })
  }

  async updateTweet(tweetId, text) {
    return this.http.fetch(`/tweets/${tweetId}`, {
      method: "PUT",
      body: JSON.stringify(text)
    })
  }
}

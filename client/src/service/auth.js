export default class AuthService {
  constructor(http, tokenStorage) {
    this.http = http
    this.tokenStorage = tokenStorage
  }

  async signup(username, password, name, email, url) {
    const user = { username, password, name, email, url }
    const data = await this.http.fetch('/auth/signup', {
      method: 'POST',
      body: JSON.stringify(user)
    })

    this.tokenStorage.saveToken(data.token)
    return data
  }

  async login(username, password) {
    const loginInfo = {
      username, password
    }
    const data = await this.http.fetch('/auth/login', {
      method: 'POST',
      body: JSON.stringify(loginInfo)
    })

    this.tokenStorage.saveToken(data.token)
    return data
  }

  async me() {
    const token = this.tokenStorage.getToken()
    const data = await this.http.fetch('/auth/login', {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })

    this.tokenStorage.saveToken(data.token)
    return data
  }

  async logout() {
    this.tokenStorage.clearToken()
  }
}

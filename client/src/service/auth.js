export default class AuthService {
  constructor(http) {
    this.http = http
  }

  async signup(username, password, name, email, url) {
    const user = { username, password, name, email, url }
    return await this.http.fetch('/auth/signup', {
      method: 'POST',
      body: JSON.stringify(user)
    })
  }

  async login(username, password) {
    const loginInfo = {
      username, password
    }
    return await this.http.fetch('/auth/login', {
      method: 'POST',
      body: JSON.stringify(loginInfo)
    })
  }

  async me() {
    return await this.http.fetch('/auth/login', {
      method: 'GET',
    })
  }

  async logout() {
    // TODO
  }
}

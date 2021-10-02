const TOKEN = 'dwitter token'

/**
 * localStorage(브라우저 API)를 이용해서 token을 저장 및 사용 할 수 있는 클래스
 */
export default class TokenStorage {
    saveToken(token) {
        localStorage.setItem(TOKEN, token)
    }

    getToken() {
        return localStorage.getItem(TOKEN)
    }

    clearToken() {
        localStorage.clear(TOKEN)
    }
}
export default class HttpClient {
    constructor(baseURL, authErrorEventBus, getCsrfToken) {
        this.baseURL = baseURL
        this.authErrorEventBus = authErrorEventBus
        this.getCsrfToken = getCsrfToken
    }

    async fetch(url, options) {
        const res = await fetch(`${this.baseURL}${url}`, {
            ...options,
            credentials: 'include', // 자동으로 브라우저가 credential과 관련된 데이터를 추가해서(쿠키에 있는 데이터를 추가해서) 요청을 해준다.
            headers: {
                'Content-Type': 'application/json',
                'dwitter-csrf-token': this.getCsrfToken(),
                ...options.headers
            }
        })

        let data
        try {
            // res에 body가 없는 경우에도 error를 발생시킨다.
            data = await res.json()
        } catch (error) {
            // res에 body가 없는 경우에도 error가 발생한다.
            console.error(error)
        }

        if (res.status > 299 || res.status < 200) {
            const message = data && data.message
                ? data.message
                : 'Something went wrong!'
            const error = new Error(message)
            if (res.status === 401) {
                this.authErrorEventBus.notify(error)
                return
            }
            throw error
        }

        return data
    }
}
export default class HttpClient {
    constructor(baseURL) {
        this.baseURL = baseURL
    }

    async fetch(url, options) {
        const res = await fetch(`${this.baseURL}${url}`, {
            ...options,
            headers: {
                'Content-Type': 'application/json',
                ...options.headers
            }
        })

        let data
        try {
            // res에 body가 없는 경우에도 error를 발생시킨다.
            data = await res.json()
        } catch(error) {
            // res에 body가 없는 경우에도 error가 발생한다.
            console.error(error)
        }

        if (res.status > 299 || res.status < 200) {
            const message = data && data.message 
                ? data.message
                : 'Something went wrong!'
            throw new Error(message)
        }

        return data
    }
}
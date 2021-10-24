import axios from 'axios'
import axiosRetry from 'axios-retry'

const defaultRetryConfig = {
    retries: 3,
    initialDelayMs: 100,
}

export default class HttpClient {
    constructor(baseURL, authErrorEventBus, getCsrfToken, config = defaultRetryConfig) {
        this.baseURL = baseURL
        this.authErrorEventBus = authErrorEventBus
        this.getCsrfToken = getCsrfToken
        this.client = axios.create({
            baseURL,
            headers: { 'Content-Type': 'application/json' },
            withCredentials: true, // 자동으로 브라우저가 credential과 관련된 데이터를 추가해서(쿠키에 있는 데이터를 추가해서) 요청을 해준다.
        })
        axiosRetry(this.client, {
            retries: config.retries,
            retryDelay: (retryCount) => {
                const delay = Math.pow(2, retryCount) * config.initialDelayMs // 100ms, 200ms, 400ms, 800ms ...
                const jitter = delay * 0.1 * Math.random() // 10ms 내외, 20ms 내외, ...
                return delay + jitter
            },
            retryCondition: (err) => // retry를 하는 경우를 정의. Default: 네트워크 에러나 요청 실패일 때에 재시도를 함.
                axiosRetry.isNetworkOrIdempotentRequestError(err)
                || err.response.status === 429,
        })
    }

    async fetch(url, options) {
        const { body, method, headers } = options
        const req = {
            url,
            method,
            headers: {
                ...headers,
                'dwitter-csrf-token': this.getCsrfToken(),
            },
            data: body,
        }

        const res = await this.client(req)
        try {
            return res.data
        } catch (err) { // network 오류가 났거나 status code가 200대가 아니면
            if (err.response) {
                const data = err.response.data
                const message = data && data.message
                    ? data.message
                    : 'Something went wrong!'
                throw new Error(message)
            }
            throw new Error('connection error')
        }
    }
}
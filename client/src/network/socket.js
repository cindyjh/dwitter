
import socket from 'socket.io-client'

export default class Socket {
    constructor(baseURL, getAccessToken) {
        this.io = socket(baseURL, {
            auth: (cb) => cb({ token: getAccessToken() }),
        })

        this.io.on('connect_error', (error) => {
            console.log('socket error', error)
        })

        this.io.on('dwitter', (message) => {
            console.log(message)
        })
    }

    onSync(event, callback) {
        if (!this.io.connected) {
            this.io.connect()
        }

        this.io.on(event, (message) => callback(message))
        // io의 이 event를 끌 수 있는 callback을 전달해서 사용자가 끌 수 있도록 한다.
        return () => this.io.off(event)
    }
}

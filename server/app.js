/* Libaries */
import express from 'express'
import cors from 'cors'
import morgan from 'morgan'
import cookieParser from 'cookie-parser'
import helmet from 'helmet'
import 'express-async-error'
import { Server } from 'socket.io'

/* Router */
import tweetsRouter from './router/tweets.js'
import authRouter from './router/auth.js'
import { config } from './config.js'

const app = express()

/* Middleware */
app.use(cookieParser())
app.use(cors()) // CORS 허용
app.use(helmet()) // 보안에 필요한 헤더들을 추가해준다.
app.use(morgan('combined')) // 사용자에게 요청을 받을 때마다 어떤 요청을 받았는지, 얼마나 걸렸는지에 관한 유용한 정보를 자동으로 로그로 남겨준다.
app.use(express.json()) // REST API Request 를 json 형식 body로 parse
app.use(express.urlencoded( {extended: true })) // HTML Form에서 Submmit을 하게 되면 발생하는 request를 Body 안으로 자동으로 parse 해줌.

/* Routes */
app.use('/auth', authRouter) // auth 라우트 등록
app.use('/tweets', tweetsRouter) // tweets 라우트 등록

/* Handle Error */
// 위에서 아무도 처리하지 않았다면 이걸 타겠지.
app.use((req, res, next) => {
    res.sendStatus(404)
})

// error handling
app.use((error, req, res, next) => {
    console.error(error)
    res.sendSatus(500)
})

const server = app.listen(config.host.port)
const socketIO = new Server(server, {
    cors: {
        origin: '*',
    }
})

socketIO.on('connection', (socket) => {
    console.log('Client here!')
})

setInterval(() => {
    socketIO.emit('dwitter', 'Hello')
}, 1000)

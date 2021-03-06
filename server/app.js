/* Libaries */
import express from 'express'
import cors from 'cors'
import morgan from 'morgan'
import cookieParser from 'cookie-parser'
import helmet from 'helmet'
import 'express-async-error'

/* Router */
import tweetsRouter from './router/tweets.js'
import authRouter from './router/auth.js'
import { config } from './config.js'
import { initSocket } from './connection/socket.js'
import { sequelize } from './db/database.js'
import { csrfCheck } from './middleware/csrf.js'
import rateLimiter from './middleware/rate-limiter.js'

const app = express()

/* Middleware */
const corsOption = {
    origin: config.cors.allowedOrigin,
    optionsSuccessStatus: 200,
    credentials: true, // allow Access-Control-Allow-Credentials.
    // 클라이언트가 credentials 헤더에 데이터를 넣어 보내주면 받아온다.
    // 서버에서 받은 데이터를 javascript에게 보내주기위해 .. ? for using HTTP only
}
app.use(cookieParser())
app.use(cors(corsOption)) // CORS 허용
app.use(helmet()) // 보안에 필요한 헤더들을 추가해준다.
app.use(morgan('combined')) // 사용자에게 요청을 받을 때마다 어떤 요청을 받았는지, 얼마나 걸렸는지에 관한 유용한 정보를 자동으로 로그로 남겨준다.
app.use(express.json()) // REST API Request 를 json 형식 body로 parse
app.use(express.urlencoded({ extended: true })) // HTML Form에서 Submmit을 하게 되면 발생하는 request를 Body 안으로 자동으로 parse 해줌.
app.use(rateLimiter)

/* Routes */
app.use(csrfCheck)
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

sequelize.sync().then(() => {
    console.log(`Server is started... ${new Date()}`)
    const server = app.listen(config.port)
    // 소켓 연결
    initSocket(server)
})

import mysql from 'mysql2'
import { config } from '../config.js'

const pool = mysql.createPool({
    host: config.db.host,
    user: config.db.user,
    database: config.db.database,
    password: config.db.password,
}) // Pool: DB에 접속하고 여러 SQL을 실행할 수 있게 도와주는 Class

export const db = pool.promise()
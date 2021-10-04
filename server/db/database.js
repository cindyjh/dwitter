import SQ from 'sequelize'
import { config } from '../config.js'

const { database, user, password, dialect, host, port } = config.db
export const sequelize = new SQ.Sequelize(database, user, password, {
    host,
    dialect,
    port,
    // logging: (...msg) => console.log(msg), // Displays all log function call parameters
})


import mysql from 'mysql2'

const pool = mysql.createPool({
    host: config.db.host,
    user: config.db.user,
    database: config.db.database,
    password: config.db.password,
}) // Pool: DB에 접속하고 여러 SQL을 실행할 수 있게 도와주는 Class

export const db = pool.promise()

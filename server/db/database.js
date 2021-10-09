import SQ from 'sequelize'
import { config } from '../config.js'

const { database, user, password, dialect, host, port } = config.db
export const sequelize = new SQ.Sequelize(database, user, password, {
    host,
    dialect,
    port,
    // logging: (...msg) => console.log(msg), // Displays all log function call parameters
})
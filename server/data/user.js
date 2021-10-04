import SQ from 'sequelize'
import { db, sequelize } from "../db/database.js"

const DataTypes = SQ.DataTypes
const User = sequelize.define('user', {
    id: {
        type:DataTypes.INTEGER,
        primaryKey: true,
        unique: true,
        autoIncrement: true,
        allowNull: false,
    },
    username: {
        type: DataTypes.STRING(45),
        unique: true,
        allowNull: false,
    },
    password: {
        type: DataTypes.STRING(128),
        allowNull: false,
    },
    name: {
        type: DataTypes.STRING(128),
        allowNull: false,
    },
    email: {
        type: DataTypes.STRING(128),
        allowNull: false,
    },
    url: DataTypes.TEXT,
}, {
    // don't forget to enable timestamps!
    timestamps: true,
})

export async function findByUsername(username) {
    return User.findOne({ where: {
        username
    }})
}

export async function findById(id) {
    return User.findByPk(id)
}

export async function create(user) {
    return User.create(user).then(data => {
        console.log(data)
        return data.dataValues.id
    })
}


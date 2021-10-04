import { db } from "../db/database.js"

export async function findByUsername(username) {
    return db.execute('SELECT * from users WHERE username=?', [ username ])
        .then((result) => {
            return result[0][0]
        })
}

export async function findById(id) {
    return db.execute('SELECT * from users WHERE id=?', [ id ])
        .then((result) => {
            return result[0][0]
        })
}

export async function create(userInfo) {
    const { username, password, name, email, url } = userInfo
    return db.execute(
        'INSERT INTO users (username, password, name, email, url) VALUES (?,?,?,?,?)', 
        [ username, password, name, email, url ]
    ).then(result => {
        return result[0].insertId
    })
}


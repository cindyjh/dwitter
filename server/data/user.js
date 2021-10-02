import bcrypt from 'bcrypt'

let users = [
    {
        id: '1',
        username: 'cindy',
        password: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImNpbmR5IiwiaXNBZG1pbiI6ZmFsc2UsImlhdCI6MTYzMjY1MzYyM30.ZvmhQ-ytESfZ82DiKjqf37pEMdgKq-v00pFmaJK81bk',
        createdAt: Date.now().toString()
    }
]

export async function validateUsername(username) {
    const duplicateUser = users.filter(user => user.username === username)
    return duplicateUser.length === 0
}

export async function create(username, password, name, email, url) {
    const bcryptedPassword = bcryptPassword(password)
    const user = {
        id: Math.max(...users.map(user => user.id)),
        username,
        bcryptedPassword,
        name,
        email,
        url,
        createdAt: Date.now().toString(),
        updatedAt: Date.now().toString(),
    }

    users.push(user)
    return users
}

export async function get(username, password) {
    const bcryptedPassword = bcryptPassword(password)
    return users.filter(user => user.username === username && user.password === bcryptedPassword)
}

function bcryptPassword(password) {
    return bcrypt.hashSync(password, 10)
}



let users = [
    {
        id: '1',
        username: 'cindy',
        password: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImNpbmR5IiwiaXNBZG1pbiI6ZmFsc2UsImlhdCI6MTYzMjY1MzYyM30.ZvmhQ-ytESfZ82DiKjqf37pEMdgKq-v00pFmaJK81bk',
        createdAt: Date.now().toString()
    }
]

export async function findByUsername(username) {
    return users.find(user => user.username === username)
}

export async function create(userInfo) {
    const user = {
        id: Math.max(...users.map(user => user.id)),
        ...userInfo,
        createdAt: Date.now().toString(),
        updatedAt: Date.now().toString(),
    }

    users.push(user)
    return user
}


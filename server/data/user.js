let users = [
    {
        id: '1',
        username: 'cindy',
        password: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImNpbmR5IiwiaXNBZG1pbiI6ZmFsc2UsImlhdCI6MTYzMjY1MzYyM30.ZvmhQ-ytESfZ82DiKjqf37pEMdgKq-v00pFmaJK81bk',
        createdAt: new Date().toString(),
    },
    {
        id: '2',
        username: 'cindy2',
        password: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImNpbmR5IiwiaXNBZG1pbiI6ZmFsc2UsImlhdCI6MTYzMjY1MzYyM30.ZvmhQ-ytESfZ82DiKjqf37pEMdgKq-v00pFmaJK81bk',
        createdAt: new Date().toString(),
    }
]

export async function findByUsername(username) {
    return users.find(user => user.username === username)
}

export async function findById(id) {
    return users.find(user => user.id === id)
}

export async function create(userInfo) {
    const user = {
        id: Math.max(...users.map(user => user.id)) + 1,
        ...userInfo,
        createdAt: new Date().toString(),
        updatedAt: new Date().toString(),
    }

    users.push(user)
    return user
}


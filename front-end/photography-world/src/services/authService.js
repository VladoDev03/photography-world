const baseUrl = 'https://photography-world.herokuapp.com/api/auth'

export async function login(userData) {
    const response = await fetch(`${baseUrl}/login`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(userData)
    })

    const result = response.json()

    return result
}

export async function register(userData) {
    const response = await fetch(`${baseUrl}/register`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(userData)
    })

    const result = response.json()

    return result
}
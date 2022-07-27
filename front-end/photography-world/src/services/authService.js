const baseUrl = 'https://localhost:7211/api'

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
            'content/type': 'application/json'
        },
        body: JSON.stringify(userData)
    })

    const result = response.json()

    return result
}
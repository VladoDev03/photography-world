const baseUrl = 'https://localhost:7211/api/users'

export async function getUser(userId) {
    const response = await fetch(`${baseUrl}/${userId}`)
    const result = await response.json();

    return result;
}
const getUrl = 'https://photography-world.herokuapp.com/api/users'

export async function getUser(userId) {
    const response = await fetch(`${getUrl}/${userId}`)
    const result = await response.json();

    return result;
}
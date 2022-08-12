const baseUrl = 'https://localhost:7211/api/likes'

export async function getPictureLikes(pictureId) {
    const response = await fetch(`${baseUrl}/${pictureId}`)
    const result = await response.json();

    return result;
}

export async function addLike(like) {
    const response = await fetch(baseUrl, {
        method: 'POST',
        body: JSON.stringify(like),
        headers: {
            'Content-Type': 'application/json'
        }
    })

    const result = await response.json();

    return result
}

export async function removeLike(like) {
    const response = await fetch(`${baseUrl}`, {
        method: 'DELETE',
        body: JSON.stringify(like),
        headers: {
            'Content-Type': 'application/json'
        }
    })

    const result = await response.json();

    return result
}
const baseUrl = 'https://photography-world.herokuapp.com/api/pictures'

export async function getImages() {
    const response = await fetch(baseUrl)
    const result = await response.json();

    return result;
}

export async function getImageById(imageUrl) {
    const response = await fetch(`${baseUrl}/${imageUrl}`)
    const result = await response.json();

    return result;
}

export async function uploadImage(imageData) {
    const response = await fetch(baseUrl, {
        method: 'POST',
        body: imageData
    })

    const result = await response.json();

    return result
}

export async function deleteImage(imageId) {
    const response = await fetch(`${baseUrl}/${imageId}`, {
        method: 'DELETE'
    })

    const result = await response.json();

    return result
}

export async function editImage({imageId, description}) {
    const response = await fetch(`${baseUrl}/${imageId}`, {
        method: 'PUT',
        body: JSON.stringify({description}),
        headers: {
            'Content-Type': 'application/json'
        }
    })

    const result = await response.json();

    return result
}
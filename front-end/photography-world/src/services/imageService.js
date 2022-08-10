const getUrl = 'https://localhost:7211/api/pictures'

export async function getImages() {
    const response = await fetch(getUrl)
    const result = await response.json();

    return result;
}

export async function getImageById(imageUrl) {
    const response = await fetch(`${getUrl}/${imageUrl}`)
    const result = await response.json();

    return result;
}

export async function uploadImage(imageData) {
    const response = await fetch(getUrl, {
        method: 'POST',
        body: imageData
    })

    const result = await response.json();

    return result
}

export async function deleteImage(imageId) {
    const response = await fetch(`${getUrl}/${imageId}`, {
        method: 'DELETE'
    })

    const result = await response.json();

    return result
}

export async function editImage({imageId, description}) {
    const response = await fetch(`${getUrl}/${imageId}`, {
        method: 'PUT',
        body: JSON.stringify({description}),
        headers: {
            'Content-Type': 'application/json'
        }
    })

    const result = await response.json();

    return result
}
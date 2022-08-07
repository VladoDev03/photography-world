const getUrl = 'https://photography-world.herokuapp.com/api/pictures'

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
    const response = await fetch('https://localhost:7211/api/pictures', {
        method: 'POST',
        body: imageData
    })

    const result = await response.json();

    return result
}

export async function deleteImage(imageId) {
    const response = await fetch(`https://photography-world.herokuapp.com/api/pictures/${imageId}`, {
        method: 'DELETE'
    })

    const result = await response.json();

    return result
}

export async function editImage({imageId, description}) {
    const response = await fetch(`https://photography-world.herokuapp.com/api/pictures/${imageId}`, {
        method: 'PUT',
        body: JSON.stringify({description}),
        headers: {
            'Content-Type': 'application/json'
        }
    })

    const result = await response.json();

    return result
}
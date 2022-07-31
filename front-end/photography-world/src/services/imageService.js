const getUrl = 'https://localhost:7211/api/pictures'

export async function getImages() {
    const response = await fetch(getUrl)
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
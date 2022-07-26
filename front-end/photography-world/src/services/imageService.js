const getUrl = 'https://localhost:7211/api/pictures'

export async function getImages() {
    const response = await fetch(getUrl)
    const result = await response.json();

    return result;
}
export function pictureToBlob(picture) {
    const extension = getPictureType(picture)
    return new Blob([picture], { type: `image/${extension}` })
}

export function getPictureType(picture) {
    return picture.name.split('.').pop().toLowerCase()
}

export function getPictureSize(picture) {
    return picture.size
}
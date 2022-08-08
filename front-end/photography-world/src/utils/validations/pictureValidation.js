import * as pictureParser from '../../utils/parsers/pictureParser'

export function validateDescription(description) {
    const errors = {
        descriptionLength: false
    }

    errors.descriptionLength = description.length >= 5

    return errors
}

export function validatePicture(picture) {
    const errors = {
        size: false,
        type: false,
        isNull: false
    }

    errors.size = validateSize(pictureParser.getPictureSize(picture))
    errors.type = validateType(pictureParser.getPictureType(picture))
    errors.isNull = isPictureNotNull(picture)

    return errors
}

function validateSize(pictureSize) {
    const maxSize = 10_485_760

    return pictureSize <= maxSize
}

function validateType(pictureExtension) {
    const validTypes = ['png', 'jpg']

    for (let i = 0; i < validTypes.length; i++) {
        if (pictureExtension === validTypes[i]) {
            return true
        }
    }

    return false
}

function isPictureNotNull(picture) {
    return picture !== null
}
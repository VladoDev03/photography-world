export function parseDate(dateToParse) {
    const dateObject = new Date(dateToParse)

    const day = dateObject.getDate()
    const month = dateObject.getMonth() + 1
    const year = dateObject.getFullYear()

    return `${day}/${month}/${year}`
}
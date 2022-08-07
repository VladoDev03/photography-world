export function orderByDate(pictures) {
    const orderedList = [...pictures].sort((a, b) => {
        const dateA = Date.parse(a.timeCreated)
        const dateB = Date.parse(b.timeCreated)

        return dateA > dateB ? -1
            : dateA < dateB ? 1
                : 0
    })

    return orderedList
}

export function orderByDescription(pictures) {
    const orderedList = [...pictures].sort((a, b) => {
        return a.description > b.description ? 1
            : a.description < b.description ? -1
                : 0
    })

    return orderedList
}
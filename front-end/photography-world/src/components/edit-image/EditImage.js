import * as imageService from '../../services/imageService'

export function EditImage() {
    const newData = {
        description: 'dreaaaamiiing . . .',
        imageId:'365f7ada-12da-40ce-b7ca-11d29e27806a'
    }

    imageService.editImage(newData).then(data => console.log(data))
    
    return (
        <h1>Edit Image Page</h1>
    )
}
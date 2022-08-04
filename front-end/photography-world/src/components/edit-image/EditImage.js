import { useState } from 'react'
import styles from './EditImage.module.css'
import * as imageService from '../../services/imageService'

export function EditImage({imageId, closeHandler, description, setDescription, setIsLoading}) {
    const [newDescription, setNewDescription] = useState(description)

    const changeHandler = (e) => {
        setNewDescription(e.target.value)
    }

    const editHandler = () => {
        setIsLoading(true)

        const newData = {
            description: newDescription,
            imageId: imageId
        }

        imageService.editImage(newData).then(() => {
            closeHandler()
            setDescription(newDescription)
            setIsLoading(false)
        })
    }

    return (
        <div onClick={closeHandler} className={styles['modal-container']}>
            <div onClick={e => e.stopPropagation()} className={styles['modal']}>
                <h3 className={styles['modal-title']}>Enter new description</h3>
                <input className={styles['edit-input']} type='text' onChange={changeHandler} value={newDescription} />
                <button onClick={closeHandler} className={`${styles['answer-button']} ${styles['no-button']}`}>cancel</button>
                <button onClick={editHandler} className={`${styles['answer-button']} ${styles['yes-button']}`}>save</button>
            </div>
        </div>
    )
}
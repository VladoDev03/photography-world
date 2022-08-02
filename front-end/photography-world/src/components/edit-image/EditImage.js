import { useState } from 'react'
import styles from './EditImage.module.css'
import * as imageService from '../../services/imageService'

export function EditImage({imageId, closeHandler, description, setDescription}) {
    const [newDescription, setNewDescription] = useState(description)

    const changeHandler = (e) => {
        setNewDescription(e.target.value)
    }

    const editHandler = () => {
        const newData = {
            description: newDescription,
            imageId: imageId
        }

        imageService.editImage(newData).then(() => {
            closeHandler()
            setDescription(newDescription)
        })
    }

    return (
        <div className={styles['modal-container']}>
            <div className={styles['modal']}>
                <h3 className={styles['modal-title']}>Enter new description</h3>
                <input className={styles['edit-input']} type='text' onChange={changeHandler} value={newDescription} />
                <button onClick={closeHandler} className={`${styles['answer-button']} ${styles['no-button']}`}>cancel</button>
                <button onClick={editHandler} className={`${styles['answer-button']} ${styles['yes-button']}`}>save</button>
            </div>
        </div>
    )
}
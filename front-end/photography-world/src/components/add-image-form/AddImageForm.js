import { useState, useEffect } from "react"
import { LoadingSpinner } from "../loading-spinner/LoadingSpinner"
import styles from './AddImageForm.module.css'

export function AddImageForm() {
    const [description, setDescription] = useState('')
    const [picture, setPicture] = useState('')
    const [isShown, setIsShown] = useState(false)
    const [preview, setPreview] = useState('')

    const submitHandler = (e) => {
        e.preventDefault()

        setIsShown(true)
    }

    const descriptionHandler = (e) => {
        setDescription(e.target.value)
    }

    const pictureHandler = (e) => {
        setPicture(e.target.files[0])
    }

    useEffect(() => {
        if (picture) {
            const reader = new FileReader()
            reader.onloadend = () => {
                setPreview(reader.result)
            }
            reader.readAsDataURL(picture)
        } else {
            setPreview('')
        }
    }, [picture])

    const isChosen = picture == undefined || picture == ''

    return (
        <div className={styles['center']}>
            <h1>Share Image</h1>
            <form onSubmit={submitHandler} method="post">
                <div className={styles['text-field']}>
                    <input id="comment" type="text" name="comment" value={description} onChange={descriptionHandler} required />
                    <label htmlFor="comment">Comment</label>
                </div>

                <div>
                    <label className={styles['image']} htmlFor="picture">{isChosen ? 'Select' : 'Change'} Image</label>
                    <input id="picture" type="file" name="picture" accept="image/*" onChange={pictureHandler} required />
                </div>

                <button className={styles['submit']} type="submit">Publish</button>
            </form>
            {!isShown || <LoadingSpinner />}
            {!isShown && picture && <img className={styles['preview']} src={preview} />}
        </div>
    )
}
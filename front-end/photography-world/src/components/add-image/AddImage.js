import { useState, useEffect, useContext } from "react"
import { LoadingSpinner } from "../loading-spinner/LoadingSpinner"
import { AddImageForm } from "../add-image-form/AddImageForm"
import { AuthContext } from '../../contexts/AuthContext'
import styles from './AddImage.module.css'
import * as imageServices from '../../services/imageService'
import { useNavigate } from "react-router-dom"

export function AddImage() {
    const navigate = useNavigate()
    const { user } = useContext(AuthContext)
    const [description, setDescription] = useState('')
    const [picture, setPicture] = useState('')
    const [isShown, setIsShown] = useState(false)
    const [preview, setPreview] = useState('')
    const [isChosen, setIsChosen] = useState(false)

    const submitHandler = (e) => {
        e.preventDefault()

        setIsShown(true)

        const extension = picture.name.split('.').pop().toLowerCase()
        const isCorrectType = extension === 'png' || extension === 'jpg'
        const blob = isCorrectType ? new Blob([picture], { type: `image/${extension}` }) : ''

        const content = new FormData()

        content.append('picture', blob)
        content.append('comment', description)
        content.append('userId', user.user.id)

        imageServices.uploadImage(content).then(() => {
            setIsShown(true)
            navigate('/')
        })
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
            setIsChosen(true)
        } else {
            setPreview('')
        }
    }, [picture])

    return (
        <div className='center'>
            <h1>Share Image</h1>
            {!isShown && <AddImageForm
                submitHandler={submitHandler}
                description={description}
                picture={picture}
                pictureHandler={pictureHandler}
                descriptionHandler={descriptionHandler}
                isChosen={isChosen} />}
            <div className={styles['center-img']} >
                {!isShown && picture && <img className={styles['preview']} src={preview} />}
                {!isShown || <LoadingSpinner />}
            </div>
        </div>
    )
}
import { useState, useEffect, useContext } from "react"
import { LoadingSpinner } from "../loading-spinner/LoadingSpinner"
import { AddImageForm } from "../add-image-form/AddImageForm"
import {AuthContext} from '../../contexts/AuthContext'
import styles from './AddImage.module.css'
import { Navigate } from "react-router-dom"
import * as imageServices from '../../services/imageService'

export function AddImage() {
    const {user} = useContext(AuthContext)
    const [description, setDescription] = useState('')
    const [picture, setPicture] = useState('')
    const [isShown, setIsShown] = useState(false)
    const [preview, setPreview] = useState('')

    const submitHandler = (e) => {
        e.preventDefault()

        setIsShown(true)

        const extension = picture.name.split('.').pop().toLowerCase()

        if (extension !== 'png' && extension !== 'jpg') {
            return <Navigate to='/add' replace />
        }

        const blob = new Blob([picture], { type: 'image/png' })

        const content = new FormData()
        
        content.append('picture', blob)
        content.append('comment', description)
        content.append('userId', user.user.id)

        imageServices.uploadImage(content).then(() => setIsShown(false))
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

    const isChosen = picture === undefined || picture === ''

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
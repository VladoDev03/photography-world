import { useState, useContext } from "react"
import { LoadingSpinner } from "../loading-spinner/LoadingSpinner"
import { AddImageForm } from "../add-image-form/AddImageForm"
import { AuthContext } from '../../contexts/AuthContext'
import { useNavigate } from "react-router-dom"
import styles from './AddImage.module.css'
import * as imageService from '../../services/imageService'
import * as pictureValidation from '../../utils/validations/pictureValidation'
import * as pictureParser from '../../utils/parsers/pictureParser'

export function AddImage() {
    const navigate = useNavigate()
    const { user } = useContext(AuthContext)
    const [description, setDescription] = useState('')
    const [picture, setPicture] = useState('')
    const [isShown, setIsShown] = useState(false)
    const [preview, setPreview] = useState('')
    const [isChosen, setIsChosen] = useState(false)
    const [errors, setErrors] = useState({})

    const submitHandler = (e) => {
        e.preventDefault()

        setIsShown(true)

        const content = new FormData()

        content.append('picture', picture)
        content.append('comment', description)
        content.append('userId', user.user.id)

        imageService.uploadImage(content).then(() => {
            setIsShown(true)
            navigate('/profile')
        })
    }

    const descriptionHandler = (e) => {
        setDescription(e.target.value)
    }

    const pictureHandler = (e) => {
        const pic = e.target.files[0]

        if (pic) {
            const reader = new FileReader()
            reader.onloadend = () => {
                setPreview(reader.result)
            }
            reader.readAsDataURL(pic)
            setIsChosen(true)

            const blob = pictureParser.pictureToBlob(pic)
            setPicture(blob)

            const err = pictureValidation.validatePicture(pic)
            setErrors(oldErrors => ({
                ...oldErrors,
                ['size']: !err.size,
                ['type']: !err.type,
                ['isNull']: !err.isNull
            }))
        } else {
            setIsChosen(false)
            setPreview('')
            setErrors({isNull: true})
        }
    }

    return (
        <div className='center'>
            <h1>Share Image</h1>
            {!isShown && <AddImageForm
                submitHandler={submitHandler}
                description={description}
                picture={picture}
                pictureHandler={pictureHandler}
                descriptionHandler={descriptionHandler}
                isChosen={isChosen}
                setErrors={setErrors}
                isDisabled={Object.values(errors).some(x => x)} />}
            <p className='error-message'>{errors.size ? 'Max file size is 10 mb' : ''}</p>
            <p className='error-message'>{errors.type ? 'File type must be either \'png\' or \'jpg\'' : ''}</p>
            <p className='error-message'>{errors.isNull ? 'You have to upload a picture before submiting' : ''}</p>
            <p className='error-message'>{errors.descriptionLength ? 'Description must be at least 5 characters long' : ''}</p>
            <div className={styles['center-img']} >
                {(isChosen && !errors.type && !errors.size && !isShown && !errors.isNull)
                    && <img className={styles['preview']} src={preview} />}
                {!isShown || <LoadingSpinner />}
            </div>
        </div>
    )
}
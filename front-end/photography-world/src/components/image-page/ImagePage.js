import { useContext, useEffect, useState } from "react"
import { useParams, useNavigate } from 'react-router-dom'
import { ConfirmDelete } from '../confirm-delete/ConfirmDelete'
import { EditImage } from "../edit-image/EditImage"
import { AuthContext } from '../../contexts/AuthContext'
import styles from './ImagePage.module.css'
import * as imageServices from '../../services/imageService'

export function ImagePage() {
    const [image, setImage] = useState('')
    const [description, setDescription] = useState('')
    const [username, setUsername] = useState('')
    const [isAsked, setIsAsked] = useState(false)
    const [isEditing, setIsEditing] = useState(false)
    const [isOwner, setIsOwner] = useState(false)
    const { user } = useContext(AuthContext)
    const { id } = useParams()
    const navigate = useNavigate()

    useEffect(() => {
        imageServices.getImageById(id).then(data => {
            setImage(data.url)
            setDescription(data.description)
            setUsername(data.user.username)
            setIsOwner(data.user.id === user.user.id)
        })
    }, [])

    const openConfirmation = () => {
        setIsAsked(true)
    }

    const openEdit = () => {
        setIsEditing(true)
    }

    const closeHandler = () => {
        setIsAsked(false)
        setIsEditing(false)
    }

    const deleteHandler = () => {
        imageServices.deleteImage(id).then(() => {
            navigate('../../profile')
        })
    }

    return (
        <div className='container'>
            {isAsked ? <ConfirmDelete deleteHandler={deleteHandler} closeHandler={closeHandler} /> : ''}
            {isEditing ? <EditImage setDescription={setDescription} description={description} imageId={id} closeHandler={closeHandler} /> : ''}
            <div className={styles['image-data']}>
                <img className={styles['image']} src={image} />
                <div>
                    <p className={styles['content']}>
                        <span className={styles['property-name']}>Photographer: </span>
                        {username}
                    </p>
                    <p className={styles['content']}>
                        <span className={styles['property-name']}>Description: </span>
                        {description}
                    </p>
                </div>
            </div>
            {isOwner ? <button onClick={openConfirmation} className={`${styles['button']} ${styles['delete-button']}`}>Delete</button> : ''}
            {isOwner ? <button onClick={openEdit} className={`${styles['button']} ${styles['edit-button']}`}>Edit</button> : ''}
        </div>
    )
}
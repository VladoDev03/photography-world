import { useContext, useEffect, useState } from "react"
import { useParams, useNavigate } from 'react-router-dom'
import { ConfirmDelete } from '../confirm-delete/ConfirmDelete'
import { AuthContext } from '../../contexts/AuthContext'
import styles from './ImagePage.module.css'
import * as imageServices from '../../services/imageService'

export function ImagePage() {
    const [image, setImage] = useState({})
    const [username, setUsername] = useState('')
    const [isAsked, setIsAsked] = useState(false)
    const [isOwner, setIsOwner] = useState(false)
    const { user } = useContext(AuthContext)
    const { id } = useParams()
    const navigate = useNavigate()

    useEffect(() => {
        imageServices.getImageById(id).then(data => {
            setImage(data)
            setUsername(data.user.username)
            setIsOwner(data.user.id === user.user.id)
        })
    }, [])

    const openConfirmation = () => {
        setIsAsked(true)
    }

    const closeHandler = () => {
        setIsAsked(false)
    }

    const deleteHandler = () => {
        imageServices.deleteImage(id).then(() => {
            navigate('../../profile')
        })
    }

    return (
        <div className='container'>
            {isAsked ? <ConfirmDelete deleteHandler={deleteHandler} closeHandler={closeHandler} /> : ''}
            <div className={styles['image-data']}>
                <img className={styles['image']} src={image.url} />
                <div>
                    <p className={styles['content']}>
                        <span className={styles['property-name']}>Photographer: </span>
                        {username}
                    </p>
                    <p className={styles['content']}>
                        <span className={styles['property-name']}>Description: </span>
                        {image.description}
                    </p>
                </div>
            </div>
            {isOwner ? <button onClick={openConfirmation} className={styles['delete-button']}>Delete</button> : ''}
        </div>
    )
}
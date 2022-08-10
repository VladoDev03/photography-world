import { useContext, useEffect, useState } from "react"
import { useParams, useNavigate, useSearchParams, Link } from 'react-router-dom'
import { ConfirmDelete } from '../confirm-delete/ConfirmDelete'
import { EditImage } from "../edit-image/EditImage"
import { LoadingSpinner } from "../loading-spinner/LoadingSpinner"
import { AuthContext } from '../../contexts/AuthContext'
import { UserImagesContext } from '../../contexts/UserImagesContext'
import styles from './ImagePage.module.css'
import * as imageServices from '../../services/imageService'

export function ImagePage() {
    const [image, setImage] = useState('')
    const [description, setDescription] = useState('')
    const [userDetails, setUserDetails] = useState({})
    const [isAsked, setIsAsked] = useState(false)
    const [isEditing, setIsEditing] = useState(false)
    const [isOwner, setIsOwner] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [isOverviewOpen, setIsOverviewOpen] = useState(false)
    const [currentPage, setCurrentPage] = useState(0)
    const { user } = useContext(AuthContext)
    const { images } = useContext(UserImagesContext)
    const { id } = useParams()
    const [overviewParams, setOverviewParams] = useSearchParams()
    const navigate = useNavigate()

    useEffect(() => {
        let isOverview = overviewParams.get('overview') || 'false'

        const page = overviewParams.get('page')
        setCurrentPage(page)

        if (isOverview === 'true') {
            setIsOverviewOpen(true)
        }

        if (id) {
            imageServices.getImageById(id)
                .then(data => {
                    setImage(data.url)
                    setDescription(data.description)
                    setUserDetails({ userId: data.user.id, username: data.user.username })
                    setIsOwner(data.user.id === user.user.id)
                })
            setOverviewParams({ overview: isOverview }, { replace: true })
        } else if (page) {
            const currentImage = images[page]
            imageServices.getImageById(currentImage.imageId || currentImage.id)
                .then(data => {
                    setImage(data.url)
                    setDescription(data.description)
                    setUserDetails({ userId: data.user.id, username: data.user.username })
                    setIsOwner(data.user.id === user.user.id)
                })
            setOverviewParams({ overview: isOverview, page: page }, { replace: true })
        }
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
        setIsLoading(true)
        setIsAsked(false)
        imageServices.deleteImage(id).then(() => {
            setIsLoading(false)
            navigate('../../profile')
        })
    }

    const imgClickHandler = () => {
        setIsOverviewOpen(true)
        if (currentPage) {
            setOverviewParams({ overview: true, page: currentPage }, { replace: true })
        } else {
            setOverviewParams({ overview: true }, { replace: true })
        }
    }

    const closeOverviewHandler = () => {
        setIsOverviewOpen(false)
        if (currentPage) {
            setOverviewParams({ overview: false, page: currentPage }, { replace: true })
        } else {
            setOverviewParams({ overview: false }, { replace: true })
        }
    }

    return (
        <div className='container'>
            {isEditing ? <EditImage setIsLoading={setIsLoading} setDescription={setDescription} description={description} imageId={id} closeHandler={closeHandler} /> : ''}
            {isAsked ? <ConfirmDelete deleteHandler={deleteHandler} closeHandler={closeHandler} /> : ''}
            {isLoading ?
                <div className={styles['center-img']} >
                    <LoadingSpinner />
                </div> : ''}
            <div className={styles['image-data']}>
                <img className={styles['image']} src={image} onClick={imgClickHandler} />
                <div className={styles['content-container']}>
                    <p className={styles['content']}>
                        <span className={styles['property-name']}>Photographer: </span>
                        <Link className={styles['username-text']} to={userDetails.userId === user.user.id ? `../profile` : `../user/${userDetails.userId}`}>{userDetails.username}</Link>
                    </p>
                    <p className={styles['content']}>
                        <span className={styles['property-name']}>Description: </span>
                        {description}
                    </p>
                </div>
            </div>
            {isOverviewOpen ?
                <div onClick={closeOverviewHandler} className={styles['overview-container']}>
                    <img onClick={e => e.stopPropagation()} className={styles['image-overview']} src={image} />
                </div> : ''}
            {isOwner ? <button onClick={openConfirmation} className={`${styles['button']} ${styles['delete-button']}`}>Delete</button> : ''}
            {isOwner ? <button onClick={openEdit} className={`${styles['button']} ${styles['edit-button']}`}>Edit</button> : ''}
        </div>
    )
}
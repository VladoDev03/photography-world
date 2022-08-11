import { useContext, useEffect, useState } from "react"
import { useParams, useNavigate, useSearchParams, Link } from 'react-router-dom'
import { ConfirmDelete } from '../confirm-delete/ConfirmDelete'
import { EditImage } from "../edit-image/EditImage"
import { LoadingSpinner } from "../loading-spinner/LoadingSpinner"
import { AuthContext } from '../../contexts/AuthContext'
import { UserImagesContext } from '../../contexts/UserImagesContext'
import { FaHeart } from 'react-icons/fa';
import { FaRegHeart } from 'react-icons/fa';
import styles from './ImagePage.module.css'
import * as imageServices from '../../services/imageService'
import * as dateParser from '../../utils/parsers/dateParser'

export function ImagePage() {
    const [image, setImage] = useState('')
    const [description, setDescription] = useState('')
    const [userDetails, setUserDetails] = useState({})
    const [createdOn, setCreatedOn] = useState('')
    const [isAsked, setIsAsked] = useState(false)
    const [isEditing, setIsEditing] = useState(false)
    const [isOwner, setIsOwner] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [isOverviewOpen, setIsOverviewOpen] = useState(false)
    const [currentPage, setCurrentPage] = useState(0)
    const [isPageButtonActive, setIsPageButtonActive] = useState({ isDecrementDisabled: false, isIncrementDisabled: false })
    const { user } = useContext(AuthContext)
    const { images } = useContext(UserImagesContext)
    const { id } = useParams()
    const [overviewParams, setOverviewParams] = useSearchParams()
    const navigate = useNavigate()

    useEffect(() => {
        let isOverview = overviewParams.get('overview') || 'false'

        let page = overviewParams.get('page')

        if (parseInt(page) < 0) {
            page = '0'
        } else if (parseInt(page) >= images.length) {
            page = images.length - 1
        }

        setCurrentPage(page)

        if (page === '0' && parseInt(page) === images.length - 1) {
            setIsPageButtonActive({
                isDecrementDisabled: true,
                isIncrementDisabled: true
            })
        } else if (page === '0') {
            setIsPageButtonActive({
                isDecrementDisabled: true,
                isIncrementDisabled: false
            })
        } else if (parseInt(page) === images.length - 1) {
            setIsPageButtonActive({
                isDecrementDisabled: false,
                isIncrementDisabled: true
            })
        }

        if (isOverview === 'true') {
            setIsOverviewOpen(true)
        }

        if (id) {
            imageServices.getImageById(id)
                .then(data => {
                    setImage(data.url)
                    setDescription(data.description)
                    setUserDetails({ userId: data.user.id, username: data.user.username })
                    setCreatedOn(data.timeCreated)
                    if (user.user) {
                        setIsOwner(data.user.id === user.user.id)
                    } else {
                        setIsOwner(false)
                    }
                })
            setOverviewParams({ overview: isOverview }, { replace: true })
        } else if (page) {
            const currentImage = images[page]
            imageServices.getImageById(currentImage.imageId || currentImage.id)
                .then(data => {
                    setImage(data.url)
                    setDescription(data.description)
                    setUserDetails({ userId: data.user.id, username: data.user.username })
                    setCreatedOn(data.timeCreated)
                    if (user.user) {
                        setIsOwner(data.user.id === user.user.id)
                    } else {
                        setIsOwner(false)
                    }
                })
            setOverviewParams({ overview: isOverview, page: page }, { replace: true })
        }
    }, [])

    const getCurrentId = () => {
        return images.find(x => x.url === image).imageId
    }

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
        imageServices.deleteImage(id || getCurrentId()).then(() => {
            setIsLoading(false)
            navigate('../../profile')
        })
    }

    const imgClickHandler = () => {
        setIsOverviewOpen(true)

        if (id) {
            setOverviewParams({ overview: true }, { replace: true })
        } else {
            setOverviewParams({ overview: true, page: currentPage }, { replace: true })
        }
    }

    const closeOverviewHandler = () => {
        setIsOverviewOpen(false)

        if (id) {
            setOverviewParams({ overview: false }, { replace: true })
        } else {
            setOverviewParams({ overview: false, page: currentPage }, { replace: true })
        }
    }

    const incrementPage = () => {
        if (parseInt(currentPage) + 1 === images.length - 1) {
            setIsPageButtonActive({
                isDecrementDisabled: false,
                isIncrementDisabled: true
            })
        } else {
            setIsPageButtonActive({
                isDecrementDisabled: false,
                isIncrementDisabled: false
            })
        }

        setCurrentPage(oldState => parseInt(oldState) + 1)
        setOverviewParams({ overview: isOverviewOpen, page: parseInt(currentPage) + 1 }, { replace: true })

        setImage(images[parseInt(currentPage) + 1].url)
        setDescription(images[parseInt(currentPage) + 1].description)
    }

    const decrementPage = () => {
        if (parseInt(currentPage) === 1) {
            setIsPageButtonActive({
                isDecrementDisabled: true,
                isIncrementDisabled: false
            })
        } else {
            setIsPageButtonActive({
                isDecrementDisabled: false,
                isIncrementDisabled: false
            })
        }

        setCurrentPage(oldState => oldState - 1)
        setOverviewParams({ overview: isOverviewOpen, page: currentPage - 1 }, { replace: true })

        setImage(images[parseInt(currentPage) - 1].url)
        setDescription(images[parseInt(currentPage) - 1].description)
    }

    return (
        <div className='container'>
            {console.log(image.id)}
            {isEditing ? <EditImage setIsLoading={setIsLoading} setDescription={setDescription} description={description} imageId={id || getCurrentId()} closeHandler={closeHandler} /> : ''}
            {isAsked ? <ConfirmDelete deleteHandler={deleteHandler} closeHandler={closeHandler} /> : ''}
            {isLoading ?
                <div className={styles['center-img']} >
                    <LoadingSpinner />
                </div> : ''}
            <div className={styles['image-data']}>
                <div className={styles['image-block']}>
                    <img className={styles['image']} src={image} onClick={imgClickHandler} />
                    <div className={styles['likes-container']}>
                        <p className={styles['likes']}>Likes: 10</p>
                        {isOwner || <p className={`${styles['like-button']} ${styles['liked']}`}><FaHeart /></p>}
                        {/* <p className={styles['like-button']}><FaRegHeart /></p> */}
                    </div>
                </div>
                <div className={styles['content-container']}>
                    <p className={styles['content']}>
                        <span className={styles['property-name']}>Photographer: </span>
                        {user.user ?
                            <Link className={styles['username-text']} to={userDetails.userId === user.user.id ? `../profile` : `../user/${userDetails.userId}`}>{userDetails.username}</Link>
                            : <Link className={styles['username-text']} to={`../user/${userDetails.userId}`}>{userDetails.username}</Link>}
                    </p>
                    <p className={styles['content']}>
                        <span className={styles['property-name']}>Description: </span>
                        {description}
                    </p>
                    <p className={styles['content']}>
                        <span className={styles['property-name']}>Uploaded on: </span>
                        {dateParser.parseDate(createdOn)}
                    </p>
                </div>
            </div>
            {isOverviewOpen ?
                <div onClick={closeOverviewHandler} className={styles['overview-container']}>
                    <img onClick={e => e.stopPropagation()} className={styles['image-overview']} src={image} />
                </div> : ''}
            {!id ? <button onClick={decrementPage} className={`${styles['button']} ${styles['page-button']}`} disabled={isPageButtonActive.isDecrementDisabled}>-</button> : ''}
            {isOwner ? <button onClick={openConfirmation} className={`${styles['button']} ${styles['delete-button']}`}>Delete</button> : ''}
            {isOwner ? <button onClick={openEdit} className={`${styles['button']} ${styles['edit-button']}`}>Edit</button> : ''}
            {!id ? <button onClick={incrementPage} className={`${styles['button']} ${styles['page-button']}`} disabled={isPageButtonActive.isIncrementDisabled}>+</button> : ''}
        </div>
    )
}
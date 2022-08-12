import { useContext, useEffect, useState } from "react"
import { useParams, useNavigate, useSearchParams, Link } from 'react-router-dom'
import { ConfirmDelete } from '../confirm-delete/ConfirmDelete'
import { EditImage } from "../edit-image/EditImage"
import { LoadingSpinner } from "../loading-spinner/LoadingSpinner"
import { AuthContext } from '../../contexts/AuthContext'
import { UserImagesContext } from '../../contexts/UserImagesContext'
import { FaHeart } from 'react-icons/fa';
import { FaRegHeart } from 'react-icons/fa';
import { FaShare } from 'react-icons/fa';
import styles from './ImagePage.module.css'
import * as imageService from '../../services/imageService'
import * as likeServices from '../../services/likeService'
import * as dateParser from '../../utils/parsers/dateParser'

export function ImagePage() {
    const [image, setImage] = useState('')
    const [description, setDescription] = useState('')
    const [userDetails, setUserDetails] = useState({})
    const [createdOn, setCreatedOn] = useState('')
    const [currentPage, setCurrentPage] = useState(0)
    const [isAsked, setIsAsked] = useState(false)
    const [isEditing, setIsEditing] = useState(false)
    const [isOwner, setIsOwner] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [isOverviewOpen, setIsOverviewOpen] = useState(false)
    const [isLiked, setIsLiked] = useState(false)
    const [likesCount, setLikesCount] = useState(0)
    const [isPageButtonActive, setIsPageButtonActive] = useState({ isDecrementDisabled: false, isIncrementDisabled: false })
    const { user } = useContext(AuthContext)
    const { images, setImages } = useContext(UserImagesContext)
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

        likeServices.getPictureLikes(id || images[page].imageId)
            .then(data => {
                if (user.user && data.some(x => x.userId === user.user.id)) {
                    setIsLiked(true)
                }

                setLikesCount(data.length)
            })

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

        let requestId
        const currentImage = images[page]

        if (id) {
            requestId = id
            setOverviewParams({ overview: isOverview }, { replace: true })
        } else if (page) {
            requestId = currentImage.imageId || currentImage.id
            setOverviewParams({ overview: isOverview, page: page }, { replace: true })
        }

        imageService.getImageById(requestId)
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

        imageService.deleteImage(id || getCurrentId()).then(() => {
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

    const changePage = (newPage) => {
        setCurrentPage(newPage)
        setOverviewParams({ overview: isOverviewOpen, page: newPage }, { replace: true })

        setImage(images[newPage].url)
        setDescription(images[newPage].description)

        likeServices.getPictureLikes(id || images[newPage].imageId)
            .then(data => {
                if (user.user && data.some(x => x.userId === user.user.id)) {
                    setIsLiked(true)
                } else {
                    setIsLiked(false)
                }

                setLikesCount(data.length)
            })
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

        const newPage = parseInt(currentPage) + 1
        changePage(newPage)
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

        const newPage = parseInt(currentPage) - 1
        changePage(newPage)
    }

    const likeHandler = () => {
        const likeData = {
            pictureId: id || images[currentPage].imageId,
            userId: user.user.id
        }

        likeServices.addLike(likeData)
            .then(setIsLiked(true))

        setLikesCount(oldState => oldState + 1)
    }

    const disLikeHandler = () => {
        const likeData = {
            pictureId: id || images[currentPage].imageId,
            userId: user.user.id
        }

        likeServices.removeLike(likeData)
            .then(setIsLiked(false))

        setLikesCount(oldState => oldState - 1)
    }

    const shareHandler = () => {
        navigator.clipboard.writeText(`http://localhost:3000/image/${id || images[currentPage].imageId}`);
    }

    return (
        <div className='container'>
            {isEditing ? <EditImage images={images} setImages={setImages} setIsLoading={setIsLoading} setDescription={setDescription} description={description} imageId={id || getCurrentId()} closeHandler={closeHandler} /> : ''}
            {isAsked ? <ConfirmDelete deleteHandler={deleteHandler} closeHandler={closeHandler} /> : ''}
            {isLoading ?
                <div className={styles['center-img']} >
                    <LoadingSpinner />
                </div> : ''}
            <div className={styles['image-data']}>
                <div className={styles['image-block']}>
                    <img className={styles['image']} src={image} onClick={imgClickHandler} />
                    <div className={styles['likes-container']}>
                        <p onClick={shareHandler} className={styles['share']}><FaShare /></p>
                        <p className={styles['likes']}>Likes: {likesCount}</p>
                        {user.user && !isOwner && isLiked
                            ? <p onClick={disLikeHandler} className={`${styles['like-button']} ${styles['liked']}`}><FaHeart /></p>
                            : user.user && !isOwner && !isLiked ? <p onClick={likeHandler} className={styles['like-button']}><FaRegHeart /></p>
                                : !user.user || ''}
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
            {isOwner ? <button onClick={openConfirmation} className={`${styles['button']} ${styles['delete-button']}`}>Delete</button> : ''}
            {!id ? <button onClick={decrementPage} className={`${styles['button']} ${styles['page-button']}`} disabled={isPageButtonActive.isDecrementDisabled}>-</button> : ''}
            {!id && <p className={styles['page-counter']}>{parseInt(currentPage) + 1}</p>}
            {!id ? <button onClick={incrementPage} className={`${styles['button']} ${styles['page-button']}`} disabled={isPageButtonActive.isIncrementDisabled}>+</button> : ''}
            {isOwner ? <button onClick={openEdit} className={`${styles['button']} ${styles['edit-button']}`}>Edit</button> : ''}
        </div>
    )
}
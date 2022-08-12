import { useEffect, useState, useContext } from 'react'
import { useParams, useNavigate, useSearchParams, Link } from 'react-router-dom'
import { Gallery } from '../gallery/Gallery'
import { Image } from '../image/Image'
import { LoadingSpinner } from '../loading-spinner/LoadingSpinner'
import { AuthContext } from '../../contexts/AuthContext'
import { UserImagesContext } from '../../contexts/UserImagesContext'
import { useLocalStorage } from '../../hooks/useLocalStorage'
import styles from './Profile.module.css'
import * as userService from '../../services/userService'
import * as pictureOrdering from '../../utils/sortings/pictureOrdering'

export function Profile() {
    const [isLoading, setIsLoading] = useState(true)
    const [displayUser, setDisplayUser] = useState({})
    const [userImages, setUserImages] = useState([])
    const { user } = useContext(AuthContext)
    const { setImages } = useContext(UserImagesContext)
    const { id } = useParams()
    const [order, setOrder] = useLocalStorage('ordering', { type: 'like' })
    const [orderParams, setOrderParams] = useSearchParams()
    const navigate = useNavigate()

    useEffect(() => {
        let orderFromUrl = orderParams.get('order')
        if (!orderFromUrl) {
            orderFromUrl = order.type
        }
        setOrder({ type: orderFromUrl })
        setOrderParams({ order: orderFromUrl }, { replace: true })
        let userId = ''
        if (id !== undefined) {
            userId = id
        } else {
            userId = user.user.id
        }
        userService.getUser(userId).then(data => {
            setDisplayUser(data)
            if (orderFromUrl === 'date') {
                const orderedList = pictureOrdering.orderByDate(data.pictures)
                setUserImages(orderedList)
                setPaginationIndex(orderedList)
            } else if (orderFromUrl === 'description') {
                const orderedList = pictureOrdering.orderByDescription(data.pictures)
                setUserImages(orderedList)
                setPaginationIndex(orderedList)
            } else if (orderFromUrl === 'likes') {
                const orderedList = pictureOrdering.orderByLikes(data.pictures)
                setUserImages(orderedList)
                setPaginationIndex(orderedList)
            }
            setIsLoading(false)
        }).catch(() => navigate('/*'))
    }, [user, id, navigate])

    const orderByDescriptionHandler = () => {
        const sortedList = pictureOrdering.orderByDescription(userImages)
        orderByHandler(sortedList)
        setOrder({ type: 'description' })
    }

    const orderByDateHandler = () => {
        const sortedList = pictureOrdering.orderByDate(userImages)
        orderByHandler(sortedList)
        setOrder({ type: 'date' })
    }

    const orderByLikesHandler = () => {
        const sortedList = pictureOrdering.orderByLikes(userImages)
        orderByHandler(sortedList)
        setOrder({ type: 'likes' })
    }

    const orderByHandler = (sortedList) => {
        setUserImages(sortedList)
        setImages(sortedList)
    }

    const setPaginationIndex = (userImages) => {
        let paginationImages = []

        for (let i = 0; i < userImages.length; i++) {
            paginationImages.push({
                url: userImages[i].url,
                description: userImages[i].description,
                imageId: userImages[i].id,
                userId: id || user.user.id,
                timeCreated: userImages[i].timeCreated,
                likes: userImages[i].likesCount
            })
        }

        if (order === 'date') {
            paginationImages = pictureOrdering.orderByDate(paginationImages)
        } else if (order === 'description') {
            paginationImages = pictureOrdering.orderByDescription(paginationImages)
        } else if (order === 'likes') {
            paginationImages = pictureOrdering.orderByLikes(paginationImages)
        }

        setImages(paginationImages)
    }

    return (
        <div className={styles['container']}>
            {
                isLoading ?
                    <div className={styles['center-img']} >
                        <LoadingSpinner />
                    </div> :
                    userImages.length > 0 ?
                        <>
                            <h1 className={styles['profile-title']}>{displayUser.username}</h1>
                            <ul className={styles['criteria-list']}>
                                <li><h3 className={styles['sort-title']}>Order by:</h3></li>
                                <li><Link onClick={orderByLikesHandler} className={`${styles['criteria']} ${order.type === 'likes' ? styles['active-criteria'] : ''}`} to='?order=likes' replace>Likes</Link></li>
                                <li><Link onClick={orderByDateHandler} className={`${styles['criteria']} ${order.type === 'date' ? styles['active-criteria'] : ''}`} to='?order=date' replace>Date</Link></li>
                                <li><Link onClick={orderByDescriptionHandler} className={`${styles['criteria']} ${order.type === 'description' ? styles['active-criteria'] : ''}`} to='?order=description' replace>Description</Link></li>
                            </ul>
                            <Gallery>{userImages.map(x => <Image key={x.id} src={x.url} content={x.description} />)}</Gallery>
                        </> :
                        <div className={styles['no-images-container']}>
                            <h1 className={styles['profile-title']}>{id ? displayUser.username : 'You'} <span className={styles['no-italics']}>haven't uploaded any images yet</span></h1>
                            <h2 className={styles['home-description']}>You can visit the <Link to='/' className={styles['home-link']}>Home</Link> page to see all images that are available.</h2>
                            {!id && <h2 className={styles['home-description']}>Or you can <Link to='/share' className={styles['home-link']}>share</Link> one from here</h2>}
                        </div>
            }
        </div>
    )
}
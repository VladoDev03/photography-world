import { useEffect, useState, useContext } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { Gallery } from '../gallery/Gallery'
import { Image } from '../image/Image'
import { LoadingSpinner } from '../loading-spinner/LoadingSpinner'
import { AuthContext } from '../../contexts/AuthContext'
import { useLocalStorage } from '../../hooks/useLocalStorage'
import styles from './Profile.module.css'
import * as userServices from '../../services/userServices'
import * as pictureOrdering from '../../utils/sorting/pictureOrdering'

export function Profile() {
    const [isLoading, setIsLoading] = useState(true)
    const [displayUser, setDisplayUser] = useState({})
    const [userImages, setUserImages] = useState([])
    const { user } = useContext(AuthContext)
    const { id } = useParams()
    const [order, setOrder] = useLocalStorage('ordering', { type: 'date' })
    const navigate = useNavigate()

    useEffect(() => {
        let userId = ''
        if (id !== undefined) {
            userId = id
        } else {
            userId = user.user.id
        }
        userServices.getUser(userId).then(data => {
            setDisplayUser(data)
            if (order.type === 'date') {
                setUserImages(pictureOrdering.orderByDate(data.pictures))
            } else if (order.type === 'description') {
                setUserImages(pictureOrdering.orderByDescription(data.pictures))
            }
            setIsLoading(false)
        }).catch(() => navigate("/*"))
    }, [user, id, order, navigate])

    const orderByDescriptionHandler = () => {
        const sortedList = pictureOrdering.orderByDescription(userImages)
        setUserImages(sortedList)
        setOrder({ type: 'description' })
    }

    const orderByDateHandler = () => {
        const sortedList = pictureOrdering.orderByDate(userImages)
        setUserImages(sortedList)
        setOrder({ type: 'date' })
    }

    return (
        <div className={styles['container']}>
            {
                isLoading ?
                    <div className={styles['center-img']} >
                        <LoadingSpinner />
                    </div> :
                    <>
                        <ul className={styles['criteria-list']}>
                            <li><h3 className={styles['sort-title']}>Order by:</h3></li>
                            <li><Link onClick={orderByDateHandler} className={`${styles['criteria']} ${order.type === 'date' ? styles['active-criteria'] : ''}`} to='?order=date' replace>Date</Link></li>
                            <li><Link onClick={orderByDescriptionHandler} className={`${styles['criteria']} ${order.type === 'description' ? styles['active-criteria'] : ''}`} to='?order=description' replace>Description</Link></li>
                        </ul>
                        <h1 className={styles['profile-title']}>{displayUser.username}</h1>
                        <Gallery>{userImages.map(x => <Image key={x.id} id={x.id} src={x.url} content={x.description} />)}</Gallery>
                    </>
            }
        </div>
    )
}
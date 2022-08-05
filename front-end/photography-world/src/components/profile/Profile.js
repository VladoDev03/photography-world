import { useEffect, useState, useContext } from 'react'
import { useParams, useNavigate, createSearchParams } from 'react-router-dom'
import { Gallery } from '../gallery/Gallery'
import { Image } from '../image/Image'
import { AuthContext } from '../../contexts/AuthContext'
import styles from './Profile.module.css'
import * as userServices from '../../services/userServices'

export function Profile() {
    const [displayUser, setDisplayUser] = useState({})
    const [userImages, setUserImages] = useState([])
    const { user } = useContext(AuthContext)
    const { id } = useParams()
    const navigate = useNavigate()

    useEffect(() => {
        if (id !== undefined) {
            userServices.getUser(id).then(data => {
                setDisplayUser(data)
                setUserImages(data.pictures)
            }).catch(() => navigate("/*"))
        } else {
            userServices.getUser(user.user.id).then(data => {
                setDisplayUser(data)
                setUserImages(data.pictures)
            })
        }
    }, [user])

    const orderByDescriptionHandler = () => {
        const sortedList = [...userImages].sort((a, b) => {
            return a.description > b.description ? 1
                : a.description < b.description ? -1
                    : 0
        })

        setUserImages(sortedList)

        navigate({
            pathname: '/profile',
            search: createSearchParams({
                order: 'description',
            }).toString()
        });
    }

    const orderByDateHandler = () => {
        const sortedList = [... userImages].sort((a, b) => {
            const dateA = Date.parse(a.timeCreated)
            const dateB = Date.parse(b.timeCreated)

            return dateA > dateB ? 1
                : dateA < dateB ? -1
                    : 0
        })

        setUserImages(sortedList)

        navigate({
            pathname: '/profile',
            search: createSearchParams({
                order: 'date',
            }).toString()
        });
    }

    return (
        <div>
            <h3 onClick={orderByDateHandler}>Date</h3>
            <h3 onClick={orderByDescriptionHandler}>Description</h3>
            <h1 className={styles['profile-title']}>{displayUser.username}</h1>
            <Gallery>{userImages.map(x => <Image key={x.id} id={x.id} src={x.url} content={x.description} />)}</Gallery>
        </div>
    )
}
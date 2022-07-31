import { useEffect, useState, useContext } from 'react'
import { useParams, userParams } from 'react-router-dom'
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

    useEffect(() => {
        if (id !== undefined) {
            userServices.getUser(id).then(data => {
                setDisplayUser(data)
                setUserImages(data.pictures)
            })
        } else {
            userServices.getUser(user.user.id).then(data => {
                setDisplayUser(data)
                setUserImages(data.pictures)
            })
        }
    }, [user])

    return (
        <div>
            <h1 className={styles['profile-title']}>{displayUser.username}</h1>
            <Gallery>{userImages.map(x => <Image key={x.id} src={x.url} content={x.description} />)}</Gallery>
        </div>
    )
}
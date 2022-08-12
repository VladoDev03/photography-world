import { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { UserImagesContext } from '../../contexts/UserImagesContext'
import styles from './Image.module.css'

export function Image(props) {
    const navigate = useNavigate()
    const { images } = useContext(UserImagesContext)

    const clickHandler = () => {
        let index = 0
        
        for (let i = 0; i < images.length; i++) {
            if (images[i].url === props.src) {
                index = i
            }
        }

        let urlToNavigate

        if (props.id) {
            urlToNavigate = `../image/${props.id}`
        } else {
            urlToNavigate = `../image?page=${index}`
        }
        
        navigate(urlToNavigate)
    }

    return (
        <div onClick={clickHandler} className={styles['img-wrapper']}>
            <img className={`${styles['blur']} ${styles['zoom']}`} src={props.src}></img>
            <div className={`${styles['content']} ${styles['fade']}`}>{props.content}</div>
        </div>
    )
}
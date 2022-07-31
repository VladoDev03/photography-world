import { useNavigate } from 'react-router-dom'
import styles from './Image.module.css'

export function Image(props) {
    const navigate = useNavigate()

    const clickHandler = () => {
        navigate(`../image/${props.id}`)
    }

    return (
        <div onClick={clickHandler} className={styles['img-wrapper']}>
            <img className={`${styles['blur']} ${styles['zoom']}`} src={props.src}></img>
            <div className={`${styles['content']} ${styles['fade']}`}>{props.content}</div>
        </div>
    )
}
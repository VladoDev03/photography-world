import styles from './Image.module.css'

export function Image(props) {
    return (
        <div className={styles['img-wrapper']}>
            <img className={`${styles['blur']} ${styles['zoom']}`} src={props.src}></img>
            <div className={`${styles['content']} ${styles['fade']}`}>{props.content}</div>
        </div>
    )
}
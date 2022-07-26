import styles from './Gallery.module.css'

export function Gallery(props) {
    return (
        <div className={styles['gallery']}>
            <div className={styles['grid']}>
                {props.children}
            </div>
        </div>
    )
}
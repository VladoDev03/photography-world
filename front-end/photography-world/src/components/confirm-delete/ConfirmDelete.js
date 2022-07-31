import styles from './ConfirmDelete.module.css'

export function ConfirmDelete() {
    return (
        <div className={styles['modal-container']}>
            <div className={styles['modal']}>
                <h3 className={styles['modal-title']}>Delete?</h3>
                <p className={`${styles['description']} ${styles['description-main']}`}>Are you sure that you want to delete this image?</p>
                <p className={`${styles['description']} ${styles['description-secondary']}`}>If yes, you must be aware that it is going to be permanent and it cannot be undone!</p>
                <button className={`${styles['answer-button']} ${styles['no-button']}`}>no</button>
                <button className={`${styles['answer-button']} ${styles['yes-button']}`}>yes</button>
            </div>
        </div>
    )
}
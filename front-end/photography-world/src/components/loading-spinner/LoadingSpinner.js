import styles from './LoadingSpinner.module.css'

export function LoadingSpinner() {
    return (
        <div className={styles['spinner']}>
            <div className={styles['heading']}>Loading</div>
            <div className={`${styles['spinner-sector']} ${styles['spinner-sector-green']}`}></div>
            <div className={`${styles['spinner-sector']} ${styles['spinner-sector-blue']}`}></div>
            <div className={`${styles['spinner-sector']} ${styles['spinner-sector-cyan']}`}></div>
        </div>
    )
}
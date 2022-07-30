import { Link } from 'react-router-dom'
import styles from './NotFound.module.css'

export function NotFound() {
    return (
        <div className={styles['error-container']}>
            <h1 className={styles['error']}>404 Not Found</h1>
            <h3 className={styles['error-description']}>Sorry, we couldn't find the page you were looking for.</h3>
            <Link className={styles['home-page-url']} to="/">Return to home page</Link>
        </div>
    )
}
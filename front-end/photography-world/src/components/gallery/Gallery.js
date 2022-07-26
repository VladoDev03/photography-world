import styles from './Gallery.module.css'
import * as imageService from '../../services/imageService'
import { useState, useEffect } from 'react'
import { Image } from '../image/Image'

export function Gallery(props) {
    const [images, setImages] = useState([])

    useEffect(() => {
        imageService.getImages().then(data => setImages(data))
    }, [])

    return (
        <div className={styles['gallery']}>
            <div className={styles['grid']}>
                {props.children}
                {images.map(x => <Image key={x.id} src={x.url} content={x.description} />)}
            </div>
        </div>
    )
}
import { useState, useEffect } from 'react'
import { Gallery } from "../gallery/Gallery";
import { Image } from '../image/Image';
import * as imageService from '../../services/imageService'
import styles from './Home.module.css'

export function Home() {
    const [images, setImages] = useState([])

    useEffect(() => {
        imageService.getImages().then(data => setImages(data))
    }, [])

    return (
        <div className={styles['home']}>
            <h1>Photography World</h1>
            <Gallery>
                {images.map(x => <Image key={x.id} src={x.url} content={x.description} />)}
            </Gallery>
        </div>
    )
}
import { useState, useEffect } from 'react'
import { Gallery } from "../gallery/Gallery";
import { Image } from '../image/Image';
import { LoadingSpinner } from '../loading-spinner/LoadingSpinner'
import * as imageService from '../../services/imageService'
import styles from './Home.module.css'

export function Home() {
    const [images, setImages] = useState([])
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        imageService.getImages().then(data => {
            setImages(data)
            setIsLoading(false)
        })
    }, [])

    return (
        <div className={styles['home']}>
            {
                isLoading ?
                    <div className={styles['center-img']} >
                        <LoadingSpinner />
                    </div> :
                    <>
                        <h1 className={styles['home-title']}>Photography World</h1>
                        <Gallery>
                            {images.map(x => <Image key={x.id} id={x.id} src={x.url} content={x.description} />)}
                        </Gallery>
                    </>
            }
        </div>
    )
}
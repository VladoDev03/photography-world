import { Link } from 'react-router-dom'
import styles from './AddImageForm.module.css'

export function AddImageForm({submitHandler, descriptionHandler, pictureHandler, description, isChosen}) {
    return (
        <form onSubmit={submitHandler} method="post">
            <div className='text-field'>
                <input id="comment" type="text" name="comment" value={description} onChange={descriptionHandler} required />
                <label htmlFor="comment">Comment</label>
            </div>

            <div>
                <label className={styles['image']} htmlFor="picture">{!isChosen ? 'Select' : 'Change'} Image</label>
                <input id="picture" type="file" name="picture" accept="image/*" onChange={pictureHandler} required />
            </div>

            <input className='submit' type="submit" value='Share' />
            <div className='signup-link'>
                Not sure what to upload? <Link to="/images">My Images</Link>
            </div>
        </form>
    )
}
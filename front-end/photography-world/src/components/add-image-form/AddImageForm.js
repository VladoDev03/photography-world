import { Link } from 'react-router-dom'
import styles from './AddImageForm.module.css'
import * as pictureValidation from '../../utils/validations/pictureValidation'

export function AddImageForm({submitHandler, descriptionHandler, pictureHandler, description, isChosen, isDisabled, setErrors}) {
    const descriptionValidate = e => {
        const err = pictureValidation.validateDescription(e.target.value)
        setErrors(oldErrors => ({
            ...oldErrors,
            ['descriptionLength']: !err.descriptionLength
        }))
    }
    
    return (
        <form onSubmit={submitHandler} method="post">
            <div className='text-field'>
                <input id="comment" type="text" name="comment" value={description} onChange={descriptionHandler} onBlur={descriptionValidate} required />
                <label htmlFor="comment">Comment</label>
                <span className="blue-underline"></span>
            </div>
            <div>
                <label className={styles['image']} htmlFor="picture">{!isChosen ? 'Select' : 'Change'} Image</label>
                <input id="picture" type="file" name="picture" accept="image/*" onChange={pictureHandler} required />
            </div>
            <input className='submit' type="submit" value='Share' disabled={isDisabled} />
            <div className='signup-link'>
                Not sure what to upload? <Link to="/profile">My Images</Link>
            </div>
        </form>
    )
}
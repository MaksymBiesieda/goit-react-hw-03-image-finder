
import PropTypes from 'prop-types';
import css from './ImageGalleryItem.module.css';

export default function ImageGalleryItem({id, webformatURL, largeImageURL}) {
        return (<li className={css.ImageGalleryItem}>
            <img src={webformatURL} className={css.ImageGalleryItem_image} alt="" />
                </li>
        )
}

ImageGalleryItem.propTypes = {
    id: PropTypes.number,
    webformatURL: PropTypes.string,
    largeImageURL: PropTypes.string,
}

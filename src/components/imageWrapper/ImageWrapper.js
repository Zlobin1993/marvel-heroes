import ErrorMessage from '../errorMessage/ErrorMessage';

import './imageWrapper.scss';

const ImageWrapper = ({ imageSource = null, imageAlt = null, className = '' }) => {
  return (
    <div className={'image-wrapper'.split(' ').concat((String(className)).split(' ')).join(' ')}>
      {
        imageSource
          ? <img className="image-wrapper__image"
            src={imageSource}
            alt={imageAlt}
          />
          : <div className='image-wrapper__error-container'>
            <ErrorMessage message="Image not found." />
          </div>
      }
    </div>
  );
}

export default ImageWrapper;

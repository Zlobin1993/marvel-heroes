import ImageWrapper from '../imageWrapper/ImageWrapper';
import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';

import './randomCharacter.scss';

const RandomCharacterView = ({ character, error, isLoading }) => {
  const { name, description, thumbnail, linkHomepage, linkWiki } = character;

  const content = (
    <>
      <ImageWrapper imageSource={thumbnail} imageAlt={name} className='random-character__image-wrapper' />

      <div className="random-character__content">
        <p className="random-character__name">{name}</p>
        <p className="random-character__description">{description ? description.length > 200 ? (description.slice(0, 200) + '...') : description : 'Character information not found.'}</p>
      </div>

      <div className="random-character__button-list">
        <a className="button random-character__button"
          href={linkHomepage}
          target="_blank"
          rel="noreferrer">Homepage</a>

        <a className="button button__secondary"
          href={linkWiki}
          target="_blank"
          rel="noreferrer">Wiki</a>
      </div>
    </>
  );

  return (
    <div className="random-character">
      {isLoading && <Spinner />}
      {error && <ErrorMessage message='Failed to load random character.' />}
      {!(isLoading || error) && content}
    </div>
  )
}

export default RandomCharacterView;

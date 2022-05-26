import { useState, useEffect } from 'react';

import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';
import Skeleton from '../skeleton/Skeleton';

import useMarvelService from '../../services/MarvelService';

import './characterInfo.scss';

const CharacterInfo = ({ characterId }) => {
  const { isLoading, error, clearError, getCharacter } = useMarvelService();
  const [character, setCharacter] = useState(null);

  useEffect(() => {
    updateCharacter();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [characterId])

  const onCharacterLoaded = character => {
    setCharacter(character);
  }

  const updateCharacter = () => {
    if (!characterId) return;

    clearError();

    getCharacter(characterId)
      .then(onCharacterLoaded)
  }

  const skeleton = !(character || isLoading || error) && (
    <>
      <p className="character-info__initial-message">Please select a character to see information.</p>
      <Skeleton />
    </>
  ),
    errorMessage = error && <ErrorMessage message='Failed to load character info.' />,
    spinner = isLoading && <Spinner />,
    content = (!(isLoading || error) && character) && <CharacterView character={character} />;

  return (
    <div className="character-info">
      <div className="character-info__block">
        {skeleton}
        {spinner}
        {errorMessage}
        {content}
      </div>
    </div>
  );
}

const CharacterView = ({ character }) => {
  const { name, description, thumbnail, linkHomepage, linkWiki, comicsList } = character;

  return (
    <>
      <div className="character-info__basics">
        <CharacterThumbnail thumbnailSrc={thumbnail} thumbnailAlt={name} />

        <div>
          <div className="character-info__name">{name}</div>

          <div className="character-info__button-list">
            <a className="button character-info__button"
              href={linkHomepage}
              target="_blank"
              rel="noreferrer">Homepage</a>

            <a className="button button--secondary character-info__button"
              href={linkWiki}
              target="_blank"
              rel="noreferrer">Wiki</a>
          </div>
        </div>
      </div>

      <div className="character-info__description">{description}</div>
      <ComicsList comicsList={comicsList} />
    </>
  );
}

// TODO: Divide to another file.
const CharacterThumbnail = ({ thumbnailSrc, thumbnailAlt }) => {
  return thumbnailSrc
    ? <img className='character-info__image'
      src={thumbnailSrc}
      alt={thumbnailAlt} />
    : <div className='character-info__image character-info__image--no-image'>
      <ErrorMessage message="Image not found." />
    </div>;
}

// TODO: Divide to another file.
const ComicsList = ({ comicsList }) => {
  return comicsList.length > 0
    ? (
      <>
        <h3 className="character-info__title">Comics:</h3>

        <ul className="character-info__comic-list">
          {comicsList.map((comic, index) => {
            return (
              <li className="character-info__comic"
                key={index}>
                {comic.name}
              </li>
            )
          })}
        </ul>
      </>
    )
    : (
      <h3 className="character-info__title">There is no comics with this character.</h3>
    );
}

export default CharacterInfo;

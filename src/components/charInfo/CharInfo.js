import { useState, useEffect } from 'react';

import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';
import Skeleton from '../skeleton/Skeleton';

import MarvelService from '../../services/MarvelService';

import './charInfo.scss';

const CharInfo = ({ characterId }) => {
  const [character, setCharacter] = useState(null),
    [isLoading, setIsLoading] = useState(false),
    [isError, setIsError] = useState(false);

  const marvelService = new MarvelService();

  useEffect(() => {
    updateCharacter();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [characterId])

  const onCharacterLoading = () => {
    setIsLoading(true);
    setIsError(false);
  }

  const onCharacterLoaded = character => {
    setCharacter(character);
    setIsLoading(false);
  }

  const onError = () => {
    setIsLoading(false);
    setIsError(true);
  }

  const updateCharacter = () => {
    if (!characterId) return;

    onCharacterLoading();

    marvelService
      .getCharacter(characterId)
      .then(onCharacterLoaded)
      .catch(onError);
  }

  const skeleton = !(character || isLoading || isError) && <Skeleton />;
  const errorMessage = isError && <ErrorMessage message='Failed to load character info.' />;
  const spinner = isLoading && <Spinner />;
  const content = (!(isLoading || isError) && character) && <CharacterView character={character} />;

  return (
    <div className="character__info">
      {skeleton}
      {spinner}
      {errorMessage}
      {content}
    </div>
  );
}

const CharacterView = ({ character }) => {
  const { name, description, thumbnail, linkHomepage, linkWiki, comicsList } = character;

  return (
    <>
      <div className="character__basics">
        <CharacterThumbnail thumbnailSrc={thumbnail} thumbnailAlt={name} />

        <div>
          <div className="character__info-name">{name}</div>

          <div className="character__btns">
            <a className="button"
              href={linkHomepage}
              target="_blank"
              rel="noreferrer">Homepage</a>

            <a className="button button__secondary"
              href={linkWiki}
              target="_blank"
              rel="noreferrer">Wiki</a>
          </div>
        </div>
      </div>

      <div className="character__descr">{description}</div>
      <ComicsList comicsList={comicsList} />
    </>
  );
}

// TODO: Divide to another file.
const CharacterThumbnail = ({ thumbnailSrc, thumbnailAlt }) => {
  const isNoThumbnail = thumbnailSrc.indexOf('image_not_available.') > -1;

  if (isNoThumbnail) {
    return (
      <div className='character__image character__image--small character__image--no-image'>
        <ErrorMessage message="Image not found." />
      </div>
    );
  } else {
    return (
      <img className='character__image character__image--small'
        src={thumbnailSrc}
        alt={thumbnailAlt} />
    );
  }
}

// TODO: Divide to another file.
const ComicsList = ({ comicsList }) => {
  if (comicsList.length > 0) {
    return (
      <>
        <h3 className="character__comics">Comics:</h3>

        <ul className="character__comics-list">
          {comicsList.map((comicsItem, index) => {
            return (
              <li className="character__comics-item"
                key={index}>
                {comicsItem.name}
              </li>
            )
          })}
        </ul>
      </>
    );
  } else {
    return (
      <h3 className="character__comics">There is no comics with this character.</h3>
    );
  }
}

export default CharInfo;

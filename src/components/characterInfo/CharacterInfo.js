import { useState, useEffect } from 'react';

import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';
import Skeleton from '../skeleton/Skeleton';
import ImageWrapper from '../imageWrapper/ImageWrapper';
import CharacterComicList from '../characterComicList/CharacterComicList';

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

  const skeleton = (
    <>
      <p className="character-info__initial-message">Please select a character to see information.</p>
      <Skeleton />
    </>
  );

  const content = <CharacterView character={character} />;

  return (
    <div className="character-info character__info">
      <div className="character-info__block">
        {!(character || isLoading || error) && skeleton}
        {isLoading && <Spinner />}
        {error && <ErrorMessage message='Failed to load character info.' />}
        {(!(isLoading || error) && character) && content}
      </div>
    </div>
  );
}

const CharacterView = ({ character }) => {
  const { name, description, thumbnail, linkHomepage, linkWiki, comicList } = character;

  return (
    <>
      <div className="character-info__basics">
        <ImageWrapper imageSource={thumbnail} imageAlt={name} className='character-info__image' />

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
      <CharacterComicList comicList={comicList} />
    </>
  );
}

export default CharacterInfo;

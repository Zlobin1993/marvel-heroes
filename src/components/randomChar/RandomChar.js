import { useState, useEffect } from 'react';

import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';

import useMarvelService from '../../services/MarvelService';

import './randomChar.scss';
import mjolnir from '../../resources/img/mjolnir.png';

const RandomChar = () => {
  const { isLoading, error, clearError, getCharacter } = useMarvelService();
  const [character, setCharacter] = useState({});

  useEffect(() => {
    updateCharacter();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const onCharacterLoaded = character => {
    setCharacter(character);
  }

  const updateCharacter = () => {
    clearError();

    const id = Math.floor(Math.random() * (1011400 - 1011000) + 1011000); // TODO: Check min and max ids.

    getCharacter(id)
      .then(onCharacterLoaded)
  }

  const errorMessage = error && <ErrorMessage message='Failed to load random character.' />;
  const spinner = isLoading && <Spinner />;
  const content = !(isLoading || error) && <RandomCharacterView character={character} />;

  return (
    <div className="random-character">
      <div className="random-character__block">
        {spinner}
        {errorMessage}
        {content}
      </div>

      <div className="random-character__static">
        <p className="random-character__title">
          Random character for today!
          <br />
          Do you want to get to know him better?
        </p>

        <p className="random-character__title">Or choose another one</p>

        <button className="button"
          onClick={updateCharacter}>
          Try it
        </button>

        <img src={mjolnir} alt="mjolnir" className="random-character__decoration" />
      </div>
    </div >
  );
}

// TODO: Divide to another file.
const RandomCharacterView = ({ character }) => {
  const { name, description, thumbnail, linkHomepage, linkWiki } = character;

  return (
    <>
      <RandomCharacterThumbnail thumbnailSrc={thumbnail} thumbnailAlt={name} />

      <div className="random-character__info">
        <p className="random-character__name">{name}</p>
        <p className="random-character__descr">{description ? description.length > 200 ? (description.slice(0, 200) + '...') : description : 'Character information not found.'}</p>

        <div className="random-character__btns">
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
    </>
  )
}

// TODO: Divide to another file.
const RandomCharacterThumbnail = ({ thumbnailSrc, thumbnailAlt }) => {
  return thumbnailSrc
    ? <img className="random-character__img"
      src={thumbnailSrc}
      alt={thumbnailAlt}
    />
    : <div className='random-character__img random-character__img--no-image'>
      <ErrorMessage message="Image not found." />
    </div>;
}

export default RandomChar;

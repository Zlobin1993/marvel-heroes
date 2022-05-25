import { useState, useEffect } from 'react';

import RandomCharacter from '../randomCharacter/RandomCharacter';
import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';

import useMarvelService from '../../services/MarvelService';

import './randomCharacterWrapper.scss';
import mjolnir from '../../resources/img/mjolnir.png';

const RandomCharacterWrapper = () => {
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
  const content = !(isLoading || error) && <RandomCharacter character={character} />;

  return (
    <div className="random-character-wrapper">
      <div className="random-character">
        {spinner}
        {errorMessage}
        {content}
      </div>

      <div className="random-character-wrapper__static-side">
        <img src={mjolnir} alt="mjolnir" className="random-character-wrapper__decoration" />

        <p className="random-character-wrapper__title">
          Random character for today!
          <br />
          Do you want to get to know him better?
        </p>

        <p className="random-character-wrapper__title">Or choose another one</p>

        <button className="button random-character-wrapper__button"
          onClick={updateCharacter}>
          Try it
        </button>
      </div>
    </div >
  );
}

export default RandomCharacterWrapper;

import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';

import Spinner from '../../components/spinner/Spinner';
import ErrorMessage from '../../components/errorMessage/ErrorMessage';

import useMarvelService from '../../services/MarvelService';

import './singleCharacterPage.scss';

const SingleCharacterPage = () => {
  const [character, setCharacter] = useState(null);
  const { characterName } = useParams();
  const { isLoading, error, clearError, getCharacterByName } = useMarvelService();

  useEffect(() => {
    updateCharacter();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [characterName])

  const onCharacterLoaded = character => {
    setCharacter(character);
  }

  const updateCharacter = () => {
    clearError();

    getCharacterByName(characterName)
      .then(onCharacterLoaded)
  }

  const errorMessage = error && <ErrorMessage message='Failed to load character info.' />,
    spinner = isLoading && <Spinner />,
    content = (!(isLoading || error) && character) && <CharacterView character={character} />;

  return (
    <>
      {spinner}
      {errorMessage}
      {content}
    </>
  );
}

const CharacterView = ({ character }) => {
  const { name, description, thumbnail } = character;

  return (
    <div className="single-comic">
      <img src={thumbnail} alt={name} className="single-comic__img" />

      <div className="single-comic__info">
        <h2 className="single-comic__name">{name}</h2>
        <p className="single-comic__descr">{description}</p>
      </div>

      <Link to="/" className="single-comic__back">Back to homepge</Link>
    </div>
  );
}

export default SingleCharacterPage;

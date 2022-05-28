// import { useState, useEffect } from 'react';

// import Spinner from '../spinner/Spinner';
// import ErrorMessage from '../errorMessage/ErrorMessage';

// import useMarvelService from '../../services/MarvelService';

import './characterSearchForm.scss';

const CharacterSearchForm = () => {
  // const { isLoading, error, clearError, getCharacter } = useMarvelService();
  // const [character, setCharacter] = useState(null);

  // useEffect(() => {
  //   updateCharacter();

  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [characterId])

  // const onCharacterLoaded = character => {
  //   setCharacter(character);
  // }

  // const updateCharacter = () => {
  //   if (!characterId) return;

  //   clearError();

  //   getCharacter(characterId)
  //     .then(onCharacterLoaded)
  // }

  return (
    <div className="character-search-form character-info__search-form">
      <form className='character-search-form__form'>
        <label className='character-search-form__label'>Find character direct page by name:</label>

        <div className='character-search-form__wrapper'>
          <input className='character-search-form__input' type="text" required placeholder='Enter name' />
          <button type='submit' className='button character-search-form__button'>Find</button>
        </div>
      </form>

      {/* <div className="character-info__block">
        {!(character || isLoading || error) && skeleton}
        {isLoading && <Spinner />}
        {error && <ErrorMessage message='Failed to load character info.' />}
        {(!(isLoading || error) && character) && content}
      </div> */}
    </div>
  );
}

export default CharacterSearchForm;

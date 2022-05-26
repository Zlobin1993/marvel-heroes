import { useState, useEffect, useRef } from 'react';

import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';

import useMarvelService from '../../services/MarvelService';

import './charList.scss';

const CharList = ({ onCharacterSelected }) => {
  const _additionalCharacterOffsetStep = 9;
  const { isLoading, error, getAllCharacters } = useMarvelService();

  const [characterList, setCharacterList] = useState([]),
    [isAdditionalCharactersLoading, setIsAdditionalCharactersLoading] = useState(false),
    [additionalCharacterOffset, setAdditionalCharacterOffset] = useState(0),
    [isCharacterListEnded, setIsCharacterListEnded] = useState(false);

  useEffect(() => {
    onRequest(additionalCharacterOffset, true);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onCharacterListLoaded = (additionalCharacterList) => {
    setCharacterList(characterList => [...characterList, ...additionalCharacterList]);
    setIsAdditionalCharactersLoading(false);
    setAdditionalCharacterOffset(additionalCharacterOffset => additionalCharacterOffset + _additionalCharacterOffsetStep);
    setIsCharacterListEnded(additionalCharacterList.length < _additionalCharacterOffsetStep ? true : false);
  }

  const onRequest = (additionalCharacterOffset, isInitialRequest = false) => {
    setIsAdditionalCharactersLoading(!isInitialRequest);

    getAllCharacters(additionalCharacterOffset, _additionalCharacterOffsetStep)
      .then(onCharacterListLoaded)
  };

  const itemRefs = useRef([]);

  const focusOnItem = index => {
    itemRefs.current.forEach(item => item.classList.remove('character__item--selected'));
    itemRefs.current[index].classList.add('character__item--selected');
    itemRefs.current[index].focus();
  }

  const renderedCharacterList = characterList.length === 0 ? null : (
    <>
      <ul className="character__grid">
        {
          characterList.map(({ id, name, thumbnail }, index) => {
            return (
              <li className="character__item"
                key={id}
                tabIndex={0}
                ref={element => itemRefs.current[index] = element}
                onClick={() => {
                  onCharacterSelected(id);
                  focusOnItem(index);
                }}>
                <CharacterThumbnail thumbnailSrc={thumbnail} thumbnailAlt={name} />
                <p className="character__name">{name}</p>
              </li>
            )
          })
        }
      </ul>

      {
        !isCharacterListEnded && (
          <button className="button button--long"
            disabled={isAdditionalCharactersLoading}
            onClick={() => onRequest(additionalCharacterOffset, false)}
          >
            {isAdditionalCharactersLoading ? <Spinner type='white' size='small' /> : 'Load More'}
          </button>
        )
      }
    </>
  );

  const spinner = (isLoading && !isAdditionalCharactersLoading) && <Spinner />,
    errorMessage = error && <ErrorMessage message='Failed to load characters list.' />;

  return (
    <div className="character__list">
      {spinner}
      {errorMessage}
      {renderedCharacterList}
    </div>
  );
}

// TODO: Divide to another file.
const CharacterThumbnail = ({ thumbnailSrc, thumbnailAlt }) => {
  return thumbnailSrc
    ? <img className='character__image'
      src={thumbnailSrc}
      alt={thumbnailAlt} />
    : <div className='character__image character__image--no-image'>
      <ErrorMessage message="Image not found." />
    </div>;
}

export default CharList;

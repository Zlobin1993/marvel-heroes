import { useState, useEffect, useRef } from 'react';

import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';

import MarvelService from '../../services/MarvelService';

import './charList.scss';

const CharList = ({ onCharacterSelected }) => {
  const _additionalCharacterOffsetStep = 9;

  const [characterList, setCharacterList] = useState([]),
    [isLoading, setIsLoading] = useState(true),
    [isError, setIsError] = useState(false),
    [isAdditionalCharactersLoading, setIsAdditionalCharactersLoading] = useState(false),
    [additionalCharacterOffset, setAdditionalCharacterOffset] = useState(0),
    [isCharacterListEnded, setIsCharacterListEnded] = useState(false);

  const marvelService = new MarvelService();

  useEffect(() => {
    onRequest();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onCharacterListLoaded = (additionalCharacterList) => {
    setCharacterList(characterList => [...characterList, ...additionalCharacterList]);
    setIsLoading(false);
    setIsAdditionalCharactersLoading(false);
    setAdditionalCharacterOffset(additionalCharacterOffset => additionalCharacterOffset + _additionalCharacterOffsetStep);
    setIsCharacterListEnded(additionalCharacterList.length < _additionalCharacterOffsetStep ? true : false);
  }

  const onError = () => {
    setIsLoading(false);
    setIsError(true);
  }

  const onRequest = additionalCharacterOffset => {
    onAdditionalCharactersLoading();

    marvelService
      .getAllCharacters(additionalCharacterOffset, _additionalCharacterOffsetStep)
      .then(onCharacterListLoaded)
      .catch(onError);
  };

  const onAdditionalCharactersLoading = () => {
    setIsAdditionalCharactersLoading(true);
  }

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
          <button className="button button__long"
            disabled={isAdditionalCharactersLoading}
            onClick={() => onRequest(additionalCharacterOffset)}
          >
            {isAdditionalCharactersLoading ? <Spinner type='white' size='small' /> : 'Load More'}
          </button>
        )
      }
    </>
  );

  const spinner = isLoading && <Spinner />;
  const errorMessage = isError && <ErrorMessage message='Failed to load random character.' />;
  const content = !(isLoading || isError) && renderedCharacterList;

  return (
    <div className="character__list">
      {spinner}
      {errorMessage}
      {content}
    </div>
  );
}

// TODO: Divide to another file.
const CharacterThumbnail = ({ thumbnailSrc, thumbnailAlt }) => {
  const isNoThumbnail = thumbnailSrc.indexOf('image_not_available.') > -1;

  if (isNoThumbnail) {
    return (
      <div className='character__image character__image--no-image'>
        <ErrorMessage message="Image not found." />
      </div>
    );
  } else {
    return (
      <img className='character__image'
        src={thumbnailSrc}
        alt={thumbnailAlt} />
    );
  }
}

export default CharList;

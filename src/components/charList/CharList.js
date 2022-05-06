import { Component } from 'react';

import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';

import MarvelService from '../../services/MarvelService';

import './charList.scss';

class CharList extends Component {
  state = {
    characterList: [],
    isLoading: true,
    isError: false,
    isAdditionalCharactersLoading: false,
    additionalCharacherOffset: 1600,
    isCharacterListEnded: false,
  }

  marvelService = new MarvelService();

  componentDidMount() {
    this.onRequest();
  }

  onCharacterListLoaded = additionalCharacterList => {
    this.setState(({ characterList, additionalCharacherOffset, isCharacterListEnded }) => ({
      characterList: [...characterList, ...additionalCharacterList],
      isLoading: false,
      isAdditionalCharactersLoading: false,
      additionalCharacherOffset: additionalCharacherOffset + 9,
      isCharacterListEnded: additionalCharacterList.length < 9 ? true : false,
    }));
  }

  onError = () => {
    this.setState({
      isLoading: false,
      isError: true,
    });
  }

  onRequest = additionalCharacherOffset => {
    this.onAdditionalCharactersLoading();

    this.marvelService
      .getAllCharacters(additionalCharacherOffset)
      .then(this.onCharacterListLoaded)
      .catch(this.onError);
  }

  onAdditionalCharactersLoading = () => {
    this.setState({
      isAdditionalCharactersLoading: true,
    })
  }

  render() {
    const { characterList, isLoading, isError, isAdditionalCharactersLoading, additionalCharacherOffset, isCharacterListEnded } = this.state;
    const { onCharacterSelected } = this.props;

    const renderedCharacterList = characterList.length === 0 ? null : (
      <>
        <ul className="character__grid">
          {
            characterList.map(({ id, name, thumbnail }) => {
              return (
                <li className="character__item"
                  key={id}
                  onClick={() => onCharacterSelected(id)}>
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
              onClick={() => this.onRequest(additionalCharacherOffset)}
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

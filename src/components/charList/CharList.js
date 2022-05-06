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
  }

  marvelService = new MarvelService();

  componentDidMount() {
    this.onCharacterListLoading();
    this.onRequest();
  }

  onCharacterListLoading = () => {
    this.setState({
      isLoading: true,
      isError: false,
    })
  }

  onCharacterListLoaded = additionalCharacterList => {
    this.setState(({ characterList }) => ({
      characterList: [...characterList, ...additionalCharacterList],
      isLoading: false,
      isAdditionalCharactersLoading: false,
    }));
  }

  onError = () => {
    this.setState({
      isLoading: false,
      isError: true,
    });
  }

  onRequest = offset => {
    this.onAdditionalCharactersLoading();

    this.marvelService
      .getAllCharacters(offset)
      .then(this.onCharacterListLoaded)
      .catch(this.onError);
  }

  onAdditionalCharactersLoading = () => {
    this.setState({
      isAdditionalCharactersLoading: true,
    })
  }

  renderCharacters(characterList) {
    if (characterList.length === 0) return;

    const { onCharacterSelected } = this.props;

    const characterListItems = characterList.map(({ id, name, thumbnail }) => {
      return (
        <li className="character__item"
          key={id}
          onClick={() => onCharacterSelected(id)}>
          <CharacterThumbnail thumbnailSrc={thumbnail} thumbnailAlt={name} />
          <div className="character__name">{name}</div>
        </li>
      )
    })

    return (
      <>
        <ul className="character__grid">
          {characterListItems}
        </ul>

        <button className="button button__long">Load More</button>
      </>
    );
  }

  render() {
    const { characterList, isLoading, isError } = this.state;

    const renderedCharacterList = this.renderCharacters(characterList);

    const errorMessage = isError && <ErrorMessage message='Failed to load random character.' />;
    const spinner = isLoading && <Spinner />;
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

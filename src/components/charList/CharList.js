import { Component } from 'react';

import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';

import MarvelService from '../../services/MarvelService';

import './charList.scss';

class CharList extends Component {
  state = {
    characterList: {},
    isLoading: true,
    isError: false,
  }

  marvelService = new MarvelService();

  componentDidMount() {
    this.loadCharacterList();
  }

  onCharacterListLoaded = characterList => {
    this.setState({
      characterList,
      isLoading: false,
    });
  }

  onError = () => {
    this.setState({
      isLoading: false,
      isError: true,
    });
  }

  loadCharacterList = () => {
    this.setState({
      isLoading: true,
      isError: false,
    })

    this.marvelService
      .getAllCharacters()
      .then(this.onCharacterListLoaded)
      .catch(this.onError)
  }

  render() {
    const { characterList, isLoading, isError } = this.state;
    const errorMessage = isError && <ErrorMessage message='Failed to load random character.' />;
    const spinner = isLoading && <Spinner />;
    const content = !(isLoading || isError) && <CharacterListItem characterList={characterList} />;

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
const CharacterListItem = ({ characterList }) => {
  if (characterList.length === 0) return;

  console.log(characterList);

  const characterListItems = characterList.map(({ id, name, thumbnail }) => {
    return (
      <li className="character__item"
        key={id}>
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

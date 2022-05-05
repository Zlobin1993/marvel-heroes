import { Component } from 'react';

import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';
import Skeleton from '../skeleton/Skeleton';

import MarvelService from '../../services/MarvelService';

import './charInfo.scss';

class CharInfo extends Component {
  state = {
    character: null,
    isLoading: false,
    isError: false,
  }

  marvelService = new MarvelService();

  componentDidMount() {
    this.updateCharacter();
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.props.characterId !== prevProps.characterId) {
      this.updateCharacter();
    }
  }

  onCharacterLoading = () => {
    this.setState({
      isLoading: true,
      isError: false,
    })
  }

  onCharacterLoaded = character => {
    this.setState({
      character,
      isLoading: false,
    });
  }

  onError = () => {
    this.setState({
      isLoading: false,
      isError: true,
    });
  }

  updateCharacter = () => {
    const { characterId } = this.props;

    if (!characterId) return;

    this.onCharacterLoading();

    this.marvelService
      .getCharacter(characterId)
      .then(this.onCharacterLoaded)
      .catch(this.onError);
  }

  render() {
    const { character, isLoading, isError } = this.state;

    const skeleton = !(character || isLoading || isError) && <Skeleton />;
    const errorMessage = isError && <ErrorMessage message='Failed to load character info.' />;
    const spinner = isLoading && <Spinner />;
    const content = (!(isLoading || isError) && character) && <CharacterView character={character} />;

    return (
      <div className="character__info">
        {skeleton}
        {spinner}
        {errorMessage}
        {content}
      </div>
    );
  }
}

const CharacterView = ({ character }) => {
  const { name, description, thumbnail, linkHomepage, linkWiki, comicsList } = character;

  return (
    <>
      <div className="character__basics">
        <CharacterThumbnail thumbnailSrc={thumbnail} thumbnailAlt={name} />

        <div>
          <div className="character__info-name">{name}</div>

          <div className="character__btns">
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
      </div>

      <div className="character__descr">{description}</div>
      <ComicsList comicsList={comicsList} />
    </>
  );
}

// TODO: Divide to another file.
const CharacterThumbnail = ({ thumbnailSrc, thumbnailAlt }) => {
  const isNoThumbnail = thumbnailSrc.indexOf('image_not_available.') > -1;

  if (isNoThumbnail) {
    return (
      <div className='character__image character__image--small character__image--no-image'>
        <ErrorMessage message="Image not found." />
      </div>
    );
  } else {
    return (
      <img className='character__image character__image--small'
        src={thumbnailSrc}
        alt={thumbnailAlt} />
    );
  }
}

// TODO: Divide to another file.
const ComicsList = ({ comicsList }) => {
  if (comicsList.length > 0) {
    return (
      <>
        <h3 className="character__comics">Comics:</h3>

        <ul className="character__comics-list">
          {comicsList.map((comicsItem, index) => {
            return (
              <li className="character__comics-item"
                key={index}>
                {comicsItem.name}
              </li>
            )
          })}
        </ul>
      </>
    );
  } else {
    return (
      <h3 className="character__comics">There is no comics with this character.</h3>
    );
  }
}

export default CharInfo;

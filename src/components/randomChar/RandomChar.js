import { Component } from 'react';

import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';

import MarvelService from '../../services/MarvelService';

import './randomChar.scss';
import mjolnir from '../../resources/img/mjolnir.png';

class RandomChar extends Component {
  state = {
    character: {},
    isLoading: true,
    isError: false,
  }

  marvelService = new MarvelService();

  componentDidMount() {
    this.updateCharacter();
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
    const id = Math.floor(Math.random() * (1011400 - 1011000) + 1011000); // TODO: Check min and max ids.

    this.onCharacterLoading();

    this.marvelService
      .getCharacter(id)
      .then(this.onCharacterLoaded)
      .catch(this.onError);
  }

  render() {
    const { character, isLoading, isError } = this.state;

    const errorMessage = isError && <ErrorMessage message='Failed to load random character.' />;
    const spinner = isLoading && <Spinner />;
    const content = !(isLoading || isError) && <RandomCharacterView character={character} />;

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
            onClick={this.updateCharacter}>
            Try it
          </button>

          <img src={mjolnir} alt="mjolnir" className="random-character__decoration" />
        </div>
      </div >
    );
  }
}

// TODO: Divide to another file.
const RandomCharacterView = ({ character }) => {
  const { name, description, thumbnail, linkHomepage, linkWiki } = character;

  return (
    <>
      <RandomCharacterThumbnail thumbnailSrc={thumbnail} thumbnailAlt={name} />

      <div className="random-character__info">
        <p className="random-character__name">{name}</p>
        <p className="random-character__descr">{description.length === 0 ? 'Character information not found.' : description.slice(0, 200) + '...'}</p>

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
  const isNoThumbnail = thumbnailSrc.indexOf('image_not_available.') > -1;

  if (isNoThumbnail) {
    return (
      <div className='random-character__img random-character__img--no-image'>
        <ErrorMessage message="Image not found." />
      </div>
    );
  } else {
    return (
      <img className="random-character__img"
        src={thumbnailSrc}
        alt={thumbnailAlt} />
    );
  }
}

export default RandomChar;

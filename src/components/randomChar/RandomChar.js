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

    this.setState({
      isLoading: true,
      isError: false,
    })

    this.marvelService
      .getCharacter(id)
      .then(this.onCharacterLoaded)
      .catch(this.onError)
  }

  render() {
    const { character, isLoading, isError } = this.state;
    const errorMessage = isError && <ErrorMessage message='Failed to load random character.' />;
    const spinner = isLoading && <Spinner />;
    const content = !(isLoading || isError) && <View character={character} />;

    return (
      <div className="randomchar">
        <div className="randomchar__block">
          {spinner}
          {errorMessage}
          {content}
        </div>

        <div className="randomchar__static">
          <p className="randomchar__title">
            Random character for today!
            <br />
            Do you want to get to know him better?
          </p>

          <p className="randomchar__title">Or choose another one</p>

          <button className="button"
            onClick={this.updateCharacter}>
            Try it
          </button>

          <img src={mjolnir} alt="mjolnir" className="randomchar__decoration" />
        </div>
      </div >
    );
  }
}

// TODO: Divide to another file.
const View = ({ character }) => {
  const { name, description, thumbnail, linkHomepage, linkWiki } = character;

  return (
    <>
      <img src={thumbnail} alt="Random character" className="randomchar__img" />

      <div className="randomchar__info">
        <p className="randomchar__name">{name}</p>
        <p className="randomchar__descr">{description.length === 0 ? 'Character information not found.' : description.slice(0, 200) + '...'}</p>

        <div className="randomchar__btns">
          <a href={linkHomepage} className="button">Homepage</a>
          <a href={linkWiki} className="button button__secondary">Wiki</a>
        </div>
      </div>
    </>
  )
}

export default RandomChar;

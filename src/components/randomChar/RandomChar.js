import { Component } from 'react';

import MarvelService from '../../services/MarvelService';

import './randomChar.scss';
import mjolnir from '../../resources/img/mjolnir.png';

class RandomChar extends Component {
  constructor(props) {
    super(props);
    this.updateCharacter();
  }

  state = {
    character: {},
  }

  marvelService = new MarvelService();

  onCharacterLoaded = character => {
    this.setState({ character });
  }

  updateCharacter = () => {
    const id = Math.floor(Math.random() * (1011400 - 1011000) + 1011000); // TODO: Check min and max ids.

    this.marvelService
      .getCharacter(id)
      .then(this.onCharacterLoaded)
  }

  render() {
    const { character: { name, description, thumbnail, linkHomepage, linkWiki } } = this.state;

    return (
      <div className="randomchar">
        <div className="randomchar__block">
          <img src={thumbnail} alt="Random character" className="randomchar__img" />

          <div className="randomchar__info">
            <p className="randomchar__name">{name}</p>
            <p className="randomchar__descr">{description}</p>

            <div className="randomchar__btns">
              <a href={linkHomepage} className="button button__main">
                <div className="inner">Homepage</div>
              </a>

              <a href={linkWiki} className="button button__secondary">
                <div className="inner">Wiki</div>
              </a>
            </div>
          </div>
        </div>

        <div className="randomchar__static">
          <p className="randomchar__title">
            Random character for today!
            <br />
            Do you want to get to know him better?
          </p>

          <p className="randomchar__title">Or choose another one</p>

          <button className="button button__main">
            <div className="inner">Try it</div>
          </button>

          <img src={mjolnir} alt="mjolnir" className="randomchar__decoration" />
        </div>
      </div>
    )
  }
}

export default RandomChar;

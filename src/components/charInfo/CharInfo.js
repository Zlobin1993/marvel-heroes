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
        <img src={thumbnail} alt={name} />

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

      <h3 className="character__comics">Comics:</h3>

      {/* TODO: Divide to another file. */}
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
}

export default CharInfo;

import { Component } from 'react';

import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';
import CharacterListItem from '../characterListItem/CharacterListItem';

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

  onCharacterListLoading = () => {
    this.setState({
      isLoading: true,
      isError: false,
    })
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
    this.onCharacterListLoading();

    this.marvelService
      .getAllCharacters()
      .then(this.onCharacterListLoaded)
      .catch(this.onError);
  }

  render() {
    const { characterList, isLoading, isError } = this.state;
    const { onCharacterSelected } = this.props;

    const errorMessage = isError && <ErrorMessage message='Failed to load random character.' />;
    const spinner = isLoading && <Spinner />;
    const content = !(isLoading || isError) && <CharacterListItem characterList={characterList} onCharacterSelected={id => onCharacterSelected(id)} />;

    return (
      <div className="character__list">
        {spinner}
        {errorMessage}
        {content}
      </div>
    );
  }
}

export default CharList;

import { Component } from 'react';

import AppHeader from "../appHeader/AppHeader";
import RandomChar from "../randomChar/RandomChar";
import CharList from "../charList/CharList";
import CharInfo from "../charInfo/CharInfo";
import ErrorBoundary from '../errorBoundary/ErrorBoundary';

import decoration from '../../resources/img/vision.png';

class App extends Component {
  state = {
    selectedCharacterId: null
  }

  onCharacterSelected = id => {
    this.setState({
      selectedCharacterId: id,
    })
  }

  render() {
    return (
      <div className="app">
        <AppHeader />

        <main>
          <ErrorBoundary>
            <RandomChar />
          </ErrorBoundary>

          <div className="character__content">
            <ErrorBoundary>
              <CharList onCharacterSelected={this.onCharacterSelected} />
            </ErrorBoundary>

            <ErrorBoundary>
              <CharInfo characterId={this.state.selectedCharacterId} />
            </ErrorBoundary>
          </div>

          <img className="bg-decoration"
            src={decoration}
            alt="Vision" />
        </main>
      </div>
    );
  }
}

export default App;

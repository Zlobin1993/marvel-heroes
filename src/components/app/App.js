import { Component } from 'react';

import AppHeader from "../appHeader/AppHeader";
import RandomChar from "../randomChar/RandomChar";
import CharList from "../charList/CharList";
import CharInfo from "../charInfo/CharInfo";

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
          <RandomChar />

          <div className="character__content">
            <CharList onCharacterSelected={this.onCharacterSelected} />
            <CharInfo characterId={this.state.selectedCharacterId} />
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

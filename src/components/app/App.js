import { useState } from 'react';

import AppHeader from "../appHeader/AppHeader";
import RandomChar from "../randomChar/RandomChar";
import CharList from "../charList/CharList";
import CharInfo from "../charInfo/CharInfo";
import ErrorBoundary from '../errorBoundary/ErrorBoundary';

import decoration from '../../resources/img/vision.png';

const App = () => {
  const [selectedCharacterId, setSelectedCharacterId] = useState(null);

  const onCharacterSelected = id => {
    setSelectedCharacterId(id);
  }

  return (
    <div className="app">
      <AppHeader />

      <main>
        <ErrorBoundary>
          <RandomChar />
        </ErrorBoundary>

        <div className="character__content">
          <ErrorBoundary>
            <CharList onCharacterSelected={onCharacterSelected} />
          </ErrorBoundary>

          <ErrorBoundary>
            <CharInfo characterId={selectedCharacterId} />
          </ErrorBoundary>
        </div>

        <img className="bg-decoration"
          src={decoration}
          alt="Vision" />
      </main>
    </div>
  );
}

export default App;

import { useState } from 'react';

import RandomChar from "../randomChar/RandomChar";
import CharList from "../charList/CharList";
import CharInfo from "../charInfo/CharInfo";
import ErrorBoundary from '../errorBoundary/ErrorBoundary';

const MainPage = () => {
  const [selectedCharacterId, setSelectedCharacterId] = useState(null);

  const onCharacterSelected = id => {
    setSelectedCharacterId(id);
  }

  return (
    <>
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
    </>
  )
}

export default MainPage;

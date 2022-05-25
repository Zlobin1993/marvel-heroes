import { useState } from 'react';

import RandomCharacterWrapper from "../randomCharacterWrapper/RandomCharacterWrapper";
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
        <RandomCharacterWrapper />
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

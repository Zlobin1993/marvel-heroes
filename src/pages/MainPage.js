import { useState } from 'react';

import RandomCharacterWrapper from "../components/randomCharacterWrapper/RandomCharacterWrapper";
import CharList from "../components/charList/CharList";
import CharacterInfo from "../components/characterInfo/CharacterInfo";
import ErrorBoundary from '../components/errorBoundary/ErrorBoundary';

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

      <div className="character">
        <ErrorBoundary>
          <CharList onCharacterSelected={onCharacterSelected} />
        </ErrorBoundary>

        <ErrorBoundary>
          <CharacterInfo characterId={selectedCharacterId} />
        </ErrorBoundary>
      </div>
    </>
  )
}

export default MainPage;

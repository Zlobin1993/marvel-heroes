import { useState } from 'react';

import RandomCharacterWrapper from "../components/randomCharacterWrapper/RandomCharacterWrapper";
import CharList from "../components/charList/CharList";
import CharacterInfo from "../components/characterInfo/CharacterInfo";
import CharacterSearchForm from '../components/characterSearchForm/CharacterSearchForm';
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

        <div className="character__content">
          <ErrorBoundary>
            <CharacterSearchForm />
          </ErrorBoundary>

          <ErrorBoundary>
            <CharacterInfo characterId={selectedCharacterId} />
          </ErrorBoundary>
        </div>
      </div>
    </>
  )
}

export default MainPage;

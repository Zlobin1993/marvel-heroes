import AppHeader from "../appHeader/AppHeader";
import RandomChar from "../randomChar/RandomChar";
import CharList from "../charList/CharList";
import CharInfo from "../charInfo/CharInfo";

import decoration from '../../resources/img/vision.png';

const App = () => {
    return (
        <div className="app">
            <AppHeader />

            <main>
                <RandomChar />

                <div className="character__content">
                    <CharList />
                    <CharInfo />
                </div>

                <img className="bg-decoration"
                    src={decoration}
                    alt="Vision" />
            </main>
        </div>
    )
}

export default App;

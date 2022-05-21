import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import AppHeader from "../appHeader/AppHeader";

import { MainPage, ComicsPage, SingleComicPage, Page404 } from '../pages';

import decoration from '../../resources/img/vision.png';

const App = () => {
  return (
    <Router>
      <div className="app">
        <AppHeader />

        <main>
          <Routes>
            <Route path={'/'} element={<MainPage />} />
            <Route path={'/comics'} element={<ComicsPage />} />
            <Route path={'/comics/:comicId'} element={<SingleComicPage />} />
            <Route path={'*'} element={<Page404 />} />
          </Routes>

          <img className="app__background-decoration"
            src={decoration}
            alt="Vision" />
        </main>
      </div>
    </Router>
  );
}

export default App;

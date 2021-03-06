import { lazy, Suspense } from 'react/cjs/react.production.min';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import AppHeader from "../appHeader/AppHeader";
import Spinner from '../spinner/Spinner';

import './app.scss';

import decoration from '../../resources/img/vision.png';

const MainPage = lazy(() => import('../../pages/MainPage'));
const ComicsPage = lazy(() => import('../../pages/ComicsPage'));
const SingleComicPage = lazy(() => import('../../pages/SingleComicPage/SingleComicPage'));
const SingleCharacterPage = lazy(() => import('../../pages/SingleCharacterPage/SingleCharacterPage'))
const Page404 = lazy(() => import('../../pages/404/404'));

const App = () => {
  return (
    <Router>
      <div className="app">
        <div className="app__column">
          <AppHeader />

          <main>
            <Suspense fallback={<Spinner />}>
              <Routes>
                <Route path={'/'} element={<MainPage />} />
                <Route path={'/comics'} element={<ComicsPage />} />
                <Route path={'/comics/:comicId'} element={<SingleComicPage />} />
                <Route path={'/:characterName'} element={<SingleCharacterPage />} />
                <Route path={'*'} element={<Page404 />} />
              </Routes>
            </Suspense>
          </main>
        </div>

        <img className="app__background-decoration"
          src={decoration}
          height={372}
          width={467}
          alt="Vision" />
      </div>
    </Router>
  );
}

export default App;

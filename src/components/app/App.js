import { lazy, Suspense } from 'react/cjs/react.production.min';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import AppHeader from "../appHeader/AppHeader";
import Spinner from '../spinner/Spinner';

import decoration from '../../resources/img/vision.png';

const MainPage = lazy(() => import('../pages/MainPage'));
const ComicsPage = lazy(() => import('../pages/ComicsPage'));
const SingleComicPage = lazy(() => import('../pages/SingleComicPage/SingleComicPage'));
const Page404 = lazy(() => import('../pages/404/404'));

const App = () => {
  return (
    <Router>
      <div className="app">
        <AppHeader />

        <main>
          <Suspense fallback={<Spinner />}>
            <Routes>
              <Route path={'/'} element={<MainPage />} />
              <Route path={'/comics'} element={<ComicsPage />} />
              <Route path={'/comics/:comicId'} element={<SingleComicPage />} />
              <Route path={'*'} element={<Page404 />} />
            </Routes>
          </Suspense>

          <img className="app__background-decoration"
            src={decoration}
            alt="Vision" />
        </main>
      </div>
    </Router>
  );
}

export default App;

import Helmet from 'react-helmet';

import AppBanner from '../components/appBanner/AppBanner';
import ComicsList from '../components/comicsList/ComicsList';
import ErrorBoundary from '../components/errorBoundary/ErrorBoundary';

const ComicsPage = () => {
  return (
    <ErrorBoundary>
      <Helmet>
        <title>Comics page</title>
      </Helmet>

      <AppBanner />
      <ComicsList />
    </ErrorBoundary>
  )
}

export default ComicsPage;

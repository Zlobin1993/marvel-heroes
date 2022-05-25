import { Link } from "react-router-dom";

import ErrorMessage from "../../errorMessage/ErrorMessage";

import './404.scss';

const Page404 = () => {
  return (
    <>
      <div className='error-wrapper'>
        <ErrorMessage message={'Page Not Found'} />
      </div>

      <div className="app__button-wrapper">
        <Link to="/" className="button">Return to main page</Link>
      </div>
    </>
  );
}

export default Page404;

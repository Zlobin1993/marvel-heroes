import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';

import Spinner from '../../components/spinner/Spinner';
import ErrorMessage from '../../components/errorMessage/ErrorMessage';

import useMarvelService from '../../services/MarvelService';

import './singleCharacterPage.scss';

const SingleCharacterPage = () => {
  const [comic, setComic] = useState(null);
  const { characterId } = useParams();
  const { isLoading, error, clearError, getComic } = useMarvelService();

  useEffect(() => {
    updateComic();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [characterId])

  const onComicLoaded = comic => {
    setComic(comic);
  }

  const updateComic = () => {
    clearError();

    getComic(characterId)
      .then(onComicLoaded)
  }

  const errorMessage = error && <ErrorMessage message='Failed to load character info.' />,
    spinner = isLoading && <Spinner />,
    content = (!(isLoading || error) && comic) && <ComicView comic={comic} />;

  return (
    <>
      {spinner}
      {errorMessage}
      {content}
    </>
  );
}

const ComicView = ({ comic }) => {
  const { title, description, thumbnail, price } = comic;

  return (
    <div className="single-comic">
      <img src={thumbnail} alt={title} className="single-comic__img" />

      <div className="single-comic__info">
        <h2 className="single-comic__name">{title}</h2>
        <p className="single-comic__descr">{description}</p>
        {/* <p className="single-comic__descr">144 pages</p>
        <p className="single-comic__descr">Language: en-us</p> */}
        <div className="single-comic__price">{price}</div>
      </div>

      <Link to="/" className="single-comic__back">Back to homepge</Link>
    </div>
  );
}

export default SingleCharacterPage;
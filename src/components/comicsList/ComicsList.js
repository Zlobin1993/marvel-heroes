import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';
import ImageWrapper from '../imageWrapper/ImageWrapper';

import useMarvelService from '../../services/MarvelService';

import './comicsList.scss';

const ComicsList = () => {
  const _additionalComicOffsetStep = 8;
  const { isLoading, error, getAllComics } = useMarvelService();

  const [comicsList, setComicsList] = useState([]),
    [isAdditionalComicsLoading, setIsAdditionalComicsLoading] = useState(false),
    [additionalComicsOffset, setAdditionalComicsOffset] = useState(0),
    [isComicsListEnded, setIsComicsListEnded] = useState(false);

  useEffect(() => {
    onRequest(additionalComicsOffset, true);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onComicsListLoaded = (additionalCharacterList) => {
    setComicsList(comicsList => [...comicsList, ...additionalCharacterList]);
    setIsAdditionalComicsLoading(false);
    setAdditionalComicsOffset(additionalComicsOffset => additionalComicsOffset + _additionalComicOffsetStep);
    setIsComicsListEnded(additionalCharacterList.length < _additionalComicOffsetStep ? true : false);
  }

  const onRequest = (additionalComicsOffset, isInitialRequest = false) => {
    setIsAdditionalComicsLoading(!isInitialRequest);

    getAllComics(additionalComicsOffset, _additionalComicOffsetStep)
      .then(onComicsListLoaded)
  };

  const renderedComicsList = comicsList.length === 0 ? null : (
    <>
      <ul className="comics__grid">
        {
          comicsList.map(({ id, title, thumbnail, price }) => {
            return (
              <li
                className="comics__item"
                key={id}
              >
                <Link
                  className='comics__link'
                  to={`/comics/${id}`}
                >

                  <ImageWrapper
                    className='comics__image-wrapper'
                    imageSource={thumbnail}
                    imageAlt={title}
                  />

                  <div className="comics__title">{title}</div>
                  <div className="comics__price">{price && `${price}$`}</div>
                </Link>
              </li>
            )
          })
        }
      </ul>

      {
        !isComicsListEnded && (
          <button className="button button--long"
            disabled={isAdditionalComicsLoading}
            onClick={() => onRequest(additionalComicsOffset, false)}
          >
            {isAdditionalComicsLoading ? <Spinner type='white' size='small' /> : 'Load More'}
          </button>
        )
      }
    </>
  );

  const spinner = (isLoading && !isAdditionalComicsLoading) && <Spinner />,
    errorMessage = error && <ErrorMessage message='Failed to load characters list.' />;

  return (
    <div className="comics__list">
      {spinner}
      {errorMessage}
      {renderedComicsList}
    </div>
  )
}

export default ComicsList;

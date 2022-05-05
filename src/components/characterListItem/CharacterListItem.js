import ErrorMessage from '../errorMessage/ErrorMessage';

import './characterListItem.scss';

const CharacterListItem = ({ characterList, onCharacterSelected }) => {
  if (characterList.length === 0) return;

  const characterListItems = characterList.map(({ id, name, thumbnail }) => {
    return (
      <li className="character__item"
        key={id}
        onClick={() => onCharacterSelected(id)}>
        <CharacterThumbnail thumbnailSrc={thumbnail} thumbnailAlt={name} />
        <div className="character__name">{name}</div>
      </li>
    )
  })

  return (
    <>
      <ul className="character__grid">
        {characterListItems}
      </ul>

      <button className="button button__long">Load More</button>
    </>
  );
}

// TODO: Divide to another file.
const CharacterThumbnail = ({ thumbnailSrc, thumbnailAlt }) => {
  const isNoThumbnail = thumbnailSrc.indexOf('image_not_available.') > -1;

  if (isNoThumbnail) {
    return (
      <div className='character__image character__image--no-image'>
        <ErrorMessage message="Image not found." />
      </div>
    );
  } else {
    return (
      <img className='character__image'
        src={thumbnailSrc}
        alt={thumbnailAlt} />
    );
  }
}

export default CharacterListItem;

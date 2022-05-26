import './characterComicList.scss';

const CharacterComicList = ({ comicList }) => {
  return (
    <div className='character-comic-list character-info__comic-list'>
      {
        comicList.length > 0
          ? (
            <>
              <h3 className="character-comic-list__title">Comics:</h3>

              <ul className="character-comic-list__list">
                {comicList.map((comic, index) => {
                  return (
                    <li className="character-comic-list__comic"
                      key={index}>
                      {comic.name}
                    </li>
                  )
                })}
              </ul>
            </>
          )
          : <h3 className="character-comic-list__title">There is no comics with this character.</h3>
      }
    </div>
  );
}

export default CharacterComicList;

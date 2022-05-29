import useHttp from '../hooks/http.hook';

const useMarvelService = () => {
  const { isLoading, request, error, clearError } = useHttp(),
    _apiBase = 'https://gateway.marvel.com:443/v1/public/',
    _apiKey = 'apikey=927593af054c2e7bbf847db08a1375d5';

  const _defaultCharactersOffset = 0,
    _defaultCharactersLimit = 9;

  const _defaultIsComicsDigitallyAvailable = true,
    _defaultComicsOffset = 0,
    _defaultComicsLimit = 8;

  // Characters

  const getAllCharacters = async (offset = _defaultCharactersOffset, limit = _defaultCharactersLimit) => {
    const response = await request(`${_apiBase}characters?limit=${limit}&offset=${offset}&${_apiKey}`);
    return response.data.results.map(_transformCharacterData);
  }

  const getCharacter = async id => {
    const response = await request(`${_apiBase}characters/${id}?${_apiKey}`);
    return _transformCharacterData(response.data.results[0]);
  }

  const getCharacterByName = async name => {
    const response = await request(`${_apiBase}characters?name=${name}&${_apiKey}`);
    return _transformCharacterData(response.data.results[0]);
  }

  const _transformCharacterData = character => {
    let thumbnail = null;

    if (character.thumbnail.path && character.thumbnail.extension) {
      if (typeof character.thumbnail.path === 'string') {
        if (character.thumbnail.path.indexOf('image_not_available') === -1) {
          thumbnail = character.thumbnail.path + '.' + character.thumbnail.extension;
        }
      }
    }

    return {
      id: character.id,
      name: character.name,
      description: character.description || null,
      thumbnail,
      linkHomepage: character.urls[0].url, // TODO: Use url by urlType field.
      linkWiki: character.urls[1].url, // TODO: Use url by urlType field.
      comicList: character.comics.items || [],
    };
  }

  // Comics

  const getAllComics = async (offset = _defaultComicsOffset, limit = _defaultComicsLimit, isDigitallyAvailable = _defaultIsComicsDigitallyAvailable) => {
    const response = await request(`${_apiBase}comics?limit=${limit}&offset=${offset}&hasDigitalIssue=${isDigitallyAvailable}&${_apiKey}`);
    return response.data.results.map(_transformComicsData);
  }

  const getComic = async id => {
    const response = await request(`${_apiBase}comics/${id}?${_apiKey}`);
    return _transformComicsData(response.data.results[0]);
  }

  const _transformComicsData = comic => {
    let thumbnail = null,
      price = null;

    if (comic.thumbnail.path && comic.thumbnail.extension) {
      if (typeof comic.thumbnail.path === 'string') {
        if (comic.thumbnail.path.indexOf('image_not_available') === -1) {
          thumbnail = comic.thumbnail.path + '.' + comic.thumbnail.extension;
        }
      }
    }

    if (comic.prices) {
      if (!isNaN(+comic.prices[0].price) && +comic.prices[0].price !== 0) {
        price = comic.prices[0].price;
      }
    }

    return {
      id: comic.id,
      title: comic.title,
      description: comic.description || null,
      thumbnail,
      price,
    };
  }

  return { isLoading, error, clearError, getCharacter, getCharacterByName, getAllCharacters, getComic, getAllComics };
}

export default useMarvelService;

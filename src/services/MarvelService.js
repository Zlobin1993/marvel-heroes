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
      comicsList: character.comics.items || [],
    };
  }

  // Comics

  const getAllComics = async (offset = _defaultComicsOffset, limit = _defaultComicsLimit, isDigitallyAvailable = _defaultIsComicsDigitallyAvailable) => {
    const response = await request(`${_apiBase}comics?limit=${limit}&offset=${offset}&hasDigitalIssue=${isDigitallyAvailable}&${_apiKey}`);
    return response.data.results.map(_transformComicsData);
  }

  const getComics = async id => {
    const response = await request(`${_apiBase}comics/${id}?${_apiKey}`);
    return _transformComicsData(response.data.results[0]);
  }

  const _transformComicsData = comics => {
    let thumbnail = null,
      price = null;

    if (comics.thumbnail.path && comics.thumbnail.extension) {
      if (typeof comics.thumbnail.path === 'string') {
        if (comics.thumbnail.path.indexOf('image_not_available') === -1) {
          thumbnail = comics.thumbnail.path + '.' + comics.thumbnail.extension;
        }
      }
    }

    if (comics.prices) {
      if (!isNaN(+comics.prices[0].price) && +comics.prices[0].price !== 0) {
        price = comics.prices[0].price;
      }
    }

    return {
      id: comics.id,
      title: comics.title,
      description: comics.description || null,
      thumbnail,
      price,
    };
  }

  return { isLoading, error, clearError, getCharacter, getAllCharacters, getComics, getAllComics };
}

export default useMarvelService;

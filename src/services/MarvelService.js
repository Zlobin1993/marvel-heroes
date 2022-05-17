import useHttp from '../hooks/http.hook';

const useMarvelService = () => {
  const { isLoading, request, error, clearError } = useHttp(),
    _apiBase = 'https://gateway.marvel.com:443/v1/public/',
    _apiKey = 'apikey=927593af054c2e7bbf847db08a1375d5',
    _defaultOffset = 0,
    _defaultLimit = 9;

  const getAllCharacters = async (offset = _defaultOffset, limit = _defaultLimit) => {
    const res = await request(`${_apiBase}characters?limit=${limit}&offset=${offset}&${_apiKey}`);

    return res.data.results.map(_transformCharacterData);
  }

  const getCharacter = async id => {
    const res = await request(`${_apiBase}characters/${id}?${_apiKey}`);

    return _transformCharacterData(res.data.results[0]);
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

  return { isLoading, error, clearError, getCharacter, getAllCharacters };
}

export default useMarvelService;

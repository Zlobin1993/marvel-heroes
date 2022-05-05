class MarvelService {
  _apiBase = 'https://gateway.marvel.com:443/v1/public/';
  _apiKey = 'apikey=927593af054c2e7bbf847db08a1375d5';

  getResource = async (url) => {
    let res = await fetch(url);

    if (!res.ok) {
      throw new Error(`Couldn't fetch ${url}, status: ${res.status}.`)
    }

    return await res.json();
  }

  getAllCharacters = async () => {
    const res = await this.getResource(`${this._apiBase}characters?limit=9&${this._apiKey}`);

    return res.data.results.map(this._transformCharacterData);
  }

  getCharacter = async id => {
    const res = await this.getResource(`${this._apiBase}characters/${id}?${this._apiKey}`);

    return this._transformCharacterData(res.data.results[0]);
  }

  _transformCharacterData = character => {
    return {
      id: character.id,
      name: character.name,
      description: character.description,
      thumbnail: character.thumbnail.path + '.' + character.thumbnail.extension,
      linkHomepage: character.urls[0].url, // TODO: Use url bt urlType field.
      linkWiki: character.urls[1].url, // TODO: Use url bt urlType field.
      comicsList: character.comics.items,
    };
  }
}

export default MarvelService;

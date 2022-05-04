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

  getAllCharacters = () => {
    return this.getResource(`${this._apiBase}characters?limit=9&${this._apiKey}`);
  }

  getCharacter = id => {
    return this.getResource(`${this._apiBase}characters/${id}?${this._apiKey}`);
  }
}

export default MarvelService;

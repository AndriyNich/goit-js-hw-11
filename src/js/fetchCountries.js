export class SearchCountries {
  #API_URL = 'https://restcountries.com/v3.1/name/';
  #fldList = [];

  constructor(fldList) {
    this.#fldList.push(...fldList);
  }

  #fieldsListToSearchString() {
    if (this.#fldList.length == 0) return '';

    return `?fields=${this.#fldList.join(',')}`;
  }

  async fetchCountries(name) {
    const search = name.trim();
    if (search === '') {
      return await Promise.resolve([]);
    }

    return await fetch(
      `${this.#API_URL}${search}${this.#fieldsListToSearchString()}`
    ).then(response => {
      if (!response.ok) {
        return Promise.reject(response);
      }

      return response.json();
    });
  }
}

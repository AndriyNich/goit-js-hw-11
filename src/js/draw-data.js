export class DrawCountries {
  #refs = {};

  constructor(refs) {
    this.#refs = Object.assign(this.#refs, refs);
  }

  draw(data) {
    this.#refs.list.innerHTML = '';
    this.#refs.info.innerHTML = '';

    if (data.length == 0) return;

    if (data.length == 1) {
      return this.#drawCountry(data);
    }

    return this.#drawListCountries(data);
  }

  #drawListCountries(data) {
    this.#refs.list.innerHTML = this.#getListCountries(data);
  }

  #getListCountries(data) {
    return data
      .map(
        ({ flags: { svg }, name: { official } }) =>
          `<li class="country__item"><img class="country__flag" src="${svg}" alt="${official}" width="32" ><div class="country__name">${official}</div></li>`
      )
      .join('');
  }

  #drawCountry(data) {
    this.#refs.info.innerHTML = this.#getCountries(data);
  }

  #getCountries(data) {
    return data
      .map(
        ({
          flags: { svg },
          name: { official },
          population,
          capital,
          languages,
        }) => {
          const fCapital = capital[0];
          const langs = Object.values(languages).join(',');

          return `<div class="card">
              <div class=card__title>
                <img class="card__img" src="${svg}" alt="${official}" width="32" >
                <div class="card__country">${official}</div>
              </div>
              <div class="card__caption">Capital: <span class="card__value">${fCapital}</span></div>
              <div class="card__caption">Population: <span class="card__value">${population}</span></div>
              <div class="card__caption">Languages: <span class="card__value">${langs}</span></div>
            </div>`;
        }
      )
      .join('');
  }
}

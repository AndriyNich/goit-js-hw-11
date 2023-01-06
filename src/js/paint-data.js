export default class PaintData {
  #refs;

  constructor(cssSelectorEnterPoint) {
    this.#refs = document.querySelector(cssSelectorEnterPoint);
  }

  insertDataToEnd(data) {
    this.#refs.insertAdjacentHTML('beforeend', data);
  }

  clearDataAll() {
    this.#refs.innerHTML = '';
  }
}

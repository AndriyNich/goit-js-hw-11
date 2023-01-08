export default class PaintData {
  #ref;
  #footer;

  constructor(cssSelectorEnterPoint, cssSelectorFooter) {
    this.#ref = document.querySelector(cssSelectorEnterPoint);
    this.#footer = document.querySelector(cssSelectorFooter);
  }

  insertDataToEnd(data) {
    this.#ref.insertAdjacentHTML('beforeend', data);

    this.#visibleFooter();
  }

  clearDataAll() {
    this.#ref.innerHTML = '';
  }

  #visibleFooter() {
    if (window.innerHeight > this.#ref.offsetHeight) {
      this.#footer.classList.add('hidden');
    } else {
      this.#footer.classList.remove('hidden');
    }
  }
}

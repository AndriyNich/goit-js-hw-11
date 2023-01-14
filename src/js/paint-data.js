export default class PaintData {
  #ref;
  #footer;
  #lastData;

  constructor(
    cssSelectorEnterPoint,
    cssSelectorFooter,
    cssSelectorLoadLastData
  ) {
    this.#ref = document.querySelector(cssSelectorEnterPoint);
    this.#footer = document.querySelector(cssSelectorFooter);
    this.#lastData = document.querySelector(cssSelectorLoadLastData);
  }

  insertDataToEnd(data) {
    this.#ref.insertAdjacentHTML('beforeend', data);

    this.#visibleFooter();
  }

  clearDataAll() {
    this.#ref.innerHTML = '';
    this.#lastData.classList.add('hidden');
  }

  showInfoLoadEndData() {
    this.#lastData.classList.remove('hidden');
  }

  #visibleFooter() {
    if (window.innerHeight > this.#ref.offsetHeight) {
      this.#footer.classList.add('hidden');
    } else {
      this.#footer.classList.remove('hidden');
    }
  }
}

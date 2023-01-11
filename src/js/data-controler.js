import axios from 'axios';
import Notification from './notification';

const notification = new Notification();
const ERR_404 =
  'Sorry, there are no images matching your search query. Please try again.';

export default class DataControler {
  #URL = 'https://pixabay.com/api/';
  #KEY = 'key=32660703-81d5f2d1cd5893d94cddf879d';
  #TYPE = 'image_type=photo';
  #PER_PAGE = 20;
  #totalHits = 0;
  #searchLine = '';
  #pageNumber = 0;
  #search;
  #isNowFetchActive = false;
  idx = 0;

  constructor() {}

  setNewSearch(searchLine) {
    this.#pageNumber = 0;
    this.#searchLine = searchLine.trim().toLowerCase();
  }

  async loadData() {
    this.idx += 1;
    if (this.#isNowFetchActive) {
      return false;
    }

    this.#createSearchLine();

    if (!this.#whileNotDataEnd()) {
      console.log('END');
      return false;
    }

    this.#setFetchActive();

    return await this.#fetchData();
  }

  async #fetchData() {
    try {
      const result = await axios.get(this.#search);

      this.#totalHits = result.data.totalHits;

      this.#sendNotification(this.#totalHits);

      this.#resetFetchActive();

      return Promise.resolve(result);
    } catch (err) {
      this.#resetFetchActive();
      notification.sendNotificationError(err);
    }
  }

  get pageNumber() {
    return this.#pageNumber;
  }

  set pageNumber(newPage) {
    this.#pageNumber = newPage;
  }

  #setFetchActive() {
    this.#isNowFetchActive = true;
  }

  #resetFetchActive() {
    this.#isNowFetchActive = false;
  }

  #whileNotDataEnd() {
    if (this.#pageNumber <= 1) {
      return true;
    }

    if (this.#pageNumber * this.#PER_PAGE >= this.#totalHits) {
      return true;
    }

    return false;
  }

  #sendNotification(cntData) {
    if (cntData === 0) {
      notification.sendNotificationError(ERR_404);
    } else if (this.#pageNumber === 1) {
      notification.sendNotificationSuccess(
        `Hooray! We found ${cntData} images`
      );
    }
    console.log(this.#pageNumber * this.#PER_PAGE, cntData);

    if (this.#pageNumber * this.#PER_PAGE >= cntData) {
      notification.sendNotificationInfo('Oops! Data is end.');
    }
  }

  #createSearchLine() {
    this.#pageNumber++;

    this.#search = `${this.#URL}?${this.#KEY}&${this.#TYPE}
      &page=${this.#pageNumber}&per_page=${this.#PER_PAGE}&q=${
      this.#searchLine
    }`;
  }
}

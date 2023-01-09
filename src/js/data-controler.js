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
  #page = 0;
  #search;
  #isNowFetchActive = false;

  constructor() {}

  setNewSearch(searchLine) {
    this.#page = 0;
    this.#searchLine = searchLine.trim().toLowerCase();
    this.#resetFetchActive();
  }

  async loadData() {
    if (this.#isNowFetchActive) {
      return false;
    }

    this.#createSearchLine();

    if (!this.#whileNotDataEnd()) {
      return false;
    }

    return await this.#fetchData();
  }

  async #fetchData() {
    try {
      this.#setFetchActive();

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

  get page() {
    return this.#page;
  }

  set page(newPage) {
    this.#page = newPage;
  }

  #setFetchActive() {
    this.#isNowFetchActive = true;
  }

  #resetFetchActive() {
    this.#isNowFetchActive = false;
  }

  #whileNotDataEnd() {
    if (this.#page <= 1) {
      return true;
    }

    if (this.#page * this.#PER_PAGE < this.#totalHits) {
      return true;
    }

    notification.sendNotificationInfo('Oops! Data is end.');
    return false;
  }

  #sendNotification(cntData) {
    if (cntData === 0) {
      notification.sendNotificationError(ERR_404);
    } else {
      if (this.#page === 1) {
        notification.sendNotificationSuccess(
          `Hooray! We found ${cntData} images`
        );
      }
    }
  }

  #createSearchLine() {
    this.#page++;

    this.#search = `${this.#URL}?${this.#KEY}&${this.#TYPE}
      &page=${this.#page}&per_page=${this.#PER_PAGE}&q=${this.#searchLine}`;
  }
}

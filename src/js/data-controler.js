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
  #searchLine = '';
  #page = 0;
  #search;
  #isActive = false;

  constructor() {}

  async loadData(searchLine) {
    if (this.#isActive) {
      return false;
    }

    this.#createSearchLine(searchLine);

    try {
      this.#isActive = true;
      const result = await axios.get(this.#search);

      this.#sendNotification(result.data.totalHits);

      this.#isActive = false;

      return Promise.resolve(result);
    } catch (err) {
      notification.sendNotificationError(err);
    }
  }

  get page() {
    return this.#page;
  }

  set page(newPage) {
    this.#page = newPage;
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

  #createSearchLine(searchLine) {
    if (this.#searchLine !== searchLine.trim().toLowerCase()) {
      this.#searchLine = searchLine.trim().toLowerCase();
      this.#page = 1;
    } else {
      this.#page++;
    }

    this.#search = `${this.#URL}?${this.#KEY}&${this.#TYPE}
      &page=${this.#page}&per_page=${this.#PER_PAGE}&q=${this.#searchLine}`;
  }
}

import { SearchCountries } from './fetchCountries';
import { Notification } from './notification';

const notification = new Notification();

export class DataControler {
  #FIELDS_LIST = ['name', 'capital', 'population', 'languages', 'flags'];
  #search;

  constructor() {
    this.#search = new SearchCountries(this.#FIELDS_LIST);
  }

  loadData(querySearch) {
    return this.#search
      .fetchCountries(querySearch)
      .then(this.#onResponse)
      .catch(this.#onCatch);
  }

  #onResponse(data) {
    if (data.length > 10) {
      notification.sendNotificationInfo(
        'Too many matches found. Please enter a more specific name.'
      );
      return Promise.resolve([]);
    }

    return Promise.resolve(data);
  }

  #onCatch(error) {
    if (error.status === 404) {
      notification.sendNotificationError(
        'Oops, there is no country with that name.'
      );
      return Promise.resolve([]);
    } else {
      console.log('error - else => ', error);

      return Promise.reject(error);
    }
  }
}

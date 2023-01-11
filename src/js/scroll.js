import throttle from 'lodash.throttle';

export default class MyScroll {
  #scrollEvent = {
    TOP_VISIBLE: 'top-visible',
    TOP_HIDDEN: 'top-hidden',
    CALL_FETCH: 'call-fetch',
  };

  #events = [];
  #ref;
  #currentY = 0;

  constructor(ref) {
    this.#ref = ref;
    window.addEventListener('scroll', throttle(this.#onScroll.bind(this), 300));
  }

  addEventListener(event, callback) {
    const obj = {};
    obj[event] = callback;
    this.#events.push(obj);
  }

  #onScroll(event) {
    const currentY =
      this.#ref.footer.offsetTop +
      this.#ref.footer.offsetHeight +
      document.documentElement.getBoundingClientRect().top -
      document.documentElement.clientHeight;

    if (currentY < 200) {
      this.#eventScrollCallFetch();
    }

    if (this.#isHeaderVisible()) {
      this.#eventScrollTopVisible();
    } else {
      this.#eventScrollTopHidden();
    }

    this.#currentY = currentY;
  }

  #isHeaderVisible() {
    return document.documentElement.getBoundingClientRect().top > -100;
  }

  #CallEvents(name) {
    this.#events.forEach(elem => {
      if (elem[name]) {
        const callBack = elem[name];
        callBack();
      }
    });
  }

  #eventScrollTopVisible() {
    this.#CallEvents(this.#scrollEvent.TOP_VISIBLE);
  }

  #eventScrollTopHidden() {
    this.#CallEvents(this.#scrollEvent.TOP_HIDDEN);
  }

  #eventScrollCallFetch() {
    this.#CallEvents(this.#scrollEvent.CALL_FETCH);
  }
}

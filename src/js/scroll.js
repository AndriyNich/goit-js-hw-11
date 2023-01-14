import throttle from 'lodash.throttle';

export default class MyScroll {
  #scrollEvent = {
    HEADER_VISIBLE: 'header-visible',
    HEADER_HIDDEN: 'header-hidden',
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

  scrolByTop() {
    window.scrollBy({
      top: document.documentElement.getBoundingClientRect().top,
      behavior: 'smooth',
    });
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
      this.#eventScrollHeaderVisible();
    } else {
      this.#eventScrollHeaderHidden();
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

  #eventScrollHeaderVisible() {
    this.#CallEvents(this.#scrollEvent.HEADER_VISIBLE);
  }

  #eventScrollHeaderHidden() {
    this.#CallEvents(this.#scrollEvent.HEADER_HIDDEN);
  }

  #eventScrollCallFetch() {
    this.#CallEvents(this.#scrollEvent.CALL_FETCH);
  }
}

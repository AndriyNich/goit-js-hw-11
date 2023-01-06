export class Listener {
  // #DEBOUNCE_DELAY = 300;
  // #debounce = require('lodash.debounce');

  constructor({ selectorSource, callBack }) {
    document.querySelector(selectorSource).addEventListener('input', callBack);
  }
}

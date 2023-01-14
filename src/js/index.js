import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

import DataControler from './data-controler';
import PrepareData from './prepare-data';
import PaintData from './paint-data';
import Notification from './notification';
import MyScroll from './scroll';

/** References */
const refs = {
  btnStart: document.querySelector('.search__btn--top'),
  form: document.querySelector('.search__form'),
  search: document.querySelector('#search'),
  footer: document.querySelector('footer'),
  btnBackToSearch: document.querySelector('.back-search'),
};

/** Initialization */
const prepareData = new PrepareData();
const notification = new Notification();

const gallery = new SimpleLightbox('.gallery a', { scrollZoom: false });

const paintData = new PaintData('.gallery', 'footer', '.footer__title');
const dataControler = new DataControler();
/** when load last data -> show caption "The end" */
dataControler.onLoadLastData = paintData.showInfoLoadEndData.bind(paintData);

const myScroll = new MyScroll(refs);
/** check in events for scroll */
myScroll.addEventListener('call-fetch', onFetch);
myScroll.addEventListener('header-visible', makeBtnBackToSearchAsHidden);
myScroll.addEventListener('header-visible', setFocusToSearchField);
myScroll.addEventListener('header-hidden', makeBtnBackToSearchAsVisible);
/** check in event click to button "Up to search" (smooth scroll)  */
document
  .querySelector('.back-search')
  .addEventListener('click', myScroll.scrolByTop);

/** сcheck in event start search */
refs.form.addEventListener('submit', onFirstSearch);

function onFirstSearch(event) {
  event.preventDefault();

  const searchLine = event.target.elements.search.value;

  dataControler.setNewSearch(searchLine);

  onFetch();
}

/** getting data by search */
async function onFetch() {
  try {
    const result = await dataControler.loadData();

    if (!result) {
      return;
    }

    onFetchResult(result.data.hits);
  } catch (err) {
    notification.sendNotificationError(err);
  }
}

/** processing of uploaded data */
function onFetchResult(data) {
  if (dataControler.pageNumber === 1) {
    paintData.clearDataAll();
  }

  const listPicturesAsHtmlString = prepareData.getHtmlSring(data);

  paintData.insertDataToEnd(listPicturesAsHtmlString);

  gallery.refresh();
}

/**
 * section callbacks
 */
function makeBtnBackToSearchAsHidden() {
  refs.btnBackToSearch.classList.add('hidden');
}

function makeBtnBackToSearchAsVisible() {
  refs.btnBackToSearch.classList.remove('hidden');
}

function setFocusToSearchField() {
  refs.search.focus();
  refs.search.select();
}

import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

import DataControler from './data-controler';
import PrepareData from './prepare-data';
import PaintData from './paint-data';
import Notification from './notification';
import MyScroll from './scroll';

const refs = {
  btnStart: document.querySelector('.search__btn--top'),
  form: document.querySelector('.search__form'),
  footer: document.querySelector('footer'),
  btnBackToSearch: document.querySelector('.back-search'),
};

const prepareData = new PrepareData();
const notification = new Notification();

const gallery = new SimpleLightbox('.gallery a', { scrollZoom: false });

const paintData = new PaintData('.gallery', 'footer', '.footer__title');
const dataControler = new DataControler();
dataControler.onLoadLastData = paintData.showInfoLoadEndData.bind(paintData);

const myScroll = new MyScroll(refs);
myScroll.addEventListener('call-fetch', onFetch);
myScroll.addEventListener('header-visible', makeBtnBackToSearchAsHidden);
myScroll.addEventListener('header-hidden', makeBtnBackToSearchAsVisible);

refs.form.addEventListener('submit', onFirstSearch);

function onFirstSearch(event) {
  event.preventDefault();

  const searchLine = event.target.elements.search.value;

  dataControler.setNewSearch(searchLine);

  onFetch();
}

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

function onFetchResult(data) {
  if (dataControler.pageNumber === 1) {
    paintData.clearDataAll();
  }

  const listPicturesAsHtmlString = prepareData.getHtmlSring(data);

  paintData.insertDataToEnd(listPicturesAsHtmlString);

  gallery.refresh();
}

function makeBtnBackToSearchAsHidden() {
  refs.btnBackToSearch.classList.add('hidden');
}

function makeBtnBackToSearchAsVisible() {
  refs.btnBackToSearch.classList.remove('hidden');
}

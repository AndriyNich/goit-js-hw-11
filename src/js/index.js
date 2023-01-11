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
const paintData = new PaintData('.gallery', 'footer');
const dataControler = new DataControler();
const notification = new Notification();
const myScroll = new MyScroll(refs);

myScroll.addEventListener('call-fetch', onFetch);
myScroll.addEventListener('top-visible', setBtnBackToSearchHidden);
myScroll.addEventListener('top-hidden', setBtnBackToSearchVisible);

refs.form.addEventListener('submit', onSearch);

function onSearch(event) {
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

  const listPicturesInHtmlString = prepareData.getHtmlSring(data);

  paintData.insertDataToEnd(listPicturesInHtmlString);
}

function setBtnBackToSearchHidden() {
  refs.btnBackToSearch.classList.add('hidden');
}

function setBtnBackToSearchVisible() {
  refs.btnBackToSearch.classList.remove('hidden');
}

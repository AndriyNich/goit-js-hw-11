import DataControler from './data-controler';
import PrepareData from './prepare-data';
import PaintData from './paint-data';
import Notification from './notification';

const prepareData = new PrepareData();
const paintData = new PaintData('.gallery', 'footer');
const dataControler = new DataControler();
const notification = new Notification();

const refs = {
  btnStart: document.querySelector('.search__btn--top'),
  btnMore: document.querySelector('.search__btn--down'),
  search: document.querySelector('.search_input'),
  form: document.querySelector('.search__form'),
};

// new Listener({ selectorSource: '#search-box', callBack: onSearch });
// document.querySelector(selectorSource).addEventListener('input', callBack);
refs.form.addEventListener('submit', onSearch);

async function onSearch(event) {
  event.preventDefault();
  try {
    const searchLine = event.target.elements.search.value;

    const result = await dataControler.loadData(searchLine);

    onResult(result.data.hits);
  } catch (err) {
    notification.sendNotificationError(err);
  }
}

function onResult(data) {
  if (dataControler.page === 1) {
    paintData.clearDataAll();
  }
  const listPicturesInHtmlString = prepareData.getHtmlSring(data);
  paintData.insertDataToEnd(listPicturesInHtmlString);
}

window.addEventListener('scroll', onScroll);

function onScroll(event) {
  console.log(
    document.documentElement.getBoundingClientRect().top,
    document.documentElement.getBoundingClientRect().bottom,
    document.documentElement.clientHeight,
    document.querySelector('footer').offsetTop
  );
  console.dir(document.querySelector('footer'));
}

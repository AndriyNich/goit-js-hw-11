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
  footer: document.querySelector('footer'),
};

refs.form.addEventListener('submit', onSearch);

let searchLine = '';

function onSearch(event) {
  event.preventDefault();

  searchLine = event.target.elements.search.value;

  dataControler.setNewSearch(searchLine);

  onFetch();
}

async function onFetch() {
  try {
    const result = await dataControler.loadData();

    if (!result) {
      return;
    }

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
  const tmp =
    refs.footer.offsetTop +
    refs.footer.offsetHeight +
    document.documentElement.getBoundingClientRect().top -
    document.documentElement.clientHeight;

  if (tmp < 200) {
    onFetch();
  }

  // console.log(
  //   document.documentElement.getBoundingClientRect().top,
  //   document.documentElement.getBoundingClientRect().bottom,
  //   document.documentElement.clientHeight,
  //   document.querySelector('footer').offsetTop,
  //   tmp
  // );
  // console.dir(document.querySelector('footer'));
}

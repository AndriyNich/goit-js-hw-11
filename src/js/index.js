// import { Listener } from './listener';
// import { DataControler } from './data-controler';
// import { DrawCountries } from './draw-data';
import axios from 'axios';
import PrepareData from './prepare-data';
import PaintData from './paint-data';

const prepareData = new PrepareData();
const paintData = new PaintData('.gallery');

const refs = {
  btnStart: document.querySelector('.search__btn--top'),
  btnMore: document.querySelector('.search__btn--down'),
  search: document.querySelector('.search_input'),
  form: document.querySelector('.search__form'),
};

// const dataControler = new DataControler();

// new Listener({ selectorSource: '#search-box', callBack: onSearch });
// document.querySelector(selectorSource).addEventListener('input', callBack);
refs.form.addEventListener('submit', onSearch);

function getSearchLine() {
  // return refs.form.ele
}

function onSearch(event) {
  event.preventDefault();
  console.log('Click', event, event.target.elements.search.value);

  const searchLine = event.target.elements.search.value;

  axios
    .get(
      `https://pixabay.com/api/?key=32660703-81d5f2d1cd5893d94cddf879d&q=${searchLine}&image_type=photo`
    )
    .then(data => {
      console.log(data.data);
      onResult(data.data.hits);
    })
    .catch(console.log);

  // робимо запит на сервер, якщо прийшли коректні дані - виводимо
  // dataControler.loadData(e.target.value).then(data => {
  //   new DrawCountries(refs).draw(data);
  // });
}

function onResult(data) {
  paintData.clearDataAll();
  const listPicturesInHtmlString = prepareData.getHtmlSring(data);
  paintData.insertDataToEnd(listPicturesInHtmlString);
}

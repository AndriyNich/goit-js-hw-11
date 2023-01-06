export default class PrepareData {
  constructor() {}

  getHtmlSring(data) {
    return data.map(this.#createDataLine).join('');
  }

  #createDataLine(item) {
    const {
      previewURL: src,
      largeImageURL: bigSrc,
      tags: alt,
      likes,
      views,
      comments,
      downloads,
    } = item;
    return `
          <div class="photo-card">
            <img src="${src}" alt="${alt}" loading="lazy" />
            <div class="info">
              <p class="info__item">
                <span class="info__title"><b>Likes</b></span>
                <span class="info__data">${likes}</span>
              </p>
              <p class="info-item">
                <span class="info__title"><b>Views</b></span>
                <span class="info__data">${views}</span>
              </p>
              <p class="info-item">
                <span class="info__title"><b>Comments</b></span>
                <span class="info__data">${comments}</span>
              </p>
              <p class="info-item">
                <span class="info__title"><b>Downloads</b></span>
                <span class="info__data">${downloads}</span>
              </p>
            </div>
          </div>`;
  }
}

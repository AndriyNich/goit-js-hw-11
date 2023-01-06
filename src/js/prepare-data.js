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
            <img class="photo__img" src="${src}" alt="${alt}" loading="lazy" />
            <div class="info">
              <p class="info__item">
                <span class="info__title">Likes</span>
                <span class="info__data">${likes}</span>
              </p>
              <p class="info-item">
                <span class="info__title">Views</span>
                <span class="info__data">${views}</span>
              </p>
              <p class="info-item">
                <span class="info__title">Comments</span>
                <span class="info__data">${comments}</span>
              </p>
              <p class="info-item">
                <span class="info__title">Downloads</span>
                <span class="info__data">${downloads}</span>
              </p>
            </div>
          </div>`;
  }
}

import Notiflix from 'notiflix';

Notiflix.Notify.init({});

export class Notification {
  sendNotificationInfo(message) {
    Notiflix.Notify.info(message);
  }

  sendNotificationError(message) {
    Notiflix.Notify.failure(message);
  }
}

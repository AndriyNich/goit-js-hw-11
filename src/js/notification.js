import Notiflix from 'notiflix';

Notiflix.Notify.init({});

export default class Notification {
  sendNotificationInfo(message) {
    Notiflix.Notify.info(message);
  }

  sendNotificationError(message) {
    Notiflix.Notify.failure(message);
  }

  sendNotificationSuccess(message) {
    Notiflix.Notify.success(message);
  }
}

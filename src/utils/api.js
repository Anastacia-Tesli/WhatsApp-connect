import { API_URL } from './constants';

class Api {
  constructor(url, headers) {
    this._url = url;
    this._headers = headers;
  }

  _makePromise(url, method, body) {
    return fetch(`${this._url}${url}`, {
      method: `${method}`,
      headers: this._headers,
      body: body,
    }).then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status}`);
    });
  }

  postMessage(chatId, message, idInstance, apiTokenInstance) {
    return this._makePromise(
      `/waInstance${idInstance}/SendMessage/${apiTokenInstance}`,
      'POST',
      JSON.stringify({
        chatId: chatId,
        message: message,
      }),
    );
  }

  getMessage(idInstance, apiTokenInstance) {
    return this._makePromise(
      `/waInstance${idInstance}/ReceiveNotification/${apiTokenInstance}`,
      'GET',
    );
  }

  deleteMessage(receiptId, idInstance, apiTokenInstance) {
    return this._makePromise(
      `/waInstance${idInstance}/DeleteNotification/${apiTokenInstance}/${receiptId}`,
      'DELETE',
    );
  }
}

const api = new Api(API_URL, {
  'Content-Type': 'application/json',
});

export { api };

class Api {
  constructor(options) {
    // constructor body
  }

  getInitialCards() {
    return fetch("https://around-api.en.tripleten-services.com/v1", {
      headers: {
        authorization: "c56e30dc-2883-4270-a59e-b2f7bae969c6",
      },
    }).then((res) => {
      if (res.status) {
        return res.json();
      }
      return Promise.reject(`Error: ${res.status}`);
    });
  }
}
const api = new Api({
  baseUrl: "https://around-api.en.tripleten-services.com/v1",
  headers: {
    authorization: "8dcb8b45-1d41-4cb1-9020-633ca7e69ba7",
    "Content-Type": "application/json",
  },
});

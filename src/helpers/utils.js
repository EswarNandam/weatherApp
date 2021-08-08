export const API_HOST = "https://api.openweathermap.org/data/2.5";
export const API_KEY = "75f972b80e26f14fe6c920aa6a85ad57&";

export const promise = promise => {
    return promise
      .then(data => {
        return [null, data];
      })
      .catch(err => [err]);
  };

export const actionCreator = (type, payload = null) => ({ type, payload });
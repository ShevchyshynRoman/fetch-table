const BASE_URL = 'https://jsonplaceholder.typicode.com';

export const request = (url, options) => {
  return fetch(`${BASE_URL}${url}`, options)
    .then(res => {
      if (!res.ok) {
        throw new Error(`${res.status} - ${res.statusText}`)
      }

      return res.json();
    })
}

export const post = (url, data) => {
  return request(url, {
    method: 'POST',
    headers: {
      "Content-type": "application/json; charset=UTF-8"
    },
    body: JSON.stringify(data),
  });
}

export const patch = (url, data) => {
  return request(url, {
    method: 'PATCH',
    headers: {
      "Content-type": "application/json; charset=UTF-8"
    },
    body: JSON.stringify(data),
  });
};

export const remove = (url) => {
  return request(url, { method: 'DELETE'});
};

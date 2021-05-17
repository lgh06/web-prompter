const baseURL =  '';// 'http://localhost:3000/v1/';

function genFetch(method) {
  return (path, dataObj) => fetch(baseURL + path, {
    method: String(method).toUpperCase(),
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(dataObj)
  }).then(res => res.json())
}

const http = {
  post: genFetch('post'),
  POST: genFetch('post'),
}
export { http };

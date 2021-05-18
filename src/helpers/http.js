const baseURL =  '';// 'http://localhost:3000/v1/';

function genFetch(method) {
  return (path, dataObj) => {
    const upperCaseMethod = method.toUpperCase();
    let body = JSON.stringify(dataObj);
    if (upperCaseMethod === 'GET' || upperCaseMethod === 'HEAD') {
      body = null;
      path += '?'
      Object.keys(dataObj).forEach(v => {
        path += v + '=' + dataObj[v]
      }) 
    }
    return fetch(baseURL + path, {
      method: upperCaseMethod,
      headers: {
        'Content-Type': 'application/json'
      },
      body: body
    }).then(res => res.json())
  }
}

const http = {
  post: genFetch('post'),
  POST: genFetch('post'),
  get: genFetch('get'),
  GET: genFetch('get'),
}
export { http };

const callAPI = (url, callback, method = 'GET', data = null) => {
  let xhr = new XMLHttpRequest();
  if (xhr.overrideMimeType) {
    xhr.overrideMimeType('application/json');
  }

  xhr.open(method, url);

  xhr.responseType = 'json';
  xhr.addEventListener('load', function io_loadjson(e) {
    if (e.target.status === 200 || e.target.status === 0) {
      callback(null, e.target.response);
    } else {
      callback(new Error('Not found: ' + url));
    }
  });
  xhr.addEventListener('error', callback);
  xhr.addEventListener('timeout', callback);

  try {
    xhr.send(data);
  } catch (e) {
    callback(new Error('Not found: ' + url));
  }
};

export default callAPI;
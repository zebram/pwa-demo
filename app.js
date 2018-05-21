const api_key = 'jvwW3P7VQh0qSEjtvEbruP9ZU6tYBUuVQ9RBHhsP';
const main = document.querySelector('main');

async function fetchImgURL() {
  var date = document.getElementsByName('date')[0].value;
  const res = await fetch(`https://api.nasa.gov/planetary/apod?date=${date}&hd=false&api_key=${api_key}`);
  const json = await res.json();
  main.appendChild(createImg(json.url));
}

function createImg(url) {
  console.log('createImg '+url);
  let img =document.createElement("IMG");
  img.src=url;
  return img;
}

(function () {
  'use strict';
  var app = {

  };

  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('./sw.js')
    .then(() => {
      console.log('Serviceis worker registered');
    });
  }
})();

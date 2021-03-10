import routes from './routes.js';
import LocationHelper from './libs/location';

// DOMContentLoaded is fired once the document has been loaded and parsed,
// but without waiting for other external resources to load (css/images/etc)
// That makes the app more responsive and perceived as faster.
// https://developer.mozilla.org/Web/Reference/Events/DOMContentLoaded
window.addEventListener('DOMContentLoaded', () => {

  // We'll ask the browser to use strict code to help us catch errors earlier.
  // https://developer.mozilla.org/Web/JavaScript/Reference/Functions_and_function_scope/Strict_mode
  'use strict';

  // var translate = navigator.mozL10n.get;
  // We want to wait until the localisations library has loaded all the strings.
  // So we'll tell it to let us know once it's ready.
  // navigator.mozL10n.once(start);

  // Init user Location on app start
  LocationHelper.init();

  // Initialize the controller for the current route
  routes.getRouteController(window.location.pathname).init();
  renderTemplate();

  document.addEventListener("keydown", event => {
    const controller = routes.getRouteController(window.location.pathname);
    if (!controller) return; // TODO: Log an error or something

    controller.handleKeyDown(event);
  });

  document.addEventListener("click", event => {
    const controller = routes.getRouteController(window.location.pathname);
    if (!controller) return; // TODO: Log an error or something

    controller.handleClick(event);
  });

});

window.onpopstate = () => {
  renderTemplate();
}

const renderTemplate = (path = window.location.pathname) => {
  const contentDiv = document.getElementById('content-root');
  contentDiv.innerHTML = routes.getRouteContent(path);

  routes.getRouteController(path).renderCB();
};

window.onCustomNavigate = (pathName, qureyParams = '') => {
  window.history.pushState(
    {},
    pathName,
    window.location.origin + pathName + qureyParams,
  );

  renderTemplate(pathName);
}

// const start = () => {

//   var message = document.getElementById('message');

//   // We're using textContent because inserting content from external sources into your page using innerHTML can be dangerous.
//   // https://developer.mozilla.org/Web/API/Element.innerHTML#Security_considerations
//   message.textContent = window.translate('message');

// };
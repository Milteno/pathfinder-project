import {select} from '../settings.js';

class WindowSizeValidator {
  constructor() {

    const thisWindowSize = this;
    let getHref = location.href;
    let hrefCharacters = getHref.split('/');
    thisWindowSize.lastHrefCharacter = hrefCharacters[(hrefCharacters.length - 1)];
  }

  windowCheck() {
    const thisWindowSize = this;

    document.querySelector('[href="#finder"]').addEventListener('click', function(e) {
      e.preventDefault();
      if(window.matchMedia('(max-width: 563px)').matches || thisWindowSize.lastHrefCharacter == select.finder.finder) {
        document.querySelector('.browser-only').style.display = 'flex';
        document.querySelector('.pathfinder').style.display = 'none';
        document.querySelector('.content-wrapperr').style.display = 'none';
        document.querySelector('.browser-only').innerHTML = 'This page is browser only :/';
      } else {
        document.querySelector('.browser-only').style.display = 'none';
        document.querySelector('.content-wrapperr').style.display = 'relative';
      }
    });
    window.addEventListener('load', function(e){
      e.preventDefault();
      if(window.matchMedia('(max-width: 563px)').matches && thisWindowSize.lastHrefCharacter == select.finder.finder) {
        document.querySelector('.browser-only').style.display = 'flex';
        document.querySelector('.pathfinder').style.display = 'none';
        document.querySelector('.content-wrapperr').style.display = 'none';
        document.querySelector('.browser-only').innerHTML = 'This page is browser only :/';
      } else {
        document.querySelector('.browser-only').style.display = 'none';
        document.querySelector('.content-wrapperr').style.display = 'relative';
      }
    });
  }
}

export default WindowSizeValidator;
import {select, classNames} from './settings.js';
import Finder from './components/Finder.js';
import About from './components/About.js';

const app = {
  initPages: function() {
    const thisApp = this;
    thisApp.pages = document.querySelector(select.containerOf.pages).children;
    thisApp.navLinks = document.querySelectorAll(select.nav.links);
    const idFromHash = window.location.hash.replace('#/', '');

    let pageMatchingHash = thisApp.pages[0].id;

    for(let page of thisApp.pages) {
      if(page.id == idFromHash) {
        pageMatchingHash = page.id;
        break;
      }
    }

    thisApp.activatePage(pageMatchingHash);

    for (let link of thisApp.navLinks) {
      link.addEventListener('click', function(event){
        const clickedElement = this;

        event.preventDefault();

        const id = clickedElement.getAttribute('href').replace('#', '');

        thisApp.activatePage(id);

      });
    }
  },
  activatePage: function(pageId) {
    const thisApp = this;

    /* add class "active */
    for(let page of thisApp.pages) {
      page.classList.toggle(classNames.pages.active, page.id == pageId);
    }
    for(let link of thisApp.navLinks) {
      link.classList.toggle(
        classNames.nav.active,
        link.getAttribute('href') == '#' + pageId
      );
    }
    window.location.hash = '#/' + pageId;
    thisApp.currentPageId = pageId;

    // thisApp.WindowSizeValidator = new WindowSizeValidator();
    // thisApp.WindowSizeValidator.windowCheck();

  },
  titleLetterSpacing: function() {
    const words = document.querySelector('.letters'), wordsArray = words.innerText.split('').map(e => ' ' == e ? '<div>&nbsp</div>' : '<div>' + e + '</div>');
    words.innerHTML = wordsArray.join('');
  },
  initAbout: function() {
    const thisApp = this;

    thisApp.About = new About(document.querySelector(select.containerOf.about));


  },
  initFinder: function() {
    const thisApp = this;
    thisApp.Finder = new Finder(document.querySelector(select.containerOf.finder));

  },
  init: function(){
    const thisApp = this;
    thisApp.initPages();
    thisApp.initAbout();
    thisApp.initFinder();
    thisApp.titleLetterSpacing();
  },
};

app.init();
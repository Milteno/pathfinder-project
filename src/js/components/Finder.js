import {select, templates, classNames} from '../settings.js';


class Finder {
  constructor(element) {
    const thisFinder = this;

    thisFinder.element = element;

    thisFinder.step = 1;

    thisFinder.render(element);
  }
  render(element) {
    const thisFinder = this;

    let pageData = null;
    switch(thisFinder.step) {
    case 1:
      pageData = { title: 'Draw routes', buttonText: 'Finish drawing' };
      break;
    case 2:
      pageData = { title: 'Pick start and finish', buttonText: 'Compute' };
      break;
    case 3:
      pageData = { title: 'The best route is', buttonText: 'Start again' };
      break;
    }

    let html = '';
    for(let row = 1; row <= 10; row++) {
      for(let col = 1; col <= 10; col++) {
        html += '<div class="field" data-row="' + row + '" data-col="' + col + '"></div>';
      }
    }


    const generatedHTML = templates.finderPage();

    thisFinder.dom = {};
    thisFinder.dom.wrapper = element;
    thisFinder.dom.wrapper.innerHTML = generatedHTML;

    thisFinder.element.querySelector(select.finder.grid).innerHTML = html;

  }
  activatePage(id) {
    const thisAbout = this;
    for(let page of thisAbout.pages) {
      page.classList.toggle(classNames.pages.active, page.id == id);
    }
    for(let link of thisAbout.navLinks) {
      link.classList.toggle(
        classNames.nav.active,
        link.getAttribute('href') == '#' + id
      );
    }
    window.location.hash = '#/' + id;
  }
}

export default Finder;
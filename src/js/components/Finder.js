import {templates, classNames} from '../settings.js';


class Finder {
  constructor(element) {
    const thisFinder = this;

    thisFinder.render(element);
  }
  render(element) {
    const thisFinder = this;
    const generatedHTML = templates.finderPage();

    console.log(generatedHTML);

    thisFinder.dom = {};
    thisFinder.dom.wrapper = element;
    thisFinder.dom.wrapper.innerHTML = generatedHTML;

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
import {templates, classNames} from '../settings.js';


class About {
  constructor(element) {
    const thisAbout = this;

    thisAbout.render(element);
  }
  render(element) {
    const thisAbout = this;
    const generatedHTML = templates.aboutPage();

    console.log(generatedHTML);

    thisAbout.dom = {};
    thisAbout.dom.wrapper = element;
    thisAbout.dom.wrapper.innerHTML = generatedHTML;

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

export default About;
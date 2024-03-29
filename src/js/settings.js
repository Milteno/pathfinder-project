export const classNames = {
  pages: {
    active: 'active',
    finder: 'active',
  },
  nav: {
    active: 'active',
  }
};
export const select = {
  containerOf: {
    pages: '#pages',
    finder: '.finder-wrapper',
    about: '.about-wrapper'
  },
  nav: {
    links: '.main-nav a',
  },
  templateOf: {
    aboutPage: '#template-about-page',
    finderPage: '#template-finder-page',
  },
  finder: {
    finder: 'finder',
    grid: '.grid',
    submitBtn: '.btnDiv',
    field: 'field',
    avaliableField: 'avaliableField',
    closeButton: '.close-button',
    popup: '.popup',
  }
};
export const templates = {
  aboutPage: Handlebars.compile(document.querySelector(select.templateOf.aboutPage).innerHTML),
  finderPage: Handlebars.compile(document.querySelector(select.templateOf.finderPage).innerHTML),
};
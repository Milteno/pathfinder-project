import {select} from '../settings.js';

class Summary {
  constructor(element) {
    const thisSummary = this;

    thisSummary.element = element;

    thisSummary.element.style.display = 'flex';

    thisSummary.element.querySelector(select.finder.closeButton).addEventListener('click', function(e) {
      e.preventDefault();
      thisSummary.element.style.display = 'none';
    });
  }
}

export default Summary;
import {select, templates, classNames} from '../settings.js';


class Finder {
  constructor(element) {
    const thisFinder = this;

    thisFinder.element = element;

    thisFinder.step = 1;
    thisFinder.start = false;
    thisFinder.end = false;
    thisFinder.grid = {};
    thisFinder.queue = [];
    thisFinder.betterGrid = [];

    for (let i = 0; i<10; i++) {
      thisFinder.betterGrid[i] = [];
      for (let j = 0; j<10; j++) {
        thisFinder.betterGrid[i][j] = 'Obstacle';
      }
    }

    for(let row = 1; row <= 10; row++) {
      thisFinder.grid[row] = {};
      for(let col = 1; col <= 10; col++) {
        thisFinder.grid[row][col] = false;
      }
    }

    thisFinder.render(element);
  }
  render(element) {
    const thisFinder = this;

    let pageData = null;
    switch(thisFinder.step) {
    case 1:
      pageData = { title: 'Draw routes', btnText: 'Finish drawing' };
      break;
    case 2:
      pageData = { title: 'Pick start and finish', btnText: 'Compute' };
      break;
    case 3:
      pageData = { title: 'The best route is', btnText: 'Start again' };
      break;
    }

    let html = '';
    for(let row = 1; row <= 10; row++) {
      for(let col = 1; col <= 10; col++) {
        html += '<div class="field" data-row="' + row + '" data-col="' + col + '"></div>';
      }
    }


    const generatedHTML = templates.finderPage(pageData);

    thisFinder.dom = {};
    thisFinder.dom.wrapper = element;
    thisFinder.dom.wrapper.innerHTML = generatedHTML;

    thisFinder.element.querySelector(select.finder.grid).innerHTML = html;
    thisFinder.initActions();
  }

  renderProgress() {
    const thisFinder = this;
    for (let single in thisFinder.grid) {
      let row = thisFinder.grid[single];
      for (let col in row) {
        if(row[col] == true) {
          thisFinder.dom.block = document.querySelector('[data-row='+ CSS.escape(single)+'][data-col='+ CSS.escape(col)+']');
          thisFinder.dom.block.classList.add(classNames.pages.finder);
          if(thisFinder.end == true && thisFinder.start == true) {
            document.querySelector('[data-row='+ CSS.escape(thisFinder.startPosition.row)+'][data-col='+ CSS.escape(thisFinder.startPosition.col)+']').classList.add('start');
            document.querySelector('[data-row='+ CSS.escape(thisFinder.endPosition.row)+'][data-col='+ CSS.escape(thisFinder.endPosition.col)+']').classList.add('end');
          }
          //console.log(thisFinder.dom.block);
          //console.log(row[col]);
          //console.log(single, col);

        }
      }
    }
  }

  setStart(target) {
    const thisFinder = this;
    if(target.classList.contains(classNames.pages.active) && thisFinder.start == false) {
      target.classList.add('start');
      thisFinder.startPosition = {
        row: parseInt(target.getAttribute('data-row')),
        col: parseInt(target.getAttribute('data-col')),
      };
      //thisFinder.grid[thisFinder.startPosition.row][thisFinder.startPosition.col] = 'start';
      thisFinder.start = true;
      console.log(thisFinder.start);
      console.log(thisFinder.startPosition.row);
      console.log(thisFinder.startPosition.col);
    }
  }

  setEnd(target) {
    const thisFinder = this;
    if(target.classList.contains(classNames.pages.active) && thisFinder.end == false) {
      target.classList.add('end');
      thisFinder.endPosition = {
        row: parseInt(target.getAttribute('data-row')),
        col: parseInt(target.getAttribute('data-col')),
      };
      //thisFinder.grid[thisFinder.endPosition.row][thisFinder.endPosition.col] = 'end';
      thisFinder.end = true;
      console.log(thisFinder.end);
      console.log(thisFinder.endPosition.row);
      console.log(thisFinder.endPosition.col);

    }
  }

  changeStep(newStep) {
    const thisFinder = this;
    thisFinder.step = newStep;
    thisFinder.render(document.querySelector(select.containerOf.finder));
  }

  colorizePath() {
    const thisFinder = this;
    console.log(thisFinder.finalPath);
    thisFinder.finalPath.pop();
    let currentBlock = {
      row: thisFinder.startPosition.row,
      col: thisFinder.startPosition.col,
    };


    for( let block of thisFinder.finalPath) {
      if (block === 'North') {
        currentBlock.row--;
        document.querySelector('[data-row='+ CSS.escape(currentBlock.row)+'][data-col='+ CSS.escape(currentBlock.col)+']').classList.add('path');
      }
      else if (block === 'South') {
        currentBlock.row++;
        document.querySelector('[data-row='+ CSS.escape(currentBlock.row)+'][data-col='+ CSS.escape(currentBlock.col)+']').classList.add('path');
      }
      else if (block === 'East') {
        currentBlock.col++;
        document.querySelector('[data-row='+ CSS.escape(currentBlock.row)+'][data-col='+ CSS.escape(currentBlock.col)+']').classList.add('path');
      }
      else if (block === 'West') {
        currentBlock.col--;
        document.querySelector('[data-row='+ CSS.escape(currentBlock.row)+'][data-col='+ CSS.escape(currentBlock.col)+']').classList.add('path');
      }
    }
  }

  createGridTable() {
    const thisFinder = this;
    thisFinder.betterGrid[thisFinder.startPosition.row-1][thisFinder.startPosition.col-1] = 'Start';
    thisFinder.betterGrid[thisFinder.endPosition.row-1][thisFinder.endPosition.col-1] = 'Goal';
    console.log(thisFinder.betterGrid);
    console.log(thisFinder.grid);
    thisFinder.finalPath = thisFinder.calculate();
  }

  calculate() {
    const thisFinder = this;

    let distanceFromTop = thisFinder.startPosition.row-1;
    console.log('distancefromtop',distanceFromTop);
    let distanceFromLeft = thisFinder.startPosition.col-1;
    console.log('distancefromleft',distanceFromLeft);

    var location = {
      distanceFromTop: distanceFromTop,
      distanceFromLeft: distanceFromLeft,
      path: [],
      status: 'Start',
    };

    let queue = [location];
    console.log(queue);
    console.log(queue.length);

    while(queue.length > 0) {
      let currentLocation = queue.shift();
      //console.log('curr',currentLocation);

      let newLocation = thisFinder.exploreInDirection(currentLocation, 'North');
      if (newLocation.status === 'Goal') {
        console.log(newLocation.path);
        return newLocation.path;
      }
      else if (newLocation.status === 'Valid') {
        queue.push(newLocation);
      }

      newLocation = thisFinder.exploreInDirection(currentLocation, 'East');
      if (newLocation.status === 'Goal') {
        console.log(newLocation.path);
        return newLocation.path;
      }
      else if (newLocation.status === 'Valid') {
        queue.push(newLocation);
      }

      newLocation = thisFinder.exploreInDirection(currentLocation, 'South');
      if (newLocation.status === 'Goal') {
        console.log(newLocation.path);
        return newLocation.path;
      }
      else if (newLocation.status === 'Valid') {
        queue.push(newLocation);
      }

      newLocation = thisFinder.exploreInDirection(currentLocation, 'West');
      if (newLocation.status === 'Goal') {
        console.log(newLocation.path);
        return newLocation.path;
      }
      else if (newLocation.status === 'Valid') {
        queue.push(newLocation);
      }
    }
    return false;
  }

  locationStatus(location) {
    const thisFinder = this;
    let gridSize = thisFinder.betterGrid.length;
    let dft = location.distanceFromTop;
    let dfl = location.distanceFromLeft;

    if(location.distanceFromLeft < 0 || location.distanceFromLeft >= gridSize || location.distanceFromTop < 0 || location.distanceFromTop >= gridSize) {
      return 'Invalid';
    }
    else if (thisFinder.betterGrid[dft][dfl] === 'Goal') {
      return 'Goal';
    }
    else if (thisFinder.betterGrid[dft][dfl] === 'Obstacle') {
      return 'Blocked';
    }
    else {
      return 'Valid';
    }
  }

  exploreInDirection(currentLocation, direction) {
    const thisFinder = this;
    let newPath = currentLocation.path.slice();
    console.log('newpath',newPath);
    newPath.push(direction);
    let dft = currentLocation.distanceFromTop;
    let dfl = currentLocation.distanceFromLeft;

    if (direction === 'North') {
      dft -= 1;
    }
    else if (direction === 'East') {
      dfl += 1;
    }
    else if (direction === 'South') {
      dft += 1;
    }
    else if (direction === 'West') {
      dfl -= 1;
    }
    let newLocation = {
      distanceFromTop: dft,
      distanceFromLeft: dfl,
      path: newPath,
      status: 'Unknown',
    };

    newLocation.status = thisFinder.locationStatus(newLocation);

    if(newLocation.status === 'Valid') {
      thisFinder.betterGrid[newLocation.distanceFromTop][newLocation.distanceFromLeft] = 'Visited';
    }
    return newLocation;
  }

  initActions() {
    const thisFinder = this;
    if(thisFinder.step === 1) {
      thisFinder.element.querySelector(select.finder.submitBtn).addEventListener('click', function(e) {
        e.preventDefault();
        thisFinder.changeStep(2);
      });

      thisFinder.element.querySelector(select.finder.grid).addEventListener('click', function(e) {
        e.preventDefault();
        if(e.target.classList.contains(select.finder.field)) {
          thisFinder.toggleField(e.target);
        }
      });
    }
    else if(thisFinder.step === 2) {
      thisFinder.renderProgress();
      thisFinder.element.querySelector(select.finder.submitBtn).addEventListener('click', function(e) {
        e.preventDefault();
        if(thisFinder.end == true) {
          thisFinder.changeStep(3);
        }
      });
      thisFinder.element.querySelector(select.finder.grid).addEventListener('click', function(e) {
        e.preventDefault();
        if(thisFinder.start == true) {
          thisFinder.setEnd(e.target);
        }
        thisFinder.setStart(e.target);
      });

    }
    else if(thisFinder.step === 3) {
      thisFinder.renderProgress();
      thisFinder.createGridTable();
      thisFinder.colorizePath();
      thisFinder.element.querySelector(select.finder.submitBtn).addEventListener('click', function(e) {
        e.preventDefault();
        thisFinder.changeStep(1);
      });
    }
  }

  toggleField(fieldElem) {
    const thisFinder = this;

    // get row and col info from field elem attrs
    const field = {
      row: fieldElem.getAttribute('data-row'),
      col: fieldElem.getAttribute('data-col'),
    };
    Object.keys(field).forEach(function(el){
      field[el] = parseInt(field[el]);
    });

    // if field with this row and col is true -> unselect it
    if(thisFinder.grid[field.row][field.col]) {

      thisFinder.grid[field.row][field.col] = false;
      fieldElem.classList.remove(classNames.pages.finder);
    }

    else {
      // flatten object to array of values e.g. [false, false, false]
      const gridValues = Object.values(thisFinder.grid)
        .map(col => Object.values(col))
        .flat();
      // if grid isn't empty...
      if(gridValues.includes(true)) {

        // determine edge fields
        const edgeFields = [];

        if(field.col > 1) edgeFields.push(thisFinder.grid[field.row][field.col-1]); //get field on the left value
        if(field.col < 10) edgeFields.push(thisFinder.grid[field.row][field.col+1]); //get field on the right value
        if(field.row > 1) edgeFields.push(thisFinder.grid[field.row-1][field.col]); //get field on the top value
        if(field.row < 10) edgeFields.push(thisFinder.grid[field.row+1][field.col]);

        // if clicked field doesn't touch at least one that is already selected -> show alert and finish function
        if(!edgeFields.includes(true)) {
          alert('A new field should touch at least one that is already selected!');
          return;
        }
      }
      // select clicked field
      thisFinder.betterGrid[field.row-1][field.col-1] = 'Empty';
      thisFinder.grid[field.row][field.col] = true;
      fieldElem.classList.add(classNames.pages.finder);
    }
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

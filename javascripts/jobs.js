console.log('Jobs Stix');

let selectedHero = '';

const printToDom = (domString, divId) => {
    document.getElementById(divId).innerHTML = domString;
};

const buildDomString = (superheroArray) => {
    let domString = '';
    superheroArray.forEach((superhero) => {
        domString += `<li>`;
        domString +=    `<a class="list-items" data-hero-id="${superhero.id}">${superhero.name}</a>`;
        domString += `</li>`;
    })
    printToDom(domString, 'awesome-dropdown');
};

const selectHero = (e) => {
    selectedHero = e.target.dataset.heroId;
    document.getElementById('awesome-button').classList.add('hide');
    genericHeroRequest(loadFileforSingleHero);
};

function executeThisIfCodeFails() {
    console.log('What happened, Stix');
};

function executeThisCodeAfterFileLoaded() {
    const data = JSON.parse(this.responseText);
    buildDomString(data.superheroes);
    addheroSelectionEventListeners();
};

const addheroSelectionEventListeners = () => {
    const listItems = document.getElementsByClassName('list-items');
    for(let i=0; i<listItems.length; i++){
        let listItemz = listItems[i];
        listItemz.addEventListener('click', selectHero);
    }
};

const displaySuperhero = heroes => {
    let domString = "";
    heroes.forEach(hero => {
        if (hero.id === selectedHero) {
            domString += `<div class="row">`;
            domString += `<div class="col-sm-4">`;
            if (hero.gender === "Male") {
                domString += `<img class="charImage maleImage" src="${
                    hero.image
                    }">`;
            } else {
                domString += `<img class="charImage femaleImage" src="${
                    hero.image
                    }">`;
            }
            domString += `</div>`;
            domString += `<div class="col-sm-6">`;
            domString += `<h2>Selected Hero: ${hero.name}</h2>`;
            domString += `<p class='charDescription'>${hero.description}</p>`;
            domString += `</div>`;
        }
    });
    printToDom(domString, "selected-hero");
};

function loadFileforSingleHero(){
    const data = JSON.parse(this.responseText);
    displaySuperhero(data.superheroes);
};

const genericHeroRequest = (successFunction) => {
    let myRequest = new XMLHttpRequest();
    myRequest.addEventListener('load', successFunction);
    myRequest.addEventListener('error', executeThisIfCodeFails);
    myRequest.open('GET', '../db/superheroes.json');
    myRequest.send();
};

const startApplication = () => {
    genericHeroRequest(executeThisCodeAfterFileLoaded);
};

startApplication();


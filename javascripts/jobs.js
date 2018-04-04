console.log('Jobs Stix');

const printToDom = (domString, divId) => {
    document.getElementById(divId).innerHTML = domString;
};


const buildDomString = (superheroArray) => {
    let domString = '';
    superheroArray.forEach((superhero) => {
        domString += `<li>`;
        domString += `<a href="#" data-hero-id="${superhero.id}">${superhero.name}</a>`;
        domString += `</li>`;
    })
    printToDom(domString, 'awesome-dropdown');
};

function executeThisIfCodeFails() {
    console.log('What happened, Stix');
};

function executeThisCodeAfterFileLoaded() {
    const data = JSON.parse(this.responseText);
    buildDomString(data.superheroes);
};

const startApplication = () => {
    let myRequest = new XMLHttpRequest();
    myRequest.addEventListener('load', executeThisCodeAfterFileLoaded);
    myRequest.addEventListener('error', executeThisIfCodeFails);
    myRequest.open('GET', '../db/superheroes.json');
    myRequest.send();
};
startApplication();


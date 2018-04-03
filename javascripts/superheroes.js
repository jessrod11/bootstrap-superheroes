console.log('Superhero Stix');

const printToDom = (domString, divId) => {
    document.getElementById(divId).innerHTML = domString;
};

const buildDomString = (superheroArray) => {
    let domString = '';
    superheroArray.forEach((superhero)=>{
        domString += `<div class="col-md-3">`;
        domString +=   `<div class="panel">`;
        domString +=   `<div class="panel-heading">`;
        domString +=      `<h3 class="panel-title">${superhero.name}</h3>`;
        domString +=   `</div>`;
        domString +=   `<div class="panel-body">`;
        domString +=     `<img class= "charImage" src="${superhero.image}">`;
        domString +=     `<p class="charDescription">${superhero.description}</p>`;
        domString +=    `</div>`;
        domString+=   `</div>`;
        domString+= `</div>`;
    })
    printToDom(domString, 'superhero-container');
};

function executeThisIfCodeFails () {
    console.log('What happened, Stix');
};

function executeThisCodeAfterFileLoaded () {
    const data= JSON.parse(this.responseText);
    buildDomString(data.superheroes);
};

const startApplication = () =>{
    let myRequest = new XMLHttpRequest();
    myRequest.addEventListener('load', executeThisCodeAfterFileLoaded);
    myRequest.addEventListener('error', executeThisIfCodeFails);
    myRequest.open('GET', '../db/superheroes.json');
    myRequest.send();
};
startApplication();


console.log('Superhero Stix');

const printToDom = (domString, divId) => {
    document.getElementById(divId).innerHTML = domString;
};

const buildDomString = (superheroArray) => {
    let domString = '';
    superheroArray.forEach((superhero)=>{
        domString += `<div>`;
        domString += `<h1>"${superhero.name}"<h1>`;
        domString += `</div>`;
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


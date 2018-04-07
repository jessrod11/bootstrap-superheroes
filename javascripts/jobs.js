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
            domString += `<div class="row super-hero">`;
            domString += `<div class="col-sm-4">`;
            if (hero.gender === "Female") {
                domString += `<img class="charImage femaleCharImage" src="${
                    hero.image
                    }">`;
            } else {
                domString += `<img class="charImage maleCharImage" src="${
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
    getJobs(heroes);
};

const refresh = () => {
    startApplication();
}

const showResetBtn = () => {
    const reset = document.getElementById('reset-page').classList.remove('hide');
}

const addDropdown =() => {
     const dropDown = document.getElementById('awesome-button').classList.remove('hide');
}

const resetPage = () => {
    const resetIt = document.getElementById('reset-page');
    resetIt.addEventListener('click', (e)=>{
        addDropdown(); 
        document.getElementById('selected-hero').innerHTML = '';
        document.getElementById('jobs').innerHTML = '';
        document.getElementById('reset-page').classList.add('hide');
    })
}

const displayJobs = (heroArray) => {
    let domString = '';
    heroArray.forEach((hero)=> {
        if(hero.id === selectedHero){
            hero.jobs.forEach((job)=>{
                domString += `<div class="col-md-4 job-title">`;
                domString += `<div class="well well-lg">${job}</div>`;
                domString += `</div>`;
            })
        }
    });
    printToDom(domString, 'jobs');
    showResetBtn();
    resetPage();
};


const megaSmash = (jobsArray, heroesArray) => {
    heroesArray.forEach((hero)=>{
        hero.jobs = [];
        hero.jobIds.forEach((jobId)=>{
            jobsArray.forEach((job)=>{
                if(job.id === jobId){
                    hero.jobs.push(job.title);
                }
            })
        })
    })
    return heroesArray;
    //returns hereoes array with job ids and jobs inside.
};

const getJobs = (heroesArray) => {
    let myJobsRequest = new XMLHttpRequest();
    myJobsRequest.addEventListener('load', jobsJSONConvert);
    myJobsRequest.addEventListener('error', executeThisIfCodeFails);
    myJobsRequest.open('GET', '../db/jobs.json');
    myJobsRequest.send();

    function jobsJSONConvert () {
        const jobsData = JSON.parse(this.responseText).jobs;
        const completeHeroes = megaSmash(jobsData, heroesArray);
        displayJobs(completeHeroes);
    }
}

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


document.addEventListener("DOMContentLoaded", function() {
  const select = document.getElementById("query");
  const firstOption = document.createElement("option");
  firstOption.value = 0;
  firstOption.text = "Press here to select";
  select.appendChild(firstOption);

  //now add all the years supported by the api
  for(let i = 1950; i <= 2021; ++i) {
    const option = document.createElement("option");
    option.value = i;
    option.text = i;
    select.appendChild(option);
  }
});

let pageSize = 3; //3 races per page
let currentPage; //page number we are at
let allRaces; //store all data found

function clearResults() {
	while(results.firstChild) {
		results.firstChild.remove();
	}
}

async function loadSearch(season) {
  let url = `http://ergast.com/api/f1/${season}.json`; //base url to call the api
  response = await fetch(url);
	return response.json();
}

function buildArticleFromData(obj) {
	const article = document.createElement("article");
	const raceTitle = document.createElement("h4");
	const raceCircuit = document.createElement("p");
	const raceDate = document.createElement("p");
	const raceRound = document.createElement("p");
  const raceLocation = document.createElement("p");
  const raceUrl = document.createElement("a");

	raceTitle.textContent = `${obj.raceName}`;
  raceCircuit.textContent = `Circuit: ${obj.Circuit.circuitName}`;
  raceDate.textContent = `Date: ${obj.date}`;
  raceRound.textContent = `Round: ${obj.round}`;
  raceLocation.textContent = `Location: ${obj.Circuit.Location.locality}, ${obj.Circuit.Location.country}`;
  raceUrl.target = "_blank";
  raceUrl.href = obj.url;
  raceUrl.textContent = `Tap here to learn more`;

	article.appendChild(raceTitle);
	article.appendChild(raceCircuit);
	article.appendChild(raceDate);
	article.appendChild(raceRound);
  article.appendChild(raceLocation);
  article.appendChild(raceUrl);

	return article;
}

async function insertRaces(races) {
  let results = document.getElementById("results");
	articles = races.map(buildArticleFromData);
	articles.forEach(a => results.appendChild(a));
}

async function loadPage() {
	clearResults();
	const racesToLoad = allRaces.slice((currentPage - 1) * pageSize, currentPage * pageSize);
	loader.classList.add("waiting");
	await insertRaces(racesToLoad);
	loader.classList.remove("waiting");
  pageIndicator.textContent = currentPage;
}

async function doSearch() {
  if(query.value >= 1950 && query.value <= 2021 ) {
  	clearResults();
  	loader.classList.add("waiting");
  	let result = await loadSearch(query.value);
    allRaces = result["MRData"]["RaceTable"]["Races"]; //save races to an array
    racesFound = result["MRData"]["total"];
  	count.textContent = `found ${racesFound} races in year ${query.value}`;
  	nPages.textContent = Math.ceil(racesFound / pageSize);
  	currentPage = 1;
  	loadPage();
  }
}

function nextPage() {
  if(Array.isArray(allRaces)){
    currentPage += 1;
    const nPages = Math.ceil(allRaces.length / pageSize);
    if(currentPage > nPages) { currentPage = 1;}
    loadPage();
  }
}
function prevPage() {
  if(Array.isArray(allRaces)){
  	currentPage -= 1;
  	const nPages = Math.ceil(allRaces.length / pageSize);
  	if(currentPage < 1) { currentPage = nPages;}
  	loadPage();
  }
}

query.addEventListener('change', doSearch);
prev.addEventListener('click', prevPage);
next.addEventListener('click', nextPage);

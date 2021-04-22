menuToggler.addEventListener('click', ev => {
  menu.classList.toggle('open');
  menuToggler.classList.toggle('open');
  main.classList.toggle('open');
  footer.classList.toggle('open');
});

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
  if(season >= 1950 && season <= 2021 ) {
    let url = `http://ergast.com/api/f1/${season}.json`; //base url to call the api
    response = await fetch(url);
  	return response.json();
  }
}

function buildArticleFromData(obj) {
	const article = document.createElement("article");
	const raceTitle = document.createElement("h4");
	const raceCircuit = document.createElement("p");
	const raceUrl = document.createElement("p");
	const raceDate = document.createElement("p");
	const raceRound = document.createElement("p");
  const raceLocation = document.createElement("p");
  const raceCountry = document.createElement("p");

	raceTitle.textContent = obj.raceName;
  raceCircuit.textContent = obj.Circuit.circuitName;
  raceUrl.textContent = obj.url;
  raceDate.textContent = obj.date;
  raceRound.textContent = obj.round;
  raceLocation.textContent = obj.Circuit.Location.locality;
  raceCountry.textContent = obj.Circuit.Location.country;

	article.appendChild(raceTitle);
	article.appendChild(raceCircuit);
	article.appendChild(raceUrl);
	article.appendChild(raceDate);
	article.appendChild(raceRound);
  article.appendChild(raceLocation);
	article.appendChild(raceCountry);

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
  console.log(racesToLoad);
	await insertRaces(racesToLoad);
	loader.classList.remove("waiting");
  pageIndicator.textContent = currentPage;
}

async function doSearch(ev) {
	clearResults();
	loader.classList.add("waiting");
	let result = await loadSearch(query.value);
  allRaces = result["MRData"]["RaceTable"]["Races"]; //save races to an array
  racesFound = result["MRData"]["total"];
	count.textContent = `found ${racesFound} results for year "${query.value}"`;
	nPages.textContent = Math.ceil(racesFound / pageSize);
	currentPage = 1;
	loadPage();
}

query.addEventListener('change', doSearch);

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



const elLoadWrap = $_(".js-load");
const elCardsWrapper = $_(".js-cards-wrapper");

const elCardTemplate = $_("#js-card-template").content;

fetch("http://www.omdbapi.com/?s=spider&apikey=2b537ff6").then((response) => response.json()).then((data) => {
  console.log(data.Search);
  elLoadWrap.style.display = "none";
  working(data.Search)
});

function working(array) {
  array.forEach(element => renderMovies(element))
}

function renderMovies(object) {

  const cloneTemplate = elCardTemplate.cloneNode(true);
  $_(".js-card-img", cloneTemplate).src = object.Poster;
  $_(".js-card-title", cloneTemplate).textContent = object.Title;
  $_(".js-movie-type", cloneTemplate).textContent = object.Type;
  $_(".js-movie-year", cloneTemplate).textContent = object.Year;

  elCardsWrapper.appendChild(cloneTemplate);
}
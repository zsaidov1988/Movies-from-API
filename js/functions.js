
function fetchApi(searchText, page) {

  fetch(`https://www.omdbapi.com/?apikey=2b537ff6&s=${searchText}&page=${page}`).then((response) => response.json()).then((data) => {
    elLoadWrap.style.display = "flex";
    elOutputResult.style.display = "inline";
    elCardsWrapper.innerHTML = "";
    if (data.Response === "False") {
      countResults = 0;
      elOutputResult.classList.add("error");
      elOutputResult.textContent = data.Error;
      elPaginationList.style.display = "none";
      elLoadWrap.style.display = "none";
    } else {
      countResults = parseInt(data.totalResults);
      elOutputResult.classList.remove("error");
      elOutputResult.textContent = `Results: ${countResults} | Page: ${pageNumber}/${Math.ceil(countResults / COUNT_MOVIE_PER_PAGE)}`;
      elPaginationList.style.display = "flex";
      elLoadWrap.style.display = "none";
      working(data.Search);
    }
  });
}

function working(array) {
  array.forEach(element => renderMovies(element))
}

function renderMovies(object) {

  const cloneTemplate = elCardTemplate.cloneNode(true);
  $_(".js-card-img", cloneTemplate).src = object.Poster;
  $_(".js-card-title", cloneTemplate).textContent = object.Title;
  $_(".js-movie-type", cloneTemplate).textContent = object.Type;
  $_(".js-movie-year", cloneTemplate).textContent = object.Year;
  $_(".js-bookmark-btn", cloneTemplate).value = object.imdbID;

  elCardsWrapper.appendChild(cloneTemplate);
}

function checkPageNumber() {
  let countpages = Math.ceil(countResults / COUNT_MOVIE_PER_PAGE);
  if (countpages === 1) {
    elPrevBtn.style.display = "none";
    elNextBtm.style.display = "none";
  } else {
    elPrevBtn.style.display = "block";
    elNextBtm.style.display = "block";
    if (pageNumber === 1) {
      elPrevBtn.style.display = "none";
    } else if (pageNumber === countpages) {
      elNextBtm.style.display = "none";
    }
  }
}

function updateBookmarkList() {
  if (localStorage.getItem("movies")) {
    let arrBookmarkMovies = localStorage.getItem("movies").split(",");
    if (arrBookmarkMovies.length === 1) {
      elBookmarkListMessage.textContent = `There are ${arrBookmarkMovies.length} movie in bookmark list`;
    } else {
      elBookmarkListMessage.textContent = `There are ${arrBookmarkMovies.length} movies in bookmark list`;
    }
    elBookmarkList.innerHTML = "";
    arrBookmarkMovies.forEach(movie => {
      createBookmarkItem(movie);
    });
  }
  else {
    elBookmarkListMessage.textContent = "There are not movies in bookmark list";
    elBookmarkList.innerHTML = "";
  }
}

function createBookmarkItem(id) {
  fetch(`https://www.omdbapi.com/?apikey=2b537ff6&i=${id}`).then((response) => response.json()).then((data) => {
    const elem = createElement("li", "d-flex align-items-center justify-content-between border border-secondary rounded-1 mb-1 p-1", "", elBookmarkList);
    createElement("span", "", data.Title, elem);
    createElement("button", "btn btn-danger btn-sm", "Delete", elem).value = data.imdbID;
  })
}

function showFixedMessage(message) {
  elFixedMessage.textContent = message;
  elFixedMessage.style.visibility = "visible";
  setTimeout(function () {
    elFixedMessage.style.visibility = "hidden";
  }, 1000);
}
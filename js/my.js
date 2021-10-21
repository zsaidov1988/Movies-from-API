
const COUNT_MOVIE_PER_PAGE = 10;

const elFixedMessage = $_(".js-fixed-message"); // Fixed messagebox when add movie to bookmark
const elLoadWrap = $_(".js-load"); // Element is shown untill loading
const elCardsWrapper = $_(".js-cards-wrapper"); // Wrapper div for movie cards
const elSearchForm = $_(".js-search-form"); // Form for search
const elSearchInput = $_(".js-search-input", elSearchForm); // Input for search text
const elViewBookmarkBtn = $_(".js-view-bookmark-btn"); // View bookmark button
const elBookmarkList = $_(".js-bookmark-list"); // Bookmark list: ul tag
const elBookmarkListMessage = $_(".js-bookmark-massage"); // P tag for any message in bookmark list
const elPaginationList = $_(".js-pagination-list"); // List of Pagination buttons
const elOutputResult = $_(".js-output-result"); // Output tag to show count of results and page number and any errors
const elPrevBtn = $_(".js-prev-btn"); // Previous button of pagination
const elNextBtm = $_(".js-next-btn"); // Next button of pagination

const elCardTemplate = $_("#js-card-template").content;

let pageNumber = 1;
let countResults = 0;

elPrevBtn.style.display = "none";
elLoadWrap.style.display = "none";
elPaginationList.style.display = "none";
elOutputResult.style.display = "none";

updateBookmarkList();

elSearchForm.addEventListener("submit", (e) => {
  e.preventDefault();
  pageNumber = 1;
  elLoadWrap.style.display = "flex";
  const searchText = elSearchInput.value.trim();
  fetchApi(searchText, pageNumber);
})

elPrevBtn.addEventListener("click", () => {
  pageNumber--;
  checkPageNumber();
  const searchText = elSearchInput.value.trim();
  fetchApi(searchText, pageNumber);
})

elNextBtm.addEventListener("click", () => {
  pageNumber++;
  checkPageNumber();
  const searchText = elSearchInput.value.trim();
  fetchApi(searchText, pageNumber);
})

elCardsWrapper.addEventListener("click", (e) => {
  if (e.target.className === "btn btn-primary js-bookmark-btn") {
    let moviesInStorage = localStorage.getItem("movies") || "";
    if (moviesInStorage === "") {
      localStorage.setItem("movies", e.target.value);
      showFixedMessage("Success!!!");
      updateBookmarkList();
    } else {
      if (moviesInStorage.includes(e.target.value)) {
        showFixedMessage("This movie has been already added to bookmark list");
      } else {
        localStorage.setItem("movies", (moviesInStorage + "," + e.target.value));
        showFixedMessage("Success!!!");
        updateBookmarkList();
      }
    }
  }
})

elViewBookmarkBtn.addEventListener("click", () => {
  updateBookmarkList();
})

elBookmarkList.addEventListener("click", (e) => {
  if (e.target.className === "btn btn-danger btn-sm") {
    let arrMoviesInLocalStor = localStorage.getItem("movies").split(",");
    const index = arrMoviesInLocalStor.indexOf(e.target.value)
    arrMoviesInLocalStor.splice(index, 1);
    localStorage.setItem("movies", arrMoviesInLocalStor);
    updateBookmarkList();
  }
})
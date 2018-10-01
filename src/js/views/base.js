// file for reusable stuff
// set the DOM element here and export the results
// just need to change here if there is changes in html
export const elements = {
  searchForm: document.getElementById('search'),
  searchInput: document.getElementById('search__field'),
  searchResult: document.getElementById('results'),
  searchResultList: document.getElementById('results__list'),
  searchResultPage: document.getElementById('results__pages')
}

export const elementStrings = {
  loader: 'loader'
}

// load spinner : use the parent element for reusability
export const renderLoader = parent => {
  // template string for loader
  const loader = `
    <div id='${elementStrings.loader}' class='${elementStrings.loader}'>
      <svg>
        <use href="img/icons.svg#icon-cw"></use>
      </svg>
    </div>
  `
  // insert the loader just after the parent element
  parent.insertAdjacentHTML('afterbegin', loader)
}

// remove spinner then list complete
export const clearLoader = () => {
  const loader = document.getElementById(`${elementStrings.loader}`)
  if (loader) {
    // remove the loader
    loader.parentElement.removeChild(loader)
  }
}

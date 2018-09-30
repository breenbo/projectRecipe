// Global app controller
import Search from './models/Search'
import {elements, renderLoader, clearLoader} from './views/base'
// import all functions from the searchView file in an object
import * as searchView from './views/searchView'

/*
* GLOBAL STATE OF THE APP
* - Search object
* - current recipe object
* - shopping list object
* - liked recipes object
*/
let state = {}

// controlSearch fonction
const controlSearch = async () => {
  // 1. get query from the view
  const query = searchView.getInput()

  if (query) {
    // 2. new search object and add to state
    state.search = new Search(query)

    // 3. Prepare UI for results
    searchView.clearInput()
    searchView.clearResults()
    renderLoader(elements.searchResult)

    // 4. Search for recipes
    await state.search.getResults()

    // 5. Display the result on UI
    clearLoader()
    searchView.renderResults(state.search.results)
  }
}

// add event listener to the search form : e as event
elements.searchForm.addEventListener('submit', e => {
  // prevent the page to reload on click on the submit button
  e.preventDefault()
  controlSearch()
})

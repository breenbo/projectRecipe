// Global app controller
import Search from './models/Search'
import Recipe from './models/Recipe'
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

// ******************
// SEARCH CONTROLLER
// ******************
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

    try {
      // 4. Search for recipes
      await state.search.getResults()
      // 5. Display the result on UI
      clearLoader()
      searchView.renderResults(state.search.results)
    } catch (err) {
      alert ('Someting wrong with the search')
      clearLoader()
    }
  }
}

// add event listener to the search form : e as event
elements.searchForm.addEventListener('submit', e => {
  // prevent the page to reload on click on the submit button
  e.preventDefault()
  controlSearch()
})

// iot have click event on buttons (that don't exist yet), have to use event delegation
elements.searchResultPage.addEventListener('click', e => {
  // use the closest method to deal with click on arrow, or text, or div of the button
  // use e.target iot know where the click happens
  const btn = e.target.closest('.btn-inline')
  if (btn) {
    const goToPage = parseInt(btn.dataset.goto, 10)
    // clear the former results
    searchView.clearResults()
    // render the new page (nmr goToPage)
    searchView.renderResults(state.search.results, goToPage)
  }
})

// ******************
// RECIPE CONTROLLER
// ******************
// add even to the global object, when hash change
const controlRecipe = async () => {
  // get the existing hash from the url
  const id = window.location.hash.replace('#', '') // window.location is the entire url
  if (id) {
    // prepare the UI for changes
    // create the new recipes
    state.recipe = new Recipe(id)
    try {
      // get recipe data and parse ingredients
      await state.recipe.getRecipe()
      console.log(state.recipe.ingredients)
      state.recipe.parseIngredients()
      console.log(state.recipe.ingredients)
      // calculate time and servings
      state.recipe.calcTime()
      state.recipe.calcServing()
    } catch (err) {
      alert('Error processing recipe')
    }
  }
}

// deal recipe on hashchange and page load
// add mutliple event to the same object :
['hashchange', 'load'].forEach(event => window.addEventListener(event, controlRecipe))

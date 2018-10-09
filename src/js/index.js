// Global app controller
import Search from './models/Search'
import Recipe from './models/Recipe'
import List from './models/List'
import Likes from './models/Likes'
import {elements, renderLoader, clearLoader} from './views/base'
// import all functions from the searchView file in an object
import * as searchView from './views/searchView'
import * as recipeView from './views/recipeView'
import * as listView from './views/listView'
import * as likeView from './views/likeView'

/*
* GLOBAL STATE OF THE APP
* - Search object
* - current recipe object
* - shopping list object
* - liked recipes object
*/
let state = {}
window.state = state

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
    recipeView.clearRecipe()
    renderLoader(elements.recipe)
    // highlight selected search item
    if (state.search) searchView.highlightSelected(id)
    // create the new recipes
    state.recipe = new Recipe(id)
    try {
      // get recipe data and parse ingredients
      await state.recipe.getRecipe()
      state.recipe.parseIngredients()
      // calculate time and servings
      state.recipe.calcTime()
      state.recipe.calcServing()
      // render the main recipe
      clearLoader()
      recipeView.renderRecipe(
        state.recipe,
        state.likes.isLiked(id)
      )
    } catch (err) {
      alert('Error processing recipe')
    }
  }
}

// deal recipe on hashchange and page load
// add mutliple event to the same object :
['hashchange', 'load'].forEach(event => window.addEventListener(event, controlRecipe))

// ******************
// LIST CONTROLLER
// ******************
const controlList = () => {
  // create a new list if none exists
  // initialize an empty list
  if (!state.list) state.list = new List()
  // add each ingredient to the list and to the UI
  state.recipe.ingredients.forEach(el => {
    const item = state.list.addItem(el.count, el.unit, el.ingredient)
    listView.renderItem(item)
  })
}

// handle delete and update list items events
elements.shopping.addEventListener('click', e => {
  // get the id of the ingredient of the clicked element
  const id = e.target.closest('.shopping__item').dataset.itemid
  // handle the delete button
  if (e.target.matches('.shopping__delete, .shopping__delete *')) {
    // delete from state
    state.list.deleteItem(id)
    // delete from UI
    listView.deleteItem(id)
  // handle the count update
  } else if (e.target.matches('.shopping__count-value')) {
    const val = parseFloat(e.target.value, 10)
    state.list.updateCount(id, val)
  }
})

// ******************
// LIKE CONTROLLER
// ******************
// TESTING
state.likes = new Likes()

const controlLike = () => {
  if (!state.likes) state.likes = new Likes()
  const currentID = state.recipe.id

  // user HAS NOT yet liked the current recipe
  if (!state.likes.isLiked(currentID)) {
    // add like to the state
    const newLike = state.likes.addLike(
      currentID,
      state.recipe.title,
      state.recipe.author,
      state.recipe.img
    )
    // toggle like button
    likeView.toggleLikeBtn(true)
    // add recipe to UI list
    likeView.renderLike(newLike)
  // user HAS liked the current recipe
  } else {
    // remove like to the state
    state.likes.deleteLike(currentID)
    // toggle like button
    likeView.toggleLikeBtn(false)
    // remove recipe to UI list
    likeView.deleteLike(currentID)
  }
  likeView.toggleLikeMenu(state.likes.getNumLikes())
}

// use event delegation on the +/- buttons because the element don't exist yet
// check the target of the click event
elements.recipe.addEventListener('click', e => {
  // match btn or all of its child element
  if (e.target.matches('.btn-decrease, .btn-decrease *')) {
    // decrease button is clicked
    if (state.recipe.servings > 1) {
      state.recipe.updateServings('dec')
      recipeView.updateServingsIngredients(state.recipe)
    }
  } else if (e.target.matches('.btn-increase, .btn-increase *')) {
    // increase button is clicked
    state.recipe.updateServings('inc')
    recipeView.updateServingsIngredients(state.recipe)
  } else if (e.target.matches('.recipe__btn--add, .recipe__btn--add *')) {
    // add ingredients to the shopping list
    controlList()
  } else if (e.target.matches('.recipe__love, .recipe__love *')) {
    controlLike()
  }
})

// TESTING
window.l = new List()

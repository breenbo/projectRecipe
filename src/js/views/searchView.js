import {elements} from './base'
// get the user input and export the result
export const getInput = () => elements.searchInput.value

// clear the search input
export const clearInput = () => {
  elements.searchInput.value = ''
}

// clear the previous results : remove all html inside the ul
export const clearResults = () => {
  elements.searchResultList.innerHTML = ''
  elements.searchResultPage.innerHTML = ''
}

// highlight the selected recipe in the search column
export const highlightSelected = id => {
  // cool trick to remove a class from a getElementByClassName results
  const resultArr = Array.from(document.getElementsByClassName('results__link'))
  resultArr.forEach(el => {
    el.classList.remove('results__link--active')
  })
  document.querySelector(`.results__link[href*='${id}']`).classList.add('results__link--active')
}

// shorten the titles
/*
* 'Pasta with tomato sauce'
* acc = 0 / acc + cur.length = 5 (first word)
* < limit, so push to the array
* acc = 5
*/
export const limitRecipeTitle = (title, limit = 17) => {
  const newTitle = []
  if (title.length > limit) {
    // use reduce to use a callback fonction on each array element produced by the split method
    title.split(' ').reduce((acc, cur) => {
      if (acc + cur.length < limit) {
        newTitle.push(cur)
      }
      return acc + cur.length
    }, 0)
    // return the result
    return `${newTitle.join(' ')}...`
  }
  return title
}

// render only one recipe - no need to export outside the view module
const renderRecipe = recipe => {
  // use template string to create the html for the recipe
  const markup = `
    <li>
        <a class="results__link results__link--active" href="#${recipe.recipe_id}">
            <figure class="results__fig">
                <img src="${recipe.image_url}" alt="recipe image">
            </figure>
            <div class="results__data">
                <h4 class="results__name">${limitRecipeTitle(recipe.title)}</h4>
                <p class="results__author">${recipe.publisher}</p>
            </div>
        </a>
    </li>
  `
  // insert html chunk
  elements.searchResultList.insertAdjacentHTML('beforeend', markup)
}

// function to display the results in view
// deal with the array of 30 recipes received after the AJAX call
export const renderResults = (recipes, page = 1, resultsPerPage = 10) => {
  // render list of recipes
  // define start and end to display only resultsPerPage
  const start = (page - 1) * resultsPerPage
  const end = page * resultsPerPage
  // loop in array and apply renderRecipe in each element
  // cut the array with slice between start and end
  recipes.slice(start, end).forEach(renderRecipe)

  // render the page buttons
  renderButtons(page, recipes.length, resultsPerPage)
}

// create the button depending of type (prev or next)
// use data-goto html
const createButton = (page, type) => `
  <button class="btn-inline results__btn--${type}" data-goto=${type === 'prev' ? page - 1 : page + 1}>
      <span>Page ${type === 'prev' ? page - 1 : page + 1}</span>
      <svg class="search__icon">
          <use href="img/icons.svg#icon-triangle-${type === 'prev' ? 'left' : 'right'}"></use>
      </svg>
  </button>
`

// render the buttons to navigate between the pages
export const renderButtons = (page, numberResults, resultsPerPage) => {
  const pages = Math.ceil(numberResults / resultsPerPage)
  // declare button with let for reassignment, and outside if because block scoped
  let button
  if (page === 1 && pages > 1) {
    // Only next button
    button = createButton(page, 'next')
  } else if (page < pages) {
    // Both button
    // create a string with the both buttons (html IS a string)
    button = `
      ${createButton(page, 'prev')}
      ${createButton(page, 'next')}
    `
  } else if (page === pages && pages > 1) {
    // Only prev button
    button = createButton(page, 'prev')
  }

  // add button to the page
  elements.searchResultPage.insertAdjacentHTML('afterbegin', button)
}

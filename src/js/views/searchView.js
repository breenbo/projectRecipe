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

// render only one recipe - no need to export outside de view module
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
export const renderResults = recipes => {
  // loop in array and apply renderRecipe in each element
  recipes.forEach(renderRecipe)
}

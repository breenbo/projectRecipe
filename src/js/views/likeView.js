import {elements} from './base'
import {limitRecipeTitle} from './searchView'

// toggle button on the main recipe
export const toggleLikeBtn = isLiked => {
  const iconString = isLiked ? 'icon-heart' : 'icon-heart-outlined'
  document.querySelector('.recipe__love use').setAttribute('href', `img/icons.svg#${iconString}`)
}

// toggle button on the right header
export const toggleLikeMenu = numLikes => {
  elements.likesMenu.style.visibility = numLikes > 0 ? 'visible' : 'hidden'
}

// render like view
export const renderLike = like => {
  const markup = `
    <li>
        <a class="likes__link" href="#${like.id}">
            <figure class="likes__fig">
                <img src="${like.img}" alt="${like.title} image">
            </figure>
            <div class="likes__data">
                <h4 class="likes__name">${limitRecipeTitle(like.title)}</h4>
                <p class="likes__author">${like.author}</p>
            </div>
        </a>
    </li>
  `
  elements.likesList.insertAdjacentHTML('beforeend', markup)
}

export const deleteLike = id => {
  // select the element with the id in href, including the li (parent element)
  const el = document.querySelector(`.likes__link[href*="${id}"]`).parentElement
  // remove the element by climbing to the parent
  if (el) el.parentElement.removeChild(el)
}

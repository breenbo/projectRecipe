import axios from 'axios'
import {key} from '../config'

export default class Recipe {
  constructor (id) {
    this.id = id
  }
  async getRecipe () {
    try {
      const res = await axios(`https://www.food2fork.com/api/get?key=${key}&rId=${this.id}`)
      this.title = res.data.recipe.title
      this.author = res.data.recipe.publisher
      this.img = res.data.recipe.image_url
      this.url = res.data.recipe.source_url
      this.ingredients = res.data.recipe.ingredients
    } catch (error) {
      console.log(error)
      alert('Something went wrong :(')
    }
  }

  calcTime () {
    // assuming need 5 minutes for each ingredients to be prepared
    this.time = this.ingredients.length * 5
  }

  calcServing () {
    this.servings = 4
  }

  parseIngredients () {
    const newIngredients = this.ingredient.map(el => {
      // 1. uniforms units
      // 2. Remove parnthese
      // 3. parse ingredient into count, unit and ingredient
    })
    this.ingredients = newIngredients
  }
}

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
      alert('Something went wrong for getting the recipe :(')
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
    const unitsLong = ['tablespoons', 'tablespoon', 'ounces', 'ounce', 'teaspoons', 'teaspoon', 'cups', 'pounds']
    const unitsShort = ['tblsp', 'tblsp', 'oz', 'oz', 'tsp', 'tsp', 'cup', 'pound']
    const units = [...unitsShort, 'kg', 'g']
    const newIngredients = this.ingredients.map(el => {
      // 1. uniforms units
      let ingredient = el.toLowerCase()
      unitsLong.forEach((unit, i) => {
        // replace each unit long name with the short one
        ingredient = ingredient.replace(unit, unitsShort[i])
      })
      // 2. Remove parenthese
      ingredient = ingredient.replace(/ *\([^)]*\) */g, ' ')
      // 3. parse ingredient into count, unit and ingredient
      // parse the ingredient into an array
      const arrIng = ingredient.split(' ')
      // search the index of the units in the new array
      // for each element of ArrIng, search if it includes a short unit
      const unitIndex = arrIng.findIndex(el2 => units.includes(el2))

      // need to define object outside the block because it's block scoped
      let objIng
      if (unitIndex > -1) {
        // there is a unit
        // retrieve count like 1 1/2 : slice before the unit
        // Ex. 4 1/2, arrCount is [4, 1/2] --> eval('4 + 1/2') --> 4.5
        const arrCount = arrIng.slice(0, unitIndex)
        let count
        if (arrCount.length === 1) {
          count = eval(arrIng[0].replace('-', '+'))
        } else {
          // calculate the count of the two part of the unit
          count = eval(arrIng.slice(0, unitIndex).join('+'))
        }
        objIng = {
          count,
          unit: arrIng[unitIndex],
          ingredient: arrIng.slice(unitIndex + 1).join(' ')
        }
      } else if (parseInt(unitIndex[0], 10)) {
        // there is no unit, but a number
        objIng = {
          count: parseInt(arrIng[0], 10),
          unit: '',
          ingredient: arrIng.slice(1).join(' ')
        }
      } else if (unitIndex === -1) {
        // there is no unit
        objIng = {
          count: 1,
          unit: '',
          ingredient
        }
      }

      return objIng
    })
    this.ingredients = newIngredients
  }

  updateServings (type) {
    // Servings
    const newServings = type === 'dec' ? this.servings - 1 : this.servings + 1
    // Ingredients
    // use the new servings to calculate the new ingredients
    // update each element of the ingredients array
    this.ingredients.forEach(ing => {
      ing.count *= (newServings / this.servings)
    })
    this.servings = newServings
  }
}

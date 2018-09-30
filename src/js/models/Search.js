import axios from 'axios'
// export the result of the search value with class
export default class Search {
  // define the class with a constructor
  constructor (query) {
    this.query = query
  }
  // use a method to have the results for the search
  async getResults () {
    // save the API key in a const
    const key = 'ce49a58b7aab9e3b80798d934918baf2'
    // use try (for success) catch (for error) with the async fonction
    try {
      // save the ajax request result in a const res with await, which return a promise
      const res = await axios(`https://www.food2fork.com/api/search?key=${key}&q=${this.query}`)
      // take only the recipes in the answer
      this.results = res.data.recipes

    } catch (error) {
      alert(error)
    }
  }
}

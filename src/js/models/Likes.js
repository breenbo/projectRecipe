export default class Likes {
  constructor () {
    this.likes = []
  }
  addLike (id, title, author, img) {
    const like = {id, title, author, img}
    this.likes.push(like)
    // persist data with local storage
    this.persistData()
    // return the like
    return like
  }
  deleteLike (id) {
    const index = this.likes.findIndex(el => el.id === id)
    this.likes.splice(index, 1)
    this.persistData()
  }
  // method to test if a recipe is liked
  isLiked (id) {
    return this.likes.findIndex(el => el.id === id) !== -1
  }
  // get number of likes
  getNumLikes () {
    return this.likes.length
  }
  // localStorage to store string (and only string)
  // localStorage use (key, strings)
  persistData () {
    // transform the array to a string with JSON.stringify
    localStorage.set('likes', JSON.stringify(this.likes))
  }
  // method to retrieve the datas from localStorage
  readStorage () {
    // transform string to array with JSON.parse
    const storage = JSON.parse(localStorage.getItem('likes'))
    // restore the likes array from localStorage
    if(storage) this.likes = storage
  }
}

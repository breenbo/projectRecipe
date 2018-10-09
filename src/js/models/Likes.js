export default class Likes {
  constructor () {
    this.likes = []
  }
  addLike (id, title, author, img) {
    const like = {id, title, author, img}
    this.likes.push(like)
    return like
  }
  deleteLike (id) {
    const index = this.likes.findIndex(el => el.id === id)
    this.likes.splice(index, 1)
  }
  // method to test if a recipe is liked
  isLiked (id) {
    return this.likes.findIndex(el => el.id === id) !== -1
  }
  // get number of likes
  getNumLikes () {
    return this.likes.length
  }
}

// use external librairie to create unique id
import uniqid from 'uniqid'

export default class List {
  constructor () {
    // store in an array
    this.items = []
  }
  // method to create an object list
  addItem (count, unit, ingredient) {
    const item = {
      id: uniqid(),
      count,
      unit,
      ingredient
    }
    // store each item object in items array
    this.items.push(item)
    return item
  }
  deleteItem (id) {
    // use splice method to remove items from an array (mutate the array)
    // [2,4,6].splice(1,2) -> return [4,6], array is [2] -> mutate
    // [2,4,6].slice(1,2) -> return 4, array still [2,4,6] -> non mutate
    const index = this.items.findIndex(el => el.id === id)
    this.items.splice(index, 1)
  }
  updateCount (id, newCount) {
    // change the count of the element in items with the good id
    // loop through the items array
    this.items.find(el => el.id === id).count = newCount
  }
}

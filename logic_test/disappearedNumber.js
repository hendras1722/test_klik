function findDisapperared(numb) {
  const maxNumber =
    Math.max(...numb) < numb.length ? numb.length : Math.max(...numb)
  let result = []

  for (let i = 1; i <= maxNumber; i++) {
    if (!numb.includes(i)) {
      result.push(i)
    }
  }
  return result
}

console.log(findDisapperared([4, 3, 2, 7, 8, 2, 3, 1])) // [5,6]
console.log(findDisapperared([1, 1, 3, 6])) // [2,4,5]
console.log(findDisapperared([1, 1])) // [2]
console.log(findDisapperared([3, 4])) // [1, 2]
console.log(findDisapperared([8, 7, 5, 6, 2, 5, 2, 1])) // [3, 4]

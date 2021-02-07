/**
 * A simple function to geneerate the array containing the size.
 * @param {Number} size A positive number that defines the board size
 */
export default function generateEmptyBoard() {
  let array = [];
  let id = 0;

  for (let cols = 0; cols < 9; cols++) {
    for (let rows = 0; rows < 9; rows++) {
      array.push({
        id: id++,
        value: 0,
      });
    }
  }

  return array;
}

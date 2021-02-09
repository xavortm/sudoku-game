export const isNumber = (str) => {
  return str.length === 1 && str.match(/[0-9]/i);
};

/**
 * Convert 1D array to 2D array by splitting to equal 9 cell chunks
 * @param {Array} array The 1D array input
 */
export const convertLinearToMatrix = (array) => {
  if (array.length !== 81) {
    console.error("Your array isnt with length of 81");
    return;
  }

  return new Array(Math.ceil(array.length / 9))
    .fill()
    .map((_) => array.splice(0, 9));
};

/**
 * Convert 2D array to 1D.
 * @param {Array} array The 2D array
 */
export const convertMatrixToLinear = (array) => {
  return [].concat.apply([], array);
};

export const generateFromApi = (array) => {
  const generated = convertMatrixToLinear(array).map((element, index) => {
    return {
      id: index,
      value: element,
      write: element === 0,
    };
  });

  return generated;
};

export const cleanUserChanges = (array) => {
  const cleanArray = [...array];

  cleanArray.forEach((e) => {
    e.value = e.write ? 0 : e.value;
  });

  return cleanArray;
};

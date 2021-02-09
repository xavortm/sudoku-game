import React, { useEffect, useState, useCallback } from "react";

import { isNumber } from "../../utilities/sudoku";

const Cell = ({ value, id, updateValue, write }) => {
  const [isIn, setIsIn] = useState(false);

  const downHandler = useCallback(
    ({ key }) => {
      if (isIn && isNumber(key) && write) {
        updateValue(key, id);
      }
    },
    [updateValue, id, isIn, write]
  );

  useEffect(() => {
    window.addEventListener("keydown", downHandler);

    return () => {
      window.removeEventListener("keydown", downHandler);
    };
  }, [downHandler]);

  const mouseEnterHandler = () => {
    setIsIn(true);
  };

  const mouseLeaveHandler = () => {
    setIsIn(false);
  };

  const handleClick = () => {
    // Clean the element if it's clicked.
    if (write) {
      updateValue("", id);
    }
  };

  return (
    <span
      onMouseLeave={mouseLeaveHandler}
      onMouseEnter={mouseEnterHandler}
      onClick={handleClick}
      className="cell"
      data-value={value}
      data-write={write}
    >
      {value}
    </span>
  );
};

export default React.memo(Cell);

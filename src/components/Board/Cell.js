import React, { useEffect, useState, useCallback } from "react";

const isNumber = (str) => {
  return str.length === 1 && str.match(/[0-9]/i);
};

const Cell = ({ value, id, updateValue }) => {
  const [isIn, setIsIn] = useState(false);

  const downHandler = useCallback(
    ({ key }) => {
      if (isIn && isNumber(key)) {
        updateValue(key, id);
      }
    },
    [updateValue, id, isIn]
  );

  useEffect(() => {
    console.log("I rerendered");

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
    updateValue("", id);
  };

  return (
    <span
      onMouseLeave={mouseLeaveHandler}
      onMouseEnter={mouseEnterHandler}
      onClick={handleClick}
      className="cell"
      data-value={value}
    >
      {value}
    </span>
  );
};

export default React.memo(Cell);

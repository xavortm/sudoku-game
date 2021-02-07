import React, { useState, useCallback } from "react";
import PropTypes from "prop-types";

import generateEmptyBoard from "../../utilities/boardUtils";
import "./Board.scss";

import Cell from "./Cell";

/**
 * Generate the markup of the sudoku puzzle
 * @param {Number} param0 Size - the size of the board.
 */
const Board = ({ size }) => {
  // Hold the current table state (state of the game)
  const [tableData, setTableData] = useState(generateEmptyBoard());

  // const updateValue = (value, index) => {
  //   const newData = [...tableData];
  //   newData[index].value = value;
  //   setTableData(newData);
  // };

  const updateValue = useCallback(
    (value, index) => {
      const newData = [...tableData];
      newData[index].value = value;
      setTableData(newData);
    },
    [tableData]
  );

  const resetBoard = () => {
    setTableData(generateEmptyBoard());
  };

  const tableHTML = tableData.map((cell) => {
    return (
      <Cell
        key={cell.id}
        id={cell.id}
        value={cell.value}
        updateValue={updateValue}
      >
        {cell.value}
      </Cell>
    );
  });

  return (
    <>
      <div className="board">{tableHTML}</div>
      <button onClick={resetBoard}>Reset Board</button>
    </>
  );
};

Board.propTypes = {
  size: PropTypes.number,
};

export default Board;

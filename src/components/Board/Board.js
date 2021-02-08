import React, { useState, useCallback, useEffect } from "react";
import PropTypes from "prop-types";

import generateEmptyBoard from "../../utilities/boardUtils";
import { generateFromApi } from "../../utilities/sudoku";
import "./Board.scss";

import Cell from "./Cell";

/**
 * Generate the markup of the sudoku puzzle
 * @param {Number} param0 Size - the size of the board.
 */
const Board = ({ size }) => {
  // Hold the current table state (state of the game)
  const [tableData, setTableData] = useState(generateEmptyBoard());

  useEffect(() => {
    fetch("https://sugoku.herokuapp.com/board?difficulty=easy")
      .then((res) => res.json())
      .then((result) => {
        setTableData(generateFromApi(result.board));
      });
  }, []);

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
        write={cell.write}
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

import { useState } from "react";
import Board from "./board";

export default function Game() {
    const [history, setHistory] = useState([
      { squares: Array(9).fill(null).map(() => ({ value: null, highlight: false })), targetIndex: -1, end: false }
    ]);
    const [reverse, setReverse] = useState(false)
    const [currentMove, setCurrentMove] = useState(0);
    const xIsNext = currentMove % 2 === 0;
    const currentStep = history[currentMove];
  
    function handlePlay(nextSquares: any) {
      const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];
      setHistory(nextHistory);
      setCurrentMove(nextHistory.length - 1);
    }

    function jumpTo(nextMove: number) {
      setCurrentMove(nextMove);
    }

    function calculateRowCol(index: number) {
      const row = Math.floor(index / 3);
      const col = index % 3;
      return { row, col };
    }
    const moves = history.map((step, move) => {
      let description;
      if (move > 0) {
        const location = calculateRowCol(step.targetIndex)
        description = `Go to move #${move} (${location.row}, ${location.col})`;
      } else {
        description = 'Go to game start';
      }
      return (
        <li key={move}>
          <button onClick={() => jumpTo(move)}>{description}</button>
        </li>
      );
    });
    return (
      <div className="game">
        <div className="game-board">
          <Board xIsNext={xIsNext} step={currentStep} onPlay={handlePlay}  />
        </div>
        <div className="game-info">
          <button onClick={()=> {
            setReverse(!reverse)
          }}>{reverse ? "Descending" : "Ascending" }</button>
          <ol className={reverse ? "list_reverse" :  ""}>{moves}
            {currentMove + 1 < 10 && !currentStep.end &&  <li>You are at move #{currentMove + 1}</li>}
          </ol>
        </div>
      </div>
    );
  }
  
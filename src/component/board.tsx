import Square from "./square"

function calculateWinner(step: any) {
    let checkDraw = 0 
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
        if (step.squares[a].value && step.squares[b].value && step.squares[c].value) {
            if (step.squares[a].value === step.squares[b].value && step.squares[a].value === step.squares[c].value) {
                step.squares[a].highlight = true
                step.squares[b].highlight = true
                step.squares[c].highlight = true
                return step.squares[a].value;
            } 
            checkDraw +=1
        }
    }
    if( checkDraw == 8) {
        return "Draw!"
    }
    return null;
  }

function Board({ xIsNext, step, onPlay }: { xIsNext: any; step: any, onPlay: any }) {
    function checkEnd(step: any) {
        if (calculateWinner(step)) {
            step.end = true
        }
    }   
    function handleClick(i : number) {
        if (calculateWinner(step) || step.squares[i].value) {
            return;
        }
        const nextStep =  JSON.parse(JSON.stringify(step));
        nextStep.targetIndex = i
        if (xIsNext) {
            nextStep.squares[i].value = "X";
        } else {
            nextStep.squares[i].value = "O";
        }
        checkEnd(nextStep)
        onPlay(nextStep);
    }
    const winner = calculateWinner(step);
    let status;
    if (winner) {
        status = winner ==  "Draw!" ? winner : "Winner: " + winner;
    } else {
        status = "Next player: " + (xIsNext ? "X" : "O");
    }


    const rows = [];
    const size = 3; 

    for (let row = 0; row < size; row++) {
        const squaresInRow = [];
        for (let col = 0; col < size; col++) {
        const index = row * size + col; 
        squaresInRow.push(
            <Square
            key={index}
            value={step.squares[index].value}
            highlight={step.squares[index].highlight}
            onSquareClick={() => handleClick(index)}
            />
        );
        }
        rows.push(
        <div className="board-row" key={row}>
            {squaresInRow}
        </div>
        );
    }

    return (
        <>
            <div className="status">{status}</div>
            {rows}
        </>
    );
}

export default Board;
function Square({ value, onSquareClick, highlight }: { value: any; onSquareClick: any; highlight: boolean }) {
  return (
    <button className={`square ${highlight ? 'highlight': ''}`} onClick={onSquareClick}>
      {value}
    </button>
  );
}

export default Square;

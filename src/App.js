import './App.css';
import Board from './components/Board';
import './styles/root.scss'
import React, {useState} from 'react';
import { calculateWinner } from './helpers';
import History from './components/History';

function App() {
  // const [squares, setSquares] = useState( Array(9).fill(null));
  const [history, setHistory] = useState( [{squares: Array(9).fill(null), isXNext:true}]);
  const [currentMove, setCurrentMove] = useState(0)
  const current = history[currentMove]
  // const [isXNext, setIsXNext] = useState(false);

  const winner = calculateWinner(current.squares)
  const message = winner ? `Winner is ${winner}` : `Next Player is ${current.isXNext ? 'X' : 'O'}`

  const handleSquareClick =(clickedPosition)=>{
    if(current.squares[clickedPosition] || winner){
      return;
    }

    setHistory((currentSquares)=>{
      const last = currentSquares[currentSquares.length - 1]
      const newBoard = last.squares.map((squareValue, position)=>{
        if(clickedPosition === position){
          return last.isXNext ? 'X' : 'O'
        }
        return squareValue;
      });

      return currentSquares.concat({ squares:newBoard, isXNext: !last.isXNext })
    });
    setCurrentMove(currentSquares => currentSquares + 1)
  };

  const moveTo = (move)=>{
    setCurrentMove(move)
  }

  return (
    <div className="App">
      <h1>TIC TAC TOE</h1>
      <h2>{message}</h2>
      <Board squares={current.squares} handleSquareClick={handleSquareClick}/>
      <History history={history} moveTo={moveTo} currentMove={currentMove} />
    </div>
  );
}

export default App;

import { useState, useEffect, useCallback } from "react";

export default function HomeBuyerGame() {
  const [playerPosition, setPlayerPosition] = useState(80);
  const [gameOver, setGameOver] = useState(false);
  const [won, setWon] = useState(false);
  const gridSize = 9;
  const homePosition = 4;
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(60);
  const [difficulty, setDifficulty] = useState("easy");
  const [coins, setCoins] = useState([]);

  const createObstacles = useCallback(() => {
    const obstacles = new Array(gridSize * gridSize).fill(false);
    const obstacleChance =
      difficulty === "easy" ? 0.3 : difficulty === "medium" ? 0.5 : 0.7;
    for (let i = gridSize; i < obstacles.length - gridSize; i += gridSize) {
      if (Math.random() < obstacleChance) {
        obstacles[i + Math.floor(Math.random() * (gridSize - 1))] = true;
      }
    }
    obstacles[80] = false; // Player start
    obstacles[4] = false; // Home position
    return obstacles;
  }, [difficulty]);

  const [obstacles, setObstacles] = useState(createObstacles());

  const createCoins = useCallback(() => {
    const newCoins = [];
    for (let i = 0; i < 5; i++) {
      let position;
      do {
        position = Math.floor(Math.random() * (gridSize * gridSize));
      } while (
        obstacles[position] ||
        position === playerPosition ||
        position === homePosition
      );
      newCoins.push(position);
    }
    return newCoins;
  }, [obstacles, playerPosition]);

  const movePlayer = useCallback(
    (direction) => {
      if (gameOver || won) return;

      setPlayerPosition((prevPos) => {
        let newPos = prevPos;
        switch (direction) {
          case "ArrowUp":
            newPos = prevPos - gridSize;
            break;
          case "ArrowDown":
            newPos = prevPos + gridSize;
            break;
          case "ArrowLeft":
            newPos = prevPos % gridSize !== 0 ? prevPos - 1 : prevPos;
            break;
          case "ArrowRight":
            newPos =
              prevPos % gridSize !== gridSize - 1 ? prevPos + 1 : prevPos;
            break;
        }

        if (coins.includes(newPos)) {
          setScore((prevScore) => prevScore + 10);
          setCoins((prevCoins) => prevCoins.filter((coin) => coin !== newPos));
        }
        if (newPos < 0 || newPos >= gridSize * gridSize || obstacles[newPos]) {
          setGameOver(true);
          return prevPos;
        }

        if (newPos === homePosition) {
          setWon(true);
        }

        return newPos;
      });
    },
    [gameOver, won, obstacles, coins]
  );

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (
        ["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"].includes(event.key)
      ) {
        event.preventDefault();
        movePlayer(event.key);
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [movePlayer]);

  useEffect(() => {
    if (!gameOver && !won) {
      const timer = setInterval(() => {
        setTimeLeft((prevTime) => {
          if (prevTime <= 1) {
            clearInterval(timer);
            setGameOver(true);
            return 0;
          }
          return prevTime - 1;
        });
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [gameOver, won]);

  const resetGame = () => {
    setPlayerPosition(80);
    setObstacles(createObstacles());
    setCoins(createCoins());
    setGameOver(false);
    setWon(false);
    setScore(0);
    setTimeLeft(60);
  };

  const changeDifficulty = (newDifficulty) => {
    setDifficulty(newDifficulty);
    resetGame();
  };
  return (
    <section className="bg-white border-2 border-gray-400 p-5 shadow-md">
      <h3 className="text-blue-800 text-xl font-bold mb-3 underline text-center">
        Home Buyer Game
      </h3>
      <p className="mb-4 text-center">
        Navigate through obstacles to reach your dream home!
      </p>
      <div className="flex justify-between mb-4 text-lg font-bold">
        <p className="bg-blue-100 px-3 py-1 rounded-full">Score: {score}</p>
        <p className="bg-blue-100 px-3 py-1 rounded-full">Time: {timeLeft}s</p>
      </div>
      <div
        className="grid grid-cols-9 gap-1 mb-6 mx-auto bg-blue-50 p-3 rounded-lg border-2 border-blue-200"
        style={{ width: "380px" }}
      >
        {Array(gridSize * gridSize)
          .fill()
          .map((_, index) => (
            <div
              key={index}
              className={`w-10 h-10 border-2 flex items-center justify-center text-xl rounded-md ${
                index === playerPosition
                  ? "bg-green-400 border-green-600"
                  : index === homePosition
                  ? "bg-yellow-300 border-yellow-500"
                  : obstacles[index]
                  ? "bg-red-400 border-red-600"
                  : coins.includes(index)
                  ? "bg-yellow-400 border-yellow-600"
                  : "bg-white border-gray-200"
              }`}
            >
              {index === playerPosition && "👤"}
              {index === homePosition && "🏠"}
              {coins.includes(index) && "💰"}
            </div>
          ))}
      </div>
      {gameOver && (
        <p className="text-red-500 font-bold text-center mb-4">
          Game Over! You hit an obstacle.
        </p>
      )}
      {won && (
        <p className="text-green-500 font-bold text-center mb-4">
          Congratulations! You reached your dream home!
        </p>
      )}
      <div className="flex space-x-4 mb-4 justify-center">
        {["easy", "medium", "hard"].map((level) => (
          <button
            key={level}
            onClick={() => changeDifficulty(level)}
            className={`px-3 py-1 rounded-full font-bold transition-colors ${
              difficulty === level
                ? "bg-blue-500 text-white"
                : "bg-gray-200 text-blue-800 hover:bg-blue-100"
            }`}
          >
            {level.charAt(0).toUpperCase() + level.slice(1)}
          </button>
        ))}
      </div>
      <div className="text-center">
        <button
          onClick={resetGame}
          className="bg-yellow-300 text-blue-800 font-bold py-2 px-6 rounded-full border-2 border-yellow-500 hover:bg-yellow-400 transition-colors"
        >
          {gameOver || won ? "Play Again" : "Reset Game"}
        </button>
      </div>
      <div className="mt-4 text-center bg-blue-50 p-3 rounded-lg border border-blue-200">
        <p className="font-bold mb-2">How to Play:</p>
        <p>Use arrow keys to move.</p>
        <div className="flex justify-center space-x-4 mt-2">
          <span>👤 You</span>
          <span>🏠 Dream Home</span>
          <span>🟥 Obstacles</span>
          <span>💰 Coins</span>
        </div>
      </div>
    </section>
  );
}

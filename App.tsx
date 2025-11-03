import React, { useState, useCallback } from 'react';
import Game from './components/Game';
import MuteIcon from './components/MuteIcon';
import { GameState } from './types';
import { playMusic, stopMusic, playSound, toggleMute, isMuted as getMuteState, initializeAudio } from './utils/sounds';

const App: React.FC = () => {
  const [gameState, setGameState] = useState<GameState>(GameState.Ready);
  const [finalScore, setFinalScore] = useState(0);
  const [isMuted, setIsMuted] = useState(getMuteState());
  const [isAudioInitialized, setIsAudioInitialized] = useState(false);

  const handleToggleMute = () => {
    setIsMuted(toggleMute());
  };

  const handleGameOver = useCallback((score: number) => {
    setFinalScore(score);
    setGameState(GameState.GameOver);
    stopMusic();
    playSound('gameOver');
  }, []);

  const handleRestart = () => {
    setFinalScore(0);
    setGameState(GameState.Playing);
    playMusic();
  };

  const handleStart = () => {
    if (!isAudioInitialized) {
        initializeAudio();
        setIsAudioInitialized(true);
    }
    setGameState(GameState.Playing);
    playMusic();
  };

  const renderContent = () => {
    switch (gameState) {
      case GameState.Playing:
        return <Game onGameOver={handleGameOver} />;
      case GameState.GameOver:
        return (
          <div className="relative flex flex-col items-center justify-center bg-gray-800 text-white p-12 rounded-2xl shadow-2xl border-4 border-red-500">
            <button onClick={handleToggleMute} className="absolute top-4 right-4 text-white w-8 h-8 hover:text-gray-300">
              <MuteIcon isMuted={isMuted} />
            </button>
            <h2 className="text-6xl font-extrabold text-red-400 mb-4">Game Over</h2>
            <p className="text-3xl mb-8">Your final score is: <span className="font-bold text-yellow-300">{finalScore}</span></p>
            <button
              onClick={handleRestart}
              className="px-8 py-4 bg-green-500 text-white text-2xl font-bold rounded-lg hover:bg-green-600 transition-transform transform hover:scale-105 shadow-lg"
            >
              Play Again
            </button>
          </div>
        );
      case GameState.Ready:
      default:
        return (
          <div className="relative flex flex-col items-center justify-center bg-gray-800 text-white p-12 rounded-2xl shadow-2xl border-4 border-blue-500">
            <button onClick={handleToggleMute} className="absolute top-4 right-4 text-white w-8 h-8 hover:text-gray-300">
              <MuteIcon isMuted={isMuted} />
            </button>
            <h1 className="text-5xl md:text-7xl font-extrabold text-yellow-300 mb-2 tracking-wide">Math Racer</h1>
            <p className="text-xl md:text-2xl mb-8 text-gray-300">Drive into the correct lane to solve the math problem!</p>
            <button
              onClick={handleStart}
              className="px-10 py-5 bg-blue-500 text-white text-3xl font-bold rounded-lg hover:bg-blue-600 transition-transform transform hover:scale-105 shadow-lg"
            >
              Start Game
            </button>
          </div>
        );
    }
  };

  return (
    <main className="w-screen h-screen flex items-center justify-center p-4 bg-gray-900 font-sans">
      <div className="aspect-[9/16] h-full max-h-full max-w-full">
        {renderContent()}
      </div>
    </main>
  );
};

export default App;

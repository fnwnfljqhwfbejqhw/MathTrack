import React, { useState, useCallback } from 'react';
import Game from './components/Game';
import MuteIcon from './components/MuteIcon';
import CarIcon from './components/CarIcon';
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
          <div className="relative w-full h-full bg-gray-600 overflow-hidden select-none border-8 border-gray-800 rounded-2xl shadow-2xl">
            {/* Road Lines */}
            <div className="absolute inset-0 h-[200%] w-full animate-road-scroll" style={{ animationDuration: '10s' }}>
                <div className="absolute left-1/3 top-0 -ml-[5px] w-[10px] h-full bg-repeating-dash"></div>
                <div className="absolute left-2/3 top-0 -ml-[5px] w-[10px] h-full bg-repeating-dash"></div>
            </div>
            <style>{`
              .bg-repeating-dash {
                  background-image: repeating-linear-gradient(
                      white 0,
                      white 40px,
                      transparent 40px,
                      transparent 80px
                  );
              }
            `}</style>
            
            <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/60 p-4">
                <div className="relative flex flex-col items-center justify-center bg-gray-800/80 backdrop-blur-sm text-white p-8 md:p-12 rounded-2xl shadow-2xl border-4 border-red-500 w-full max-w-md">
                    <button onClick={handleToggleMute} className="absolute top-4 right-4 text-white w-8 h-8 hover:text-gray-300 z-10">
                        <MuteIcon isMuted={isMuted} />
                    </button>
                    <h2 className="text-5xl md:text-6xl font-extrabold text-red-400 mb-4" style={{ textShadow: '0 0 10px #ef4444' }}>Game Over</h2>
                    <p className="text-2xl md:text-3xl mb-8">Your score: <span className="font-bold text-yellow-300 text-4xl">{finalScore}</span></p>
                    <button
                        onClick={handleRestart}
                        className="px-8 py-4 bg-green-500 text-white text-2xl font-bold rounded-lg hover:bg-green-600 transition-transform transform hover:scale-105 shadow-lg animate-pulse"
                    >
                        Play Again
                    </button>
                </div>
            </div>
        </div>
        );
      case GameState.Ready:
      default:
        return (
          <div className="relative w-full h-full bg-gray-600 overflow-hidden select-none border-8 border-gray-800 rounded-2xl shadow-2xl">
            {/* Road Lines */}
            <div className="absolute inset-0 h-[200%] w-full animate-road-scroll">
                <div className="absolute left-1/3 top-0 -ml-[5px] w-[10px] h-full bg-repeating-dash"></div>
                <div className="absolute left-2/3 top-0 -ml-[5px] w-[10px] h-full bg-repeating-dash"></div>
            </div>
            <style>{`
              .bg-repeating-dash {
                  background-image: repeating-linear-gradient(
                      white 0,
                      white 40px,
                      transparent 40px,
                      transparent 80px
                  );
              }
            `}</style>
            
            <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/50 p-4">
              <div className="relative flex flex-col items-center justify-center bg-gray-800/80 backdrop-blur-sm text-white p-8 md:p-12 rounded-2xl shadow-2xl border-4 border-blue-500 w-full max-w-md">
                <button onClick={handleToggleMute} className="absolute top-4 right-4 text-white w-8 h-8 hover:text-gray-300 z-10">
                  <MuteIcon isMuted={isMuted} />
                </button>
                
                <div className="w-24 h-40 mb-4">
                  <CarIcon />
                </div>
                
                <h1 className="text-5xl md:text-6xl font-extrabold text-yellow-300 mb-2 tracking-wide text-center" style={{ textShadow: '0 0 10px #fef08a, 0 0 20px #f59e0b' }}>
                  Math Racer
                </h1>
                <p className="text-lg md:text-xl mb-6 text-gray-200 text-center">
                  Drive into the correct lane to solve the math problem!
                </p>

                <div className="mb-8 text-center bg-gray-900/50 p-4 rounded-lg">
                    <h3 className="text-lg font-bold text-gray-100 mb-2">Controls</h3>
                    <div className="flex items-center justify-center space-x-6">
                        <div className="flex items-center space-x-2 text-lg">
                            <span className="text-3xl font-mono p-1 rounded bg-gray-700/80">&larr;</span>
                            <span className="font-semibold">Left</span>
                        </div>
                        <div className="flex items-center space-x-2 text-lg">
                            <span className="font-semibold">Right</span>
                            <span className="text-3xl font-mono p-1 rounded bg-gray-700/80">&rarr;</span>
                        </div>
                    </div>
                </div>

                <button
                  onClick={handleStart}
                  className="px-10 py-5 bg-blue-500 text-white text-2xl md:text-3xl font-bold rounded-lg hover:bg-blue-600 transition-all transform hover:scale-105 shadow-lg animate-pulse"
                >
                  Start Game
                </button>
              </div>
            </div>
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

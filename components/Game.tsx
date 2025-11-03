import React, { useState, useEffect, useCallback, useRef } from 'react';
import { Problem, AnswerOption } from '../types';
import { generateProblem, generateAnswerOptions } from '../utils/gameLogic';
import CarIcon from './CarIcon';
import { playSound } from '../utils/sounds';


interface GameProps {
  onGameOver: (score: number) => void;
}

const LANE_POSITIONS = ['20%', '50%', '80%']; // For translateX -50%
const CAR_Y_POSITION_PERCENT = 80;
const ANSWER_START_Y_PERCENT = -20;
const ANSWER_SPEED = 0.5; // Percentage per frame
const ANSWER_INTERVAL = 4000; // ms between answers appearing

const Game: React.FC<GameProps> = ({ onGameOver }) => {
  const [score, setScore] = useState(0);
  const [carLane, setCarLane] = useState(1);
  const [problem, setProblem] = useState<Problem | null>(null);
  const [answerOptions, setAnswerOptions] = useState<AnswerOption[]>([]);
  
  const [answersY, setAnswersY] = useState(ANSWER_START_Y_PERCENT);
  const [showAnswers, setShowAnswers] = useState(false);
  const [feedback, setFeedback] = useState<'correct' | 'incorrect' | null>(null);

  const animationFrameId = useRef<number>();
  const answerTimerId = useRef<number>();

  const setupNewProblem = useCallback(() => {
    const newProblem = generateProblem();
    setProblem(newProblem);
    setAnswerOptions(generateAnswerOptions(newProblem.answer));
    setShowAnswers(false);
    
    answerTimerId.current = window.setTimeout(() => {
      setAnswersY(ANSWER_START_Y_PERCENT);
      setShowAnswers(true);
    }, ANSWER_INTERVAL);
  }, []);
  
  useEffect(() => {
    setupNewProblem();
    return () => {
      if (answerTimerId.current) clearTimeout(answerTimerId.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleCorrectAnswer = useCallback(() => {
    setScore(prev => prev + 1);
    setFeedback('correct');
    playSound('correct');
    setTimeout(() => setFeedback(null), 300);
    setupNewProblem();
  }, [setupNewProblem]);

  const handleIncorrectAnswer = useCallback(() => {
    setFeedback('incorrect');
    playSound('incorrect');
    setTimeout(() => onGameOver(score), 500);
  }, [onGameOver, score]);

  const gameLoop = useCallback(() => {
    if (showAnswers) {
      setAnswersY(prevY => {
        const newY = prevY + ANSWER_SPEED;
        if (newY >= CAR_Y_POSITION_PERCENT) {
          setShowAnswers(false);
          const selectedAnswer = answerOptions[carLane];
          if (selectedAnswer.isCorrect) {
            handleCorrectAnswer();
          } else {
            handleIncorrectAnswer();
          }
          return ANSWER_START_Y_PERCENT;
        }
        return newY;
      });
    }
    animationFrameId.current = requestAnimationFrame(gameLoop);
  }, [showAnswers, answerOptions, carLane, handleCorrectAnswer, handleIncorrectAnswer]);

  useEffect(() => {
    animationFrameId.current = requestAnimationFrame(gameLoop);
    return () => {
      if (animationFrameId.current) cancelAnimationFrame(animationFrameId.current);
    };
  }, [gameLoop]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (feedback) return; // Disable controls during feedback
      
      let laneChanged = false;
      if (e.key === 'ArrowLeft') {
        setCarLane(lane => {
          const newLane = Math.max(0, lane - 1);
          if (newLane !== lane) laneChanged = true;
          return newLane;
        });
      } else if (e.key === 'ArrowRight') {
        setCarLane(lane => {
          const newLane = Math.min(2, lane + 1);
          if (newLane !== lane) laneChanged = true;
          return newLane;
        });
      }
      
      if (laneChanged) {
        playSound('move');
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [feedback]);
  
  const getFeedbackBg = () => {
    if (feedback === 'correct') return 'bg-green-500/50';
    if (feedback === 'incorrect') return 'bg-red-500/50';
    return '';
  };

  return (
    <div className={`relative w-full h-full bg-gray-600 overflow-hidden select-none border-8 border-gray-800 rounded-2xl shadow-2xl transition-colors duration-300 ${getFeedbackBg()}`}>
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

      {/* Score */}
      <div className="absolute top-4 left-1/2 -translate-x-1/2 bg-gray-900/80 text-white px-6 py-2 rounded-xl text-3xl font-bold shadow-lg">
        SCORE: {score}
      </div>

      {/* Answers */}
      {showAnswers && answerOptions.map((option, index) => (
        <div
          key={index}
          className="absolute w-1/3 text-center transition-transform duration-100"
          style={{
            left: `${(100 / 3) * index}%`,
            top: `${answersY}%`,
            transform: 'translateY(-50%)',
          }}
        >
          <span className="text-7xl md:text-8xl font-extrabold text-white" style={{ WebkitTextStroke: '4px black' }}>
            {option.value}
          </span>
        </div>
      ))}
      
      {/* Car */}
      <div
        className="absolute w-1/6 md:w-1/5 max-w-[100px] transition-all duration-300 ease-out"
        style={{
          left: LANE_POSITIONS[carLane],
          top: `${CAR_Y_POSITION_PERCENT}%`,
          transform: 'translate(-50%, -50%)',
        }}
      >
        <CarIcon />
      </div>

      {/* Problem */}
      <div className="absolute bottom-5 left-5 right-5 text-center bg-blue-600/90 text-white px-6 py-3 rounded-2xl text-2xl md:text-3xl font-bold shadow-2xl border-4 border-blue-400">
        {problem ? `${problem.num1} + ${problem.num2} = ?` : 'Loading...'}
      </div>
    </div>
  );
};

export default Game;

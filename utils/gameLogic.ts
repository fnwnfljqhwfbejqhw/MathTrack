
import { Problem, AnswerOption } from '../types';

export const generateProblem = (): Problem => {
  const num1 = Math.floor(Math.random() * 10) + 1;
  const num2 = Math.floor(Math.random() * 10) + 1;
  return {
    num1,
    num2,
    operator: '+',
    answer: num1 + num2,
  };
};

export const generateAnswerOptions = (correctAnswer: number): AnswerOption[] => {
  const options: AnswerOption[] = [{ value: correctAnswer, isCorrect: true }];

  while (options.length < 3) {
    const offset = Math.floor(Math.random() * 5) + 1;
    const sign = Math.random() < 0.5 ? 1 : -1;
    let incorrectAnswer = correctAnswer + offset * sign;

    if (incorrectAnswer <= 0) {
        incorrectAnswer = correctAnswer + offset;
    }
    
    if (incorrectAnswer === correctAnswer) {
        incorrectAnswer++;
    }

    if (!options.some(opt => opt.value === incorrectAnswer)) {
      options.push({ value: incorrectAnswer, isCorrect: false });
    }
  }

  // Shuffle the array using Fisher-Yates algorithm
  for (let i = options.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [options[i], options[j]] = [options[j], options[i]];
  }
  
  return options;
};

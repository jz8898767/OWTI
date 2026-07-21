import React, { useState, useCallback } from 'react';
import type { TestPhase, UserAnswers, OptionKey, HeroProfile } from './types';
import { questions } from './data/questions';
import { calculateDimensionScores, findBestMatch } from './utils/scoring';
import StartPage from './components/StartPage';
import QuestionCard from './components/QuestionCard';
import ResultCard from './components/ResultCard';

const App: React.FC = () => {
  const [phase, setPhase] = useState<TestPhase>('start');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<UserAnswers>({});
  const [result, setResult] = useState<HeroProfile | null>(null);

  const handleStart = useCallback(() => {
    setPhase('testing');
    setCurrentIndex(0);
    setAnswers({});
    setResult(null);
  }, []);

  const handleSelect = useCallback((key: OptionKey) => {
    const q = questions[currentIndex];
    setAnswers(prev => ({ ...prev, [q.id]: key }));
  }, [currentIndex]);

  const handlePrev = useCallback(() => {
    if (currentIndex > 0) {
      setCurrentIndex(prev => prev - 1);
    }
  }, [currentIndex]);

  const handleNext = useCallback(() => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex(prev => prev + 1);
    } else {
      // 完成所有题目，计算结果
      const scores = calculateDimensionScores(answers);
      const match = findBestMatch(scores);
      setResult(match.hero);
      setPhase('result');
    }
  }, [currentIndex, answers]);

  const handleRestart = useCallback(() => {
    setPhase('start');
    setCurrentIndex(0);
    setAnswers({});
    setResult(null);
  }, []);

  return (
    <div className="app">
      <div className="container">
        {phase === 'start' && <StartPage onStart={handleStart} />}
        {phase === 'testing' && (
          <QuestionCard
            question={questions[currentIndex]}
            currentIndex={currentIndex}
            total={questions.length}
            selectedAnswer={answers[questions[currentIndex].id] ?? null}
            onSelect={handleSelect}
            onPrev={handlePrev}
            onNext={handleNext}
          />
        )}
        {phase === 'result' && result && (
          <ResultCard hero={result} onRestart={handleRestart} />
        )}
      </div>
    </div>
  );
};

export default App;

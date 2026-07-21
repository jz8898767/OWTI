import React from 'react';
import type { Question, OptionKey } from '../types';
import ProgressBar from './ProgressBar';

interface Props {
  question: Question;
  currentIndex: number;
  total: number;
  selectedAnswer: OptionKey | null;
  onSelect: (key: OptionKey) => void;
  onPrev: () => void;
  onNext: () => void;
}

const QuestionCard: React.FC<Props> = ({
  question,
  currentIndex,
  total,
  selectedAnswer,
  onSelect,
  onPrev,
  onNext,
}) => {
  const options: { key: OptionKey; label: string; text: string }[] = [
    { key: 'A', label: 'A', text: question.options.A },
    { key: 'B', label: 'B', text: question.options.B },
    { key: 'C', label: 'C', text: question.options.C },
  ];

  return (
    <div className="question-card">
      <ProgressBar current={currentIndex + 1} total={total} />
      <div className="question-number">第 {question.id} 题</div>
      <h2 className="question-text">{question.text}</h2>
      <div className="options-list">
        {options.map((opt) => (
          <button
            key={opt.key}
            className={`option-btn ${selectedAnswer === opt.key ? 'selected' : ''}`}
            onClick={() => onSelect(opt.key)}
          >
            <span className="option-key">{opt.label}</span>
            <span className="option-text">{opt.text}</span>
          </button>
        ))}
      </div>
      <div className="question-nav">
        <button
          className="btn-nav"
          onClick={onPrev}
          disabled={currentIndex === 0}
        >
          ← 上一题
        </button>
        <span className="nav-hint">
          {selectedAnswer ? '已选择' : '请选择一个选项'}
        </span>
        <button
          className="btn-nav btn-next"
          onClick={onNext}
          disabled={!selectedAnswer}
        >
          {currentIndex === total - 1 ? '查看结果 →' : '下一题 →'}
        </button>
      </div>
    </div>
  );
};

export default QuestionCard;

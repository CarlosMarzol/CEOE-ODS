import React from 'react';
import { Question, QuestionOption } from '../types';
import { OPTIONS } from '../data';

interface QuestionCardProps {
  question: Question;
  selectedValue?: number;
  onSelect: (value: number) => void;
}

export const QuestionCard: React.FC<QuestionCardProps> = ({ question, selectedValue, onSelect }) => {
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-4">
      <h3 className="text-lg font-semibold text-gray-900 mb-5 leading-relaxed">
        {question.text}
      </h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-3">
        {OPTIONS.map((option) => {
          const isSelected = selectedValue === option.value;
          
          let baseClasses = "relative flex flex-col p-4 cursor-pointer rounded border text-sm transition-all duration-200 focus:outline-none h-full";
          let stateClasses = isSelected
            ? "border-blue-900 bg-blue-50 text-blue-900 ring-1 ring-blue-900 shadow-md"
            : "border-gray-300 hover:border-blue-400 hover:bg-gray-50 text-gray-600";

          return (
            <button
              key={option.value}
              onClick={() => onSelect(option.value)}
              className={`${baseClasses} ${stateClasses}`}
            >
              <div className="flex items-center mb-2">
                <div className={`w-4 h-4 rounded-full border mr-2 flex items-center justify-center ${isSelected ? 'border-blue-900' : 'border-gray-400'}`}>
                  {isSelected && <div className="w-2 h-2 rounded-full bg-blue-900" />}
                </div>
                <span className="font-bold">{option.label}</span>
              </div>
              {option.description && (
                <span className="text-xs text-left text-gray-500 leading-tight">
                  {option.description}
                </span>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
};
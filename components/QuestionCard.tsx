import React from 'react';
import { Question } from '../types';
import { OPTIONS } from '../data';
import { Check } from 'lucide-react';

interface QuestionCardProps {
  question: Question;
  selectedValue?: number;
  onSelect: (value: number) => void;
}

export const QuestionCard: React.FC<QuestionCardProps> = ({ question, selectedValue, onSelect }) => {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 md:p-8 hover:shadow-md transition-shadow duration-300">
      <h3 className="text-lg md:text-xl font-medium text-gray-900 mb-6 leading-relaxed">
        {question.text}
      </h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-3">
        {OPTIONS.map((option) => {
          const isSelected = selectedValue === option.value;
          
          let baseClasses = "relative group flex flex-col p-4 cursor-pointer rounded-lg border text-sm transition-all duration-200 focus:outline-none h-full select-none";
          let stateClasses = isSelected
            ? "border-blue-900 bg-blue-50/50 text-blue-900 ring-2 ring-blue-900 shadow-sm z-10"
            : "border-gray-200 hover:border-blue-300 hover:bg-gray-50 text-gray-600";

          return (
            <div
              key={option.value}
              onClick={() => onSelect(option.value)}
              className={`${baseClasses} ${stateClasses}`}
              role="radio"
              aria-checked={isSelected}
              tabIndex={0}
            >
              <div className="flex items-center justify-between mb-2">
                <span className={`font-bold transition-colors ${isSelected ? 'text-blue-900' : 'text-gray-700 group-hover:text-blue-800'}`}>
                    {option.label}
                </span>
                <div className={`w-5 h-5 rounded-full border flex items-center justify-center transition-all
                    ${isSelected ? 'border-blue-900 bg-blue-900' : 'border-gray-300 bg-white'}`}>
                  {isSelected && <Check size={12} className="text-white" />}
                </div>
              </div>
              {option.description && (
                <span className={`text-xs text-left leading-tight transition-colors ${isSelected ? 'text-blue-800' : 'text-gray-500'}`}>
                  {option.description}
                </span>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
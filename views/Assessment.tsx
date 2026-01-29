import React, { useMemo } from 'react';
import { Section, Question } from '../types';
import { QUESTIONS } from '../data';
import { QuestionCard } from '../components/QuestionCard';
import { ProgressBar } from '../components/ProgressBar';
import * as Icons from 'lucide-react';

interface AssessmentProps {
  section: Section;
  answers: Record<string, number>;
  onAnswer: (questionId: string, value: number) => void;
  onNext: () => void;
  onPrev: () => void;
  isFirst: boolean;
  isLast: boolean;
}

export const Assessment: React.FC<AssessmentProps> = ({
  section,
  answers,
  onAnswer,
  onNext,
  onPrev,
  isFirst,
  isLast
}) => {
  const sectionQuestions = useMemo(() => 
    QUESTIONS.filter(q => q.category === section.id), 
    [section.id]
  );

  const answeredCount = sectionQuestions.filter(q => answers[q.id] !== undefined).length;
  const isComplete = answeredCount === sectionQuestions.length;

  // Dynamic icon rendering
  const IconComponent = (Icons as any)[section.icon] || Icons.HelpCircle;

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 pb-28">
      {/* Section Header */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 mb-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="flex items-center gap-5">
            <div className={`p-4 rounded text-white shadow-sm ${section.color}`}>
              <IconComponent size={28} />
            </div>
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-gray-400">Dimensión</span>
              <h2 className="text-2xl font-bold text-gray-900">{section.title}</h2>
              <p className="text-gray-600 mt-1">{section.description}</p>
            </div>
          </div>
          <div className="w-full md:w-64">
             <ProgressBar 
                current={answeredCount} 
                total={sectionQuestions.length} 
                label="Avance"
                colorClass={section.color.replace('bg-', 'bg-')} 
             />
          </div>
        </div>
      </div>

      {/* Questions List */}
      <div className="space-y-4">
        {sectionQuestions.map((question) => (
          <QuestionCard
            key={question.id}
            question={question}
            selectedValue={answers[question.id]}
            onSelect={(val) => onAnswer(question.id, val)}
          />
        ))}
      </div>

      {/* Navigation Footer */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4 z-10">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <button
            onClick={onPrev}
            disabled={isFirst}
            className={`px-6 py-3 rounded font-bold uppercase tracking-wider text-sm border transition-colors
              ${isFirst 
                ? 'border-gray-200 text-gray-300 cursor-not-allowed' 
                : 'border-gray-300 text-gray-600 hover:bg-gray-50'
              }`}
          >
            Anterior
          </button>
          
          <div className="text-sm font-medium text-gray-500 hidden sm:block">
            {answeredCount} / {sectionQuestions.length} contestadas
          </div>

          <button
            onClick={onNext}
            disabled={!isComplete}
            className={`px-8 py-3 rounded font-bold uppercase tracking-wider text-sm text-white transition-all shadow-sm
              ${!isComplete 
                ? 'bg-gray-300 cursor-not-allowed' 
                : 'bg-blue-900 hover:bg-blue-800'
              }`}
          >
            {isLast ? 'Ver Resultados' : 'Siguiente'}
          </button>
        </div>
      </div>
    </div>
  );
};
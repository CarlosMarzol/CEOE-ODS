import React, { useMemo, useEffect, useState } from 'react';
import { Section } from '../types';
import { QUESTIONS } from '../data';
import { QuestionCard } from '../components/QuestionCard';
import { ProgressBar } from '../components/ProgressBar';
import * as Icons from 'lucide-react';
import { Save, ArrowRight, ArrowLeft } from 'lucide-react';

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

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [isSaving, setIsSaving] = useState(false);

  // Reset index when section changes
  useEffect(() => {
    setCurrentQuestionIndex(0);
    window.scrollTo(0, 0);
  }, [section.id]);

  // Effect to simulate "Saving" state when answers change
  useEffect(() => {
    if (Object.keys(answers).length > 0) {
        setIsSaving(true);
        const timer = setTimeout(() => setIsSaving(false), 800);
        return () => clearTimeout(timer);
    }
  }, [answers]);

  const currentQuestion = sectionQuestions[currentQuestionIndex];
  const hasAnsweredCurrent = answers[currentQuestion.id] !== undefined;
  
  // Dynamic icon rendering
  const IconComponent = (Icons as any)[section.icon] || Icons.HelpCircle;

  const handleNextStep = () => {
    if (currentQuestionIndex < sectionQuestions.length - 1) {
        setCurrentQuestionIndex(prev => prev + 1);
        window.scrollTo(0, 0);
    } else {
        onNext();
    }
  };

  const handlePrevStep = () => {
    if (currentQuestionIndex > 0) {
        setCurrentQuestionIndex(prev => prev - 1);
        window.scrollTo(0, 0);
    } else {
        onPrev();
    }
  };

  // Check if this is the absolute last step of the entire assessment
  const isFinalStep = isLast && currentQuestionIndex === sectionQuestions.length - 1;

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 pb-32">
      {/* Section Header (Compact) */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-8 relative overflow-hidden">
        <div className={`absolute top-0 right-0 w-24 h-24 opacity-5 transform translate-x-6 -translate-y-6 rounded-full ${section.color}`}></div>
        
        <div className="flex items-center justify-between relative z-10">
          <div className="flex items-center gap-4">
            <div className={`p-3 rounded-lg text-white shadow-sm ${section.color}`}>
              <IconComponent size={24} />
            </div>
            <div>
              <div className="flex items-center gap-2">
                 <span className="text-xs font-bold uppercase tracking-widest text-gray-400">Dimensión {isFirst ? '1' : 'Actual'}</span>
                 {isSaving && (
                    <span className="flex items-center text-[10px] text-green-600 font-medium animate-pulse">
                        <Save size={10} className="mr-1" /> Guardado
                    </span>
                 )}
              </div>
              <h2 className="text-xl font-bold text-gray-900">{section.title}</h2>
            </div>
          </div>
          
          <div className="hidden md:block w-48">
             <ProgressBar 
                current={currentQuestionIndex + 1} 
                total={sectionQuestions.length} 
                label={`Pregunta ${currentQuestionIndex + 1} de ${sectionQuestions.length}`}
                colorClass={section.color.replace('bg-', 'bg-')} 
             />
          </div>
        </div>
      </div>

      {/* Single Question Card */}
      <div className="min-h-[400px] flex flex-col justify-center">
          <div key={currentQuestion.id} className="animate-fadeIn">
            <QuestionCard
                question={currentQuestion}
                selectedValue={answers[currentQuestion.id]}
                onSelect={(val) => {
                    onAnswer(currentQuestion.id, val);
                    // Auto-advance after a short delay to show selection feedback
                    setTimeout(() => {
                        handleNextStep();
                    }, 400); 
                }}
            />
          </div>
      </div>

      {/* Navigation Footer */}
      <div className="fixed bottom-0 left-0 right-0 bg-white/90 backdrop-blur-md border-t border-gray-200 p-4 z-30 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)]">
        <div className="max-w-4xl mx-auto flex justify-between items-center">
          
          <button
            onClick={handlePrevStep}
            disabled={isFirst && currentQuestionIndex === 0}
            className={`flex items-center px-6 py-3 rounded-md font-bold uppercase tracking-wider text-sm border transition-colors
              ${(isFirst && currentQuestionIndex === 0)
                ? 'border-gray-200 text-gray-300 cursor-not-allowed' 
                : 'border-gray-300 text-gray-600 hover:bg-gray-50 hover:text-blue-900'
              }`}
          >
            <ArrowLeft size={18} className="mr-2" />
            Anterior
          </button>
          
          <div className="text-sm font-medium text-gray-500 block">
            <span className="font-bold text-blue-900">{currentQuestionIndex + 1}</span> / {sectionQuestions.length}
          </div>

          <button
            onClick={handleNextStep}
            // We allow proceeding if user wants to skip (as per previous logic), 
            // but you can uncomment the next line to force an answer:
            // disabled={!hasAnsweredCurrent}
            className={`flex items-center px-8 py-3 rounded-md font-bold uppercase tracking-wider text-sm text-white transition-all shadow-md transform active:scale-95
              bg-blue-900 hover:bg-blue-800 hover:shadow-lg`}
          >
            {isFinalStep ? 'Ver Resultados' : 'Siguiente'}
            {!isFinalStep && <ArrowRight size={18} className="ml-2" />}
          </button>
        </div>
      </div>
    </div>
  );
};
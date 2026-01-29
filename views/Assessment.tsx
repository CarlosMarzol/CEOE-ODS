import React, { useMemo, useEffect, useState } from 'react';
import { Section, Question } from '../types';
import { QUESTIONS } from '../data';
import { QuestionCard } from '../components/QuestionCard';
import { ProgressBar } from '../components/ProgressBar';
import * as Icons from 'lucide-react';
import { Save } from 'lucide-react';

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

  const [isSaving, setIsSaving] = useState(false);

  // Effect to simulate "Saving" state when answers change
  useEffect(() => {
    if (Object.keys(answers).length > 0) {
        setIsSaving(true);
        const timer = setTimeout(() => setIsSaving(false), 800);
        return () => clearTimeout(timer);
    }
  }, [answers]);

  const answeredCount = sectionQuestions.filter(q => answers[q.id] !== undefined).length;
  const isComplete = answeredCount === sectionQuestions.length;

  // Dynamic icon rendering
  const IconComponent = (Icons as any)[section.icon] || Icons.HelpCircle;

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 pb-28">
      {/* Section Header */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 mb-8 relative overflow-hidden">
        {/* Decorative background element */}
        <div className={`absolute top-0 right-0 w-32 h-32 opacity-5 transform translate-x-8 -translate-y-8 rounded-full ${section.color}`}></div>
        
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10">
          <div className="flex items-center gap-5">
            <div className={`p-4 rounded-lg text-white shadow-sm ${section.color}`}>
              <IconComponent size={28} />
            </div>
            <div>
              <div className="flex items-center gap-2">
                 <span className="text-xs font-bold uppercase tracking-widest text-gray-400">Dimensión</span>
                 {isSaving && (
                    <span className="flex items-center text-[10px] text-green-600 font-medium animate-pulse">
                        <Save size={10} className="mr-1" /> Guardado
                    </span>
                 )}
              </div>
              <h2 className="text-2xl font-bold text-gray-900">{section.title}</h2>
              <p className="text-gray-600 mt-1 text-sm md:text-base">{section.description}</p>
            </div>
          </div>
          <div className="w-full md:w-64">
             <ProgressBar 
                current={answeredCount} 
                total={sectionQuestions.length} 
                label="Progreso Sección"
                colorClass={section.color.replace('bg-', 'bg-')} 
             />
          </div>
        </div>
      </div>

      {/* Questions List */}
      <div className="space-y-6">
        {sectionQuestions.map((question, idx) => (
          <div key={question.id} className="animate-fadeIn" style={{ animationDelay: `${idx * 50}ms` }}>
            <QuestionCard
                question={question}
                selectedValue={answers[question.id]}
                onSelect={(val) => onAnswer(question.id, val)}
            />
          </div>
        ))}
      </div>

      {/* Navigation Footer */}
      <div className="fixed bottom-0 left-0 right-0 bg-white/90 backdrop-blur-md border-t border-gray-200 p-4 z-30 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)]">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <button
            onClick={onPrev}
            disabled={isFirst}
            className={`px-6 py-3 rounded-md font-bold uppercase tracking-wider text-sm border transition-colors
              ${isFirst 
                ? 'border-gray-200 text-gray-300 cursor-not-allowed' 
                : 'border-gray-300 text-gray-600 hover:bg-gray-50 hover:text-blue-900'
              }`}
          >
            Anterior
          </button>
          
          <div className="text-sm font-medium text-gray-500 hidden sm:block">
            <span className="font-bold text-blue-900">{answeredCount}</span> de <span className="font-bold">{sectionQuestions.length}</span> preguntas
          </div>

          <button
            onClick={onNext}
            disabled={!isComplete}
            className={`px-8 py-3 rounded-md font-bold uppercase tracking-wider text-sm text-white transition-all shadow-md transform active:scale-95
              ${!isComplete 
                ? 'bg-gray-300 cursor-not-allowed shadow-none' 
                : 'bg-blue-900 hover:bg-blue-800 hover:shadow-lg'
              }`}
          >
            {isLast ? 'Ver Resultados' : 'Siguiente'}
          </button>
        </div>
      </div>
    </div>
  );
};
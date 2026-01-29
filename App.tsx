import React, { useState, useEffect } from 'react';
import { AssessmentState, CompanyData } from './types';
import { SECTIONS } from './data';
import { Welcome } from './views/Welcome';
import { CompanyInfo } from './views/CompanyInfo';
import { Assessment } from './views/Assessment';
import { Results } from './views/Results';

const STORAGE_KEY = 'ceoe_ods_assessment_state';

const INITIAL_STATE: AssessmentState = {
  step: 'welcome',
  companyData: {
    size: '',
    sector: '',
    location: '',
    role: ''
  },
  answers: {},
  currentSectionIndex: 0
};

export default function App() {
  const [state, setState] = useState<AssessmentState>(() => {
    // Attempt to load from local storage
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        return JSON.parse(saved);
      }
    } catch (e) {
      console.error('Error loading state', e);
    }
    return INITIAL_STATE;
  });

  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  // Save to local storage on change
  useEffect(() => {
    if (isClient) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    }
  }, [state, isClient]);

  const handleStart = () => {
    setState(prev => ({ ...prev, step: 'company-info' }));
  };

  const handleCompanyInfoSubmit = (data: CompanyData) => {
    setState(prev => ({
      ...prev,
      companyData: data,
      step: 'assessment'
    }));
  };

  const handleAnswer = (questionId: string, value: number) => {
    setState(prev => ({
      ...prev,
      answers: { ...prev.answers, [questionId]: value }
    }));
  };

  const handleNextSection = () => {
    if (state.currentSectionIndex < SECTIONS.length - 1) {
      window.scrollTo(0, 0);
      setState(prev => ({
        ...prev,
        currentSectionIndex: prev.currentSectionIndex + 1
      }));
    } else {
      setState(prev => ({ ...prev, step: 'results' }));
    }
  };

  const handlePrevSection = () => {
    if (state.currentSectionIndex > 0) {
      window.scrollTo(0, 0);
      setState(prev => ({
        ...prev,
        currentSectionIndex: prev.currentSectionIndex - 1
      }));
    }
  };

  const handleReset = () => {
    if (window.confirm('¿Está seguro de que desea reiniciar? Se perderán todos los datos.')) {
      setState(INITIAL_STATE);
      localStorage.removeItem(STORAGE_KEY);
      window.scrollTo(0, 0);
    }
  };

  if (!isClient) return null;

  // Render Logic
  const renderContent = () => {
    switch (state.step) {
      case 'welcome':
        return <Welcome onStart={handleStart} />;
      case 'company-info':
        return <CompanyInfo initialData={state.companyData} onNext={handleCompanyInfoSubmit} />;
      case 'assessment':
        return (
          <Assessment
            section={SECTIONS[state.currentSectionIndex]}
            answers={state.answers}
            onAnswer={handleAnswer}
            onNext={handleNextSection}
            onPrev={handlePrevSection}
            isFirst={state.currentSectionIndex === 0}
            isLast={state.currentSectionIndex === SECTIONS.length - 1}
          />
        );
      case 'results':
        return <Results answers={state.answers} companyData={state.companyData} onReset={handleReset} />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 font-sans text-slate-900">
      {/* CEOE Corporate Header */}
      <header className="bg-white border-b-4 border-blue-900 sticky top-0 z-20 shadow-sm print:hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          <div className="flex items-center cursor-pointer gap-3" onClick={() => state.step !== 'welcome' && handleReset()}>
            {/* Logo simulation */}
            <div className="flex flex-col items-start leading-none">
              <span className="text-3xl font-black text-blue-900 tracking-tighter">CEOE</span>
              <span className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">Empresas Españolas</span>
            </div>
            <div className="h-8 w-px bg-gray-300 mx-2"></div>
            <span className="font-semibold text-lg text-gray-800">
              Autodiagnóstico ODS
            </span>
          </div>
          
          {state.step === 'assessment' && (
             <div className="hidden md:flex flex-col items-end">
                <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">Progreso</span>
                <span className="text-sm font-bold text-blue-900">
                  Sección {state.currentSectionIndex + 1} / {SECTIONS.length}
                </span>
             </div>
          )}
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow">
        {renderContent()}
      </main>

      {/* CEOE Footer */}
      <footer className="bg-slate-900 text-white py-8 mt-auto print:hidden">
        <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="text-center md:text-left">
             <span className="text-2xl font-black tracking-tighter">CEOE</span>
             <p className="text-xs text-gray-400 mt-1 max-w-md">
               Confederación Española de Organizaciones Empresariales. Herramienta de autodiagnóstico para el impulso de la sostenibilidad y la Agenda 2030 en el tejido empresarial.
             </p>
          </div>
          <div className="text-sm text-gray-400">
            &copy; {new Date().getFullYear()} CEOE. Todos los derechos reservados.
          </div>
        </div>
      </footer>
    </div>
  );
}
import React from 'react';
import { ArrowRight, BarChart3, ShieldCheck, Clock, FileText } from 'lucide-react';

interface WelcomeProps {
  onStart: () => void;
}

export const Welcome: React.FC<WelcomeProps> = ({ onStart }) => {
  return (
    <div>
      {/* Hero Section */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-4 py-16 md:py-24 grid md:grid-cols-2 gap-12 items-center">
          <div>
            <div className="inline-block px-3 py-1 bg-blue-50 text-blue-900 text-xs font-bold tracking-wider uppercase mb-6 rounded-sm">
              Sostenibilidad y Agenda 2030
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6 leading-tight">
              Herramienta de Autodiagnóstico <span className="text-blue-900">ODS para Empresas</span>
            </h1>
            <p className="text-lg text-slate-600 mb-8 leading-relaxed">
              Evalúe el grado de madurez de su organización en relación con los Objetivos de Desarrollo Sostenible. Una iniciativa de CEOE para impulsar la competitividad y la responsabilidad empresarial.
            </p>
            <button
              onClick={onStart}
              className="group inline-flex items-center bg-blue-900 text-white px-8 py-4 rounded-md text-lg font-semibold hover:bg-blue-800 transition-all shadow-md"
            >
              Comenzar Evaluación
              <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
            </button>
            <p className="text-xs text-gray-400 mt-4">
              Tiempo estimado: 10 minutos. Totalmente gratuito y confidencial.
            </p>
          </div>
          <div className="bg-slate-50 p-8 rounded-lg border border-gray-100 relative hidden md:block">
            {/* Abstract visual representation */}
            <div className="grid grid-cols-2 gap-4">
                <div className="bg-white p-6 rounded shadow-sm border-l-4 border-yellow-500">
                    <div className="text-yellow-600 font-bold mb-1">Gestión</div>
                    <div className="h-2 bg-gray-100 rounded full w-3/4"></div>
                </div>
                <div className="bg-white p-6 rounded shadow-sm border-l-4 border-orange-500 mt-8">
                    <div className="text-orange-600 font-bold mb-1">Personas</div>
                    <div className="h-2 bg-gray-100 rounded full w-1/2"></div>
                </div>
                <div className="bg-white p-6 rounded shadow-sm border-l-4 border-teal-600">
                    <div className="text-teal-700 font-bold mb-1">Planeta</div>
                    <div className="h-2 bg-gray-100 rounded full w-full"></div>
                </div>
                <div className="bg-white p-6 rounded shadow-sm border-l-4 border-blue-600 mt-8">
                    <div className="text-blue-700 font-bold mb-1">Prosperidad</div>
                    <div className="h-2 bg-gray-100 rounded full w-2/3"></div>
                </div>
            </div>
          </div>
        </div>
      </div>

      {/* Features Grid */}
      <div className="max-w-6xl mx-auto px-4 py-16">
        <div className="text-center mb-12">
            <h2 className="text-2xl font-bold text-gray-900">Por qué realizar este diagnóstico</h2>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8">
          <div className="bg-white p-6 rounded-lg border border-gray-200 hover:border-blue-900 transition-colors group">
            <div className="w-12 h-12 bg-slate-100 rounded-md flex items-center justify-center text-slate-700 mb-4 group-hover:bg-blue-900 group-hover:text-white transition-colors">
              <FileText size={24} />
            </div>
            <h3 className="text-lg font-bold text-gray-900 mb-2">Informe Ejecutivo</h3>
            <p className="text-slate-600 text-sm leading-relaxed">
              Obtenga un reporte detallado con su posicionamiento en las 5 dimensiones clave de la sostenibilidad empresarial.
            </p>
          </div>
          
          <div className="bg-white p-6 rounded-lg border border-gray-200 hover:border-blue-900 transition-colors group">
            <div className="w-12 h-12 bg-slate-100 rounded-md flex items-center justify-center text-slate-700 mb-4 group-hover:bg-blue-900 group-hover:text-white transition-colors">
              <Clock size={24} />
            </div>
            <h3 className="text-lg font-bold text-gray-900 mb-2">Ágil y Directo</h3>
            <p className="text-slate-600 text-sm leading-relaxed">
              Diseñado para directivos y responsables de área. No requiere documentación compleja previa para completarlo.
            </p>
          </div>

          <div className="bg-white p-6 rounded-lg border border-gray-200 hover:border-blue-900 transition-colors group">
            <div className="w-12 h-12 bg-slate-100 rounded-md flex items-center justify-center text-slate-700 mb-4 group-hover:bg-blue-900 group-hover:text-white transition-colors">
              <ShieldCheck size={24} />
            </div>
            <h3 className="text-lg font-bold text-gray-900 mb-2">Confidencialidad CEOE</h3>
            <p className="text-slate-600 text-sm leading-relaxed">
              Garantía de privacidad. Los datos se tratan de forma segura y estadística para benchmarking sectorial.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
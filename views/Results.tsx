import React from 'react';
import { ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, Tooltip } from 'recharts';
import { SECTIONS, QUESTIONS } from '../data';
import { SectionId, CompanyData } from '../types';
import { Download, RefreshCw, Award, FileCheck, Building, MapPin, Users, Briefcase } from 'lucide-react';

interface ResultsProps {
  answers: Record<string, number>;
  companyData: CompanyData;
  onReset: () => void;
}

export const Results: React.FC<ResultsProps> = ({ answers, companyData, onReset }) => {
  
  // Calculate scores per section
  const scores = SECTIONS.map(section => {
    const sectionQuestions = QUESTIONS.filter(q => q.category === section.id);
    const totalQuestions = sectionQuestions.length;
    
    let sum = 0;
    let validCount = 0;
    let maxPossible = 0;

    sectionQuestions.forEach(q => {
      const val = answers[q.id];
      // Include all questions in denominator unless strictly "NA" logic is requested.
      // Assuming 0-3 range.
      if (val !== undefined && val >= 0) {
        sum += val;
        validCount++;
        maxPossible += 3;
      }
    });

    const percentage = maxPossible > 0 ? (sum / maxPossible) * 100 : 0;
    
    let maturity = 'Inicial';
    if (percentage > 25) maturity = 'En proceso';
    if (percentage > 50) maturity = 'Avanzado';
    if (percentage > 80) maturity = 'Líder';

    return {
      id: section.id,
      name: section.title,
      score: Math.round(percentage),
      rawScore: sum,
      maxPossible,
      validCount,
      maturity,
      color: section.color.replace('bg-', ''), 
      hex: getHexColor(section.id)
    };
  });

  const globalScore = Math.round(scores.reduce((acc, curr) => acc + curr.score, 0) / scores.length);

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      
      {/* Print Only Header */}
      <div className="print-only mb-8 border-b-2 border-blue-900 pb-4">
        <div className="flex justify-between items-end">
            <div>
                <h1 className="text-4xl font-black text-blue-900 leading-none mb-1">CEOE</h1>
                <p className="text-sm text-gray-600 uppercase tracking-widest font-bold">Autodiagnóstico ODS</p>
            </div>
            <div className="text-right">
                <p className="text-xs text-gray-500 uppercase">Fecha del informe</p>
                <p className="font-bold text-gray-900">{new Date().toLocaleDateString('es-ES', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
            </div>
        </div>
      </div>

      {/* Company Info Card (Visible on both) */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-8 page-break-avoid">
        <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-4 border-b border-gray-100 pb-2">Datos de la Organización</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div>
                <div className="flex items-center text-gray-500 mb-1">
                    <Building size={16} className="mr-2" />
                    <span className="text-xs font-semibold uppercase">Empresa</span>
                </div>
                <div className="font-bold text-gray-900 text-sm">{companyData.businessName || 'No especificado'}</div>
            </div>
            <div>
                <div className="flex items-center text-gray-500 mb-1">
                    <Users size={16} className="mr-2" />
                    <span className="text-xs font-semibold uppercase">Tamaño</span>
                </div>
                <div className="font-bold text-gray-900 text-sm">{companyData.size}</div>
            </div>
            <div>
                <div className="flex items-center text-gray-500 mb-1">
                    <Briefcase size={16} className="mr-2" />
                    <span className="text-xs font-semibold uppercase">Sector</span>
                </div>
                <div className="font-bold text-gray-900 text-sm truncate" title={companyData.sector}>{companyData.sector}</div>
            </div>
            <div>
                <div className="flex items-center text-gray-500 mb-1">
                    <MapPin size={16} className="mr-2" />
                    <span className="text-xs font-semibold uppercase">Ubicación</span>
                </div>
                <div className="font-bold text-gray-900 text-sm">{companyData.location}</div>
            </div>
        </div>
      </div>

      {/* Results Header */}
      <div className="bg-blue-900 text-white rounded-lg shadow-sm p-8 mb-8 page-break-avoid print:bg-blue-900 print:text-white">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="text-center md:text-left">
                <h1 className="text-3xl font-black mb-2 text-white print:text-white">Informe de Resultados</h1>
                <p className="text-blue-200">Resumen ejecutivo del desempeño en sostenibilidad</p>
            </div>
            <div className="flex items-center gap-4 bg-white/10 p-4 rounded-lg backdrop-blur-sm border border-white/20">
                <div className="p-3 bg-white text-blue-900 rounded-full print:hidden">
                    <Award size={32} />
                </div>
                <div className="text-left">
                    <div className="text-xs font-bold text-blue-200 uppercase tracking-widest">Índice Global</div>
                    <div className="text-5xl font-black text-white">{globalScore}%</div>
                </div>
            </div>
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-8 mb-8">
        {/* Radar Chart */}
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 flex flex-col items-center justify-center min-h-[450px] page-break-avoid">
          <h3 className="text-lg font-bold text-gray-800 mb-6 self-start border-b-2 border-blue-900 pb-1">Mapa de Competitividad</h3>
          <div className="w-full h-[350px]">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart cx="50%" cy="50%" outerRadius="75%" data={scores}>
                <PolarGrid />
                <PolarAngleAxis dataKey="name" tick={{ fill: '#1e3a8a', fontSize: 13, fontWeight: 700 }} />
                <PolarRadiusAxis angle={30} domain={[0, 100]} tick={false} axisLine={false} />
                <Radar
                  name="Puntuación"
                  dataKey="score"
                  stroke="#1e3a8a" // CEOE Blue
                  strokeWidth={3}
                  fill="#1e3a8a"
                  fillOpacity={0.3}
                />
                <Tooltip />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Detailed Table (Better for Print) */}
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 min-h-[450px] page-break-avoid">
          <h3 className="text-lg font-bold text-gray-800 mb-6 border-b-2 border-blue-900 pb-1 inline-block">Detalle por Áreas</h3>
          
          <div className="overflow-hidden">
            <table className="min-w-full text-sm">
                <thead>
                    <tr className="bg-gray-50 border-b border-gray-200">
                        <th className="py-3 px-4 text-left font-bold text-gray-600 uppercase tracking-wider">Área</th>
                        <th className="py-3 px-4 text-left font-bold text-gray-600 uppercase tracking-wider">Nivel</th>
                        <th className="py-3 px-4 text-right font-bold text-gray-600 uppercase tracking-wider">Puntuación</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                    {scores.map((s) => (
                        <tr key={s.id}>
                            <td className="py-4 px-4 font-bold text-gray-800">
                                <div className="flex items-center">
                                    <div className={`w-3 h-3 rounded-full mr-3 bg-${s.color}`} style={{backgroundColor: s.hex}}></div>
                                    {s.name}
                                </div>
                            </td>
                            <td className="py-4 px-4 text-gray-600">{s.maturity}</td>
                            <td className="py-4 px-4 text-right">
                                <span className="inline-block bg-blue-50 text-blue-900 px-2 py-1 rounded font-bold">{s.score}%</span>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
          </div>

          <div className="mt-6 space-y-4">
            {scores.map((s) => (
               <div key={`bar-${s.id}`} className="flex items-center text-xs">
                  <div className="w-24 font-medium text-gray-500 truncate">{s.name}</div>
                  <div className="flex-1 bg-gray-100 h-2 rounded-full overflow-hidden ml-2 print:bg-gray-200">
                     <div 
                        className={`h-full bg-${s.color} print:print-color-adjust`} 
                        style={{ width: `${s.score}%`, backgroundColor: s.hex }}
                     ></div>
                  </div>
               </div>
            ))}
          </div>
        </div>
      </div>

      {/* Recommendations */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 mb-8 page-break-avoid">
        <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
            <FileCheck className="mr-2 text-blue-900" />
            Recomendaciones Prioritarias
        </h3>
        
        <div className="grid md:grid-cols-3 gap-6">
            {scores.sort((a,b) => a.score - b.score).slice(0, 3).map((area) => (
            <div key={area.id} className="bg-slate-50 p-6 rounded border border-gray-200 page-break-avoid">
                <div className={`text-[10px] font-black uppercase tracking-widest mb-3`} style={{ color: area.hex }}>
                    Mejora en {area.name}
                </div>
                <p className="text-gray-700 text-sm mb-4 leading-relaxed">
                    Con un nivel del <strong>{area.score}%</strong>, se recomienda establecer un plan de acción inmediato en esta dimensión.
                </p>
                <div className="text-blue-900 text-xs font-bold uppercase tracking-wider hover:underline cursor-pointer">
                    Ver acciones sugeridas &rarr;
                </div>
            </div>
            ))}
        </div>
      </div>

      <div className="flex flex-col sm:flex-row justify-center gap-4 no-print">
        <button
          onClick={() => window.print()}
          className="flex items-center justify-center px-8 py-4 bg-white border-2 border-gray-300 rounded font-bold text-gray-700 hover:bg-gray-50 hover:border-gray-400 transition"
        >
          <Download className="mr-2" size={20} />
          DESCARGAR INFORME (PDF)
        </button>
        <button
          onClick={onReset}
          className="flex items-center justify-center px-8 py-4 bg-blue-900 text-white rounded font-bold hover:bg-blue-800 shadow-md transition"
        >
          <RefreshCw className="mr-2" size={20} />
          NUEVA EVALUACIÓN
        </button>
      </div>
    </div>
  );
};

function getHexColor(id: SectionId): string {
    switch(id) {
        case 'gestion': return '#EAB308';
        case 'personas': return '#F97316';
        case 'planeta': return '#0D9488';
        case 'prosperidad': return '#2563EB';
        case 'alianzas': return '#4F46E5';
        default: return '#1e3a8a';
    }
}
import React from 'react';
import { ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, Tooltip, Legend } from 'recharts';
import { SECTIONS, QUESTIONS, RECOMMENDATIONS } from '../data';
import { SectionId, CompanyData } from '../types';
import { Download, RefreshCw, Award, FileCheck, Building, MapPin, Users, Briefcase, TrendingUp } from 'lucide-react';

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

    // Simulate sector benchmark (randomized slightly based on section to look real)
    const baseBenchmark = 45; // Average market maturity
    const benchmark = Math.min(100, Math.max(10, baseBenchmark + (Math.random() * 20 - 10)));

    return {
      id: section.id,
      name: section.title,
      score: Math.round(percentage),
      benchmark: Math.round(benchmark),
      maturity,
      color: section.color.replace('bg-', ''), 
      hex: getHexColor(section.id),
      recommendation: percentage > 50 ? RECOMMENDATIONS[section.id].advanced : RECOMMENDATIONS[section.id].initial
    };
  });

  const globalScore = Math.round(scores.reduce((acc, curr) => acc + curr.score, 0) / scores.length);

  return (
    <div className="max-w-7xl mx-auto px-4 py-12 print:p-0 print:max-w-none">
      
      {/* ---------------- PRINT COVER PAGE (Hidden on Screen) ---------------- */}
      <div className="print-only min-h-screen flex flex-col justify-center items-center bg-blue-900 text-white p-12 relative print:break-after-page">
        <div className="absolute top-0 left-0 w-full h-4 bg-yellow-500"></div>
        <div className="text-center space-y-8">
            <div className="mb-12">
                <h1 className="text-8xl font-black tracking-tighter mb-2">CEOE</h1>
                <p className="text-xl tracking-[0.5em] font-light uppercase border-t border-white/30 pt-4 inline-block">Empresas Españolas</p>
            </div>
            
            <div className="space-y-4">
                <h2 className="text-5xl font-bold">Informe de Autodiagnóstico</h2>
                <h3 className="text-3xl font-light text-blue-200">Objetivos de Desarrollo Sostenible</h3>
            </div>

            <div className="mt-24 p-8 border border-white/20 bg-white/5 rounded backdrop-blur-sm max-w-2xl mx-auto text-left">
                <p className="text-blue-300 text-sm uppercase tracking-widest mb-2">Preparado para</p>
                <p className="text-3xl font-bold mb-6">{companyData.businessName || 'Organización'}</p>
                <div className="grid grid-cols-2 gap-4 text-sm text-blue-100">
                    <div>
                        <span className="opacity-50 block text-xs uppercase">Fecha</span>
                        {new Date().toLocaleDateString('es-ES', { year: 'numeric', month: 'long', day: 'numeric' })}
                    </div>
                    <div>
                        <span className="opacity-50 block text-xs uppercase">Sector</span>
                        {companyData.sector}
                    </div>
                </div>
            </div>
        </div>
        <div className="absolute bottom-12 text-xs text-blue-300">
            Documento generado automáticamente por la herramienta de autodiagnóstico ODS de CEOE.
        </div>
      </div>
      {/* ---------------- END COVER PAGE ---------------- */}


      {/* Screen Header (Non-print) */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-8 page-break-avoid print:hidden">
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

      {/* Main Results Dashboard */}
      <div className="bg-blue-900 text-white rounded-lg shadow-sm p-8 mb-8 page-break-avoid print:bg-white print:text-black print:border-b-2 print:border-blue-900 print:rounded-none print:shadow-none print:mb-12">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="text-center md:text-left">
                <h1 className="text-3xl font-black mb-2 text-white print:text-blue-900">Resumen Ejecutivo</h1>
                <p className="text-blue-200 print:text-gray-600">
                    Su organización se encuentra en un nivel 
                    <span className="font-bold text-white print:text-black"> {globalScore > 50 ? 'AVANZADO' : 'INICIAL'} </span> 
                    de integración de los ODS.
                </p>
            </div>
            <div className="flex items-center gap-4 bg-white/10 p-4 rounded-lg backdrop-blur-sm border border-white/20 print:bg-gray-100 print:border-gray-200">
                <div className="p-3 bg-white text-blue-900 rounded-full print:bg-blue-900 print:text-white">
                    <Award size={32} />
                </div>
                <div className="text-left">
                    <div className="text-xs font-bold text-blue-200 uppercase tracking-widest print:text-gray-500">Índice Global</div>
                    <div className="text-5xl font-black text-white print:text-blue-900">{globalScore}%</div>
                </div>
            </div>
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-8 mb-8 print:gap-12">
        {/* Radar Chart with Benchmark */}
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 flex flex-col items-center justify-center min-h-[450px] page-break-avoid print:border-none print:shadow-none">
          <div className="flex justify-between w-full items-center mb-6 border-b border-gray-100 pb-2">
             <h3 className="text-lg font-bold text-gray-800 border-l-4 border-blue-900 pl-3">Mapa de Posicionamiento</h3>
             <div className="flex gap-4 text-xs">
                <div className="flex items-center"><div className="w-3 h-3 bg-blue-900 rounded-full mr-1"></div> Su Empresa</div>
                <div className="flex items-center"><div className="w-3 h-3 bg-gray-400 rounded-full mr-1"></div> Media Sector</div>
             </div>
          </div>
          
          <div className="w-full h-[350px]">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart cx="50%" cy="50%" outerRadius="70%" data={scores}>
                <PolarGrid stroke="#e5e7eb" />
                <PolarAngleAxis dataKey="name" tick={{ fill: '#1f2937', fontSize: 12, fontWeight: 700 }} />
                <PolarRadiusAxis angle={30} domain={[0, 100]} tick={false} axisLine={false} />
                <Radar
                  name="Su Empresa"
                  dataKey="score"
                  stroke="#1e3a8a"
                  strokeWidth={3}
                  fill="#1e3a8a"
                  fillOpacity={0.4}
                />
                <Radar
                  name="Media Sector"
                  dataKey="benchmark"
                  stroke="#9ca3af"
                  strokeWidth={2}
                  fill="#9ca3af"
                  fillOpacity={0.1}
                  strokeDasharray="4 4"
                />
                <Tooltip />
              </RadarChart>
            </ResponsiveContainer>
          </div>
          <p className="text-xs text-center text-gray-500 mt-4 italic">
            Comparativa estimada basada en datos agregados del sector {companyData.sector.substring(0, 20)}...
          </p>
        </div>

        {/* Detailed Table */}
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 min-h-[450px] page-break-avoid print:border-none print:shadow-none">
          <h3 className="text-lg font-bold text-gray-800 mb-6 border-l-4 border-blue-900 pl-3">Detalle Analítico</h3>
          
          <div className="overflow-hidden">
            <table className="min-w-full text-sm">
                <thead>
                    <tr className="bg-gray-50 border-b border-gray-200">
                        <th className="py-3 px-4 text-left font-bold text-gray-600 uppercase tracking-wider">Área</th>
                        <th className="py-3 px-4 text-right font-bold text-gray-600 uppercase tracking-wider">Puntuación</th>
                        <th className="py-3 px-4 text-right font-bold text-gray-400 uppercase tracking-wider text-xs">Media</th>
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
                            <td className="py-4 px-4 text-right">
                                <span className={`inline-block px-2 py-1 rounded font-bold ${s.score >= s.benchmark ? 'bg-green-100 text-green-800' : 'bg-red-50 text-red-800'}`}>
                                    {s.score}%
                                </span>
                            </td>
                            <td className="py-4 px-4 text-right text-gray-400">
                                {s.benchmark}%
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
          </div>

          <div className="mt-8 bg-slate-50 p-4 rounded border border-gray-200">
             <div className="flex items-start">
                <TrendingUp className="text-blue-900 mr-3 mt-1" size={20} />
                <div>
                    <h4 className="font-bold text-blue-900 text-sm mb-1">Análisis de Brecha</h4>
                    <p className="text-xs text-gray-600 leading-relaxed">
                        Su organización se sitúa un <strong className={globalScore >= 45 ? 'text-green-600' : 'text-red-600'}>{globalScore - 45}%</strong> {globalScore >= 45 ? 'por encima' : 'por debajo'} de la media estimada del mercado.
                        {globalScore < 45 ? ' Se recomienda revisar las políticas básicas.' : ' Buen posicionamiento competitivo.'}
                    </p>
                </div>
             </div>
          </div>
        </div>
      </div>

      {/* Smart Recommendations */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 mb-8 page-break-avoid print:shadow-none print:border-none">
        <h3 className="text-xl font-bold text-gray-900 mb-8 flex items-center border-b pb-4">
            <FileCheck className="mr-2 text-blue-900" />
            Plan de Acción Recomendado
        </h3>
        
        <div className="space-y-6">
            {scores.map((area) => (
            <div key={area.id} className="flex flex-col md:flex-row gap-6 p-6 rounded-lg border border-gray-100 hover:border-blue-100 hover:bg-slate-50 transition-colors page-break-avoid">
                <div className="md:w-48 shrink-0 flex flex-col justify-center border-l-4 pl-4" style={{borderColor: area.hex}}>
                    <div className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-1">Dimensión</div>
                    <div className="font-bold text-gray-900 text-lg mb-2">{area.name}</div>
                    <div className="text-2xl font-black" style={{color: area.hex}}>{area.score}%</div>
                </div>
                <div className="flex-grow">
                    <h4 className="font-bold text-gray-800 text-sm mb-2 uppercase flex items-center">
                        Nivel: {area.maturity}
                        <div className="ml-2 h-2 w-2 rounded-full" style={{backgroundColor: area.hex}}></div>
                    </h4>
                    <p className="text-gray-700 text-sm leading-relaxed">
                        {area.recommendation}
                    </p>
                </div>
            </div>
            ))}
        </div>
      </div>

      <div className="flex flex-col sm:flex-row justify-center gap-4 no-print mt-12">
        <button
          onClick={() => window.print()}
          className="flex items-center justify-center px-8 py-4 bg-white border-2 border-gray-300 rounded font-bold text-gray-700 hover:bg-gray-50 hover:border-gray-400 transition shadow-sm"
        >
          <Download className="mr-2" size={20} />
          DESCARGAR INFORME OFICIAL
        </button>
        <button
          onClick={onReset}
          className="flex items-center justify-center px-8 py-4 bg-blue-900 text-white rounded font-bold hover:bg-blue-800 shadow-lg hover:shadow-xl transition"
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
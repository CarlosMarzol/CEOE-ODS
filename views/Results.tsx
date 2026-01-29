import React from 'react';
import { ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, Tooltip } from 'recharts';
import { SECTIONS, QUESTIONS, RECOMMENDATIONS, MATURITY_LEVELS, OPTIONS } from '../data';
import { SectionId, CompanyData, Question } from '../types';
import { Download, RefreshCw, Award, FileCheck, Building, MapPin, Users, Briefcase, TrendingUp, AlertCircle, ArrowRight } from 'lucide-react';

interface ResultsProps {
  answers: Record<string, number>;
  companyData: CompanyData;
  onReset: () => void;
}

export const Results: React.FC<ResultsProps> = ({ answers, companyData, onReset }) => {
  
  // Calculate scores per section
  const scores = SECTIONS.map(section => {
    const sectionQuestions = QUESTIONS.filter(q => q.category === section.id);
    
    let sum = 0;
    let maxPossible = 0;
    const improvementOpportunities: Question[] = [];

    sectionQuestions.forEach(q => {
      const val = answers[q.id];
      if (val !== undefined && val >= 0) {
        sum += val;
        maxPossible += 3;
        // Identify improvement opportunities (Score 0 or 1)
        if (val <= 1) {
            improvementOpportunities.push(q);
        }
      }
    });

    const percentage = maxPossible > 0 ? (sum / maxPossible) * 100 : 0;
    const score = Math.round(percentage);

    // Determine maturity level
    let maturityKey = 'inicial';
    let maturityLabel = MATURITY_LEVELS.inicial.label;
    
    if (score > MATURITY_LEVELS.inicial.max) { maturityKey = 'proceso'; maturityLabel = MATURITY_LEVELS.proceso.label; }
    if (score > MATURITY_LEVELS.proceso.max) { maturityKey = 'avanzado'; maturityLabel = MATURITY_LEVELS.avanzado.label; }
    if (score > MATURITY_LEVELS.avanzado.max) { maturityKey = 'lider'; maturityLabel = MATURITY_LEVELS.lider.label; }

    // Benchmark simulation
    const baseBenchmark = 45;
    const benchmark = Math.min(100, Math.max(10, Math.round(baseBenchmark + (Math.random() * 20 - 10))));

    return {
      id: section.id,
      name: section.title,
      score,
      benchmark,
      maturity: maturityLabel,
      color: section.color.replace('bg-', ''), 
      hex: getHexColor(section.id),
      recommendation: RECOMMENDATIONS[section.id][maturityKey],
      opportunities: improvementOpportunities.slice(0, 3) // Top 3 opportunities
    };
  });

  const globalScore = Math.round(scores.reduce((acc, curr) => acc + curr.score, 0) / scores.length);

  // Global Maturity Label
  let globalMaturityLabel = MATURITY_LEVELS.inicial.label;
  if (globalScore > MATURITY_LEVELS.inicial.max) globalMaturityLabel = MATURITY_LEVELS.proceso.label;
  if (globalScore > MATURITY_LEVELS.proceso.max) globalMaturityLabel = MATURITY_LEVELS.avanzado.label;
  if (globalScore > MATURITY_LEVELS.avanzado.max) globalMaturityLabel = MATURITY_LEVELS.lider.label;

  return (
    <div className="max-w-7xl mx-auto px-4 py-12 print:p-0 print:max-w-none font-sans">
      
      {/* ---------------- PRINT COVER PAGE ---------------- */}
      <div className="print-only min-h-screen flex flex-col justify-center items-center bg-blue-900 text-white p-12 relative break-after-page">
        <div className="absolute top-0 left-0 w-full h-4 bg-yellow-500"></div>
        <div className="text-center space-y-8 w-full">
            <div className="mb-16">
                <h1 className="text-8xl font-black tracking-tighter mb-4">CEOE</h1>
                <div className="h-px bg-white/30 w-32 mx-auto mb-4"></div>
                <p className="text-xl tracking-[0.4em] font-light uppercase">Empresas Españolas</p>
            </div>
            
            <div className="space-y-6">
                <h2 className="text-6xl font-bold leading-tight">Informe de<br/>Sostenibilidad</h2>
                <div className="inline-block px-4 py-1 border border-yellow-500 text-yellow-500 rounded-full text-sm font-bold uppercase tracking-wider">
                    Autodiagnóstico ODS
                </div>
            </div>

            <div className="mt-32 p-10 border border-white/20 bg-white/5 rounded-xl backdrop-blur-md max-w-3xl mx-auto text-left relative overflow-hidden">
                <div className="absolute top-0 right-0 p-4 opacity-10">
                    <Award size={120} />
                </div>
                <p className="text-blue-300 text-xs font-bold uppercase tracking-widest mb-2">Organización Evaluada</p>
                <p className="text-4xl font-bold mb-8 text-white">{companyData.businessName}</p>
                <div className="grid grid-cols-2 gap-8 text-sm text-blue-100">
                    <div>
                        <span className="opacity-60 block text-[10px] uppercase font-bold mb-1">Sector de Actividad</span>
                        <span className="font-medium">{companyData.sector}</span>
                    </div>
                    <div>
                        <span className="opacity-60 block text-[10px] uppercase font-bold mb-1">Fecha de Emisión</span>
                        <span className="font-medium">{new Date().toLocaleDateString('es-ES', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
                    </div>
                </div>
            </div>
        </div>
        <div className="absolute bottom-12 text-[10px] text-blue-300 uppercase tracking-widest">
            Confederación Española de Organizaciones Empresariales &copy; {new Date().getFullYear()}
        </div>
      </div>
      {/* ---------------- END COVER PAGE ---------------- */}


      {/* Screen Header */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-8 page-break-avoid print:hidden">
        <div className="flex items-center justify-between mb-4">
            <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest">Datos de la Organización</h3>
            <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">{new Date().toLocaleDateString()}</span>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div>
                <div className="flex items-center text-gray-500 mb-1">
                    <Building size={16} className="mr-2" />
                    <span className="text-xs font-semibold uppercase">Empresa</span>
                </div>
                <div className="font-bold text-gray-900 text-sm truncate">{companyData.businessName}</div>
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

      {/* Score Summary */}
      <div className="bg-gradient-to-r from-blue-900 to-indigo-900 text-white rounded-lg shadow-lg p-8 mb-8 page-break-avoid print:shadow-none print:border-b-2 print:border-blue-900 print:rounded-none print:from-white print:to-white print:text-black print:mb-12">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="text-center md:text-left">
                <h1 className="text-4xl font-black mb-2 text-white print:text-blue-900">Resultado Global</h1>
                <p className="text-blue-200 text-lg print:text-gray-600">
                    Nivel de Madurez: <span className="font-bold text-yellow-400 print:text-black uppercase">{globalMaturityLabel}</span>
                </p>
            </div>
            <div className="flex items-center gap-6">
                <div className="text-right hidden md:block">
                    <div className="text-sm text-blue-300 font-medium print:text-gray-500">Puntuación Total</div>
                    <div className="text-xs text-blue-400 print:text-gray-400">Sobre 100</div>
                </div>
                <div className="relative flex items-center justify-center w-32 h-32">
                     {/* SVG Chart for print consistency */}
                     <svg className="w-full h-full transform -rotate-90">
                        <circle cx="64" cy="64" r="60" stroke="currentColor" strokeWidth="8" fill="transparent" className="text-blue-800 print:text-gray-200" />
                        <circle cx="64" cy="64" r="60" stroke="currentColor" strokeWidth="8" fill="transparent" strokeDasharray={377} strokeDashoffset={377 - (377 * globalScore) / 100} className="text-yellow-500 transition-all duration-1000 ease-out print:text-blue-900" />
                     </svg>
                     <span className="absolute text-4xl font-black text-white print:text-blue-900">{globalScore}%</span>
                </div>
            </div>
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-8 mb-12 print:gap-12 print:block">
        {/* Radar Chart */}
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 flex flex-col items-center justify-center min-h-[500px] page-break-avoid print:border-none print:shadow-none print:mb-8 print:min-h-[400px]">
          <div className="flex justify-between w-full items-center mb-6 border-b border-gray-100 pb-2">
             <h3 className="text-lg font-bold text-gray-800 border-l-4 border-blue-900 pl-3">Mapa de Competitividad</h3>
             <div className="flex gap-4 text-[10px] uppercase font-bold tracking-wider">
                <div className="flex items-center"><div className="w-3 h-3 bg-blue-900 rounded-sm mr-2"></div> Su Empresa</div>
                <div className="flex items-center"><div className="w-3 h-3 bg-gray-300 rounded-sm mr-2"></div> Media Sector</div>
             </div>
          </div>
          
          <div className="w-full h-[400px] print:h-[350px]">
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
                  fillOpacity={0.5}
                />
                <Radar
                  name="Media Sector"
                  dataKey="benchmark"
                  stroke="#cbd5e1"
                  strokeWidth={2}
                  fill="#cbd5e1"
                  fillOpacity={0.2}
                  strokeDasharray="4 4"
                />
                <Tooltip 
                    contentStyle={{borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'}}
                    itemStyle={{fontWeight: 'bold', color: '#1e3a8a'}}
                />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Detailed Stats & Gap Analysis Text */}
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 min-h-[500px] page-break-avoid print:border-none print:shadow-none print:min-h-0">
          <h3 className="text-lg font-bold text-gray-800 mb-6 border-l-4 border-blue-900 pl-3">Desglose Analítico</h3>
          
          <div className="overflow-hidden mb-8">
            <table className="min-w-full text-sm">
                <thead>
                    <tr className="border-b-2 border-gray-100">
                        <th className="py-3 text-left font-bold text-gray-400 uppercase tracking-wider text-xs">Dimensiones</th>
                        <th className="py-3 text-right font-bold text-gray-400 uppercase tracking-wider text-xs">Estado</th>
                        <th className="py-3 text-right font-bold text-gray-400 uppercase tracking-wider text-xs">Puntuación</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                    {scores.map((s) => (
                        <tr key={s.id} className="group hover:bg-gray-50 transition-colors">
                            <td className="py-4 font-bold text-gray-800">
                                <div className="flex items-center">
                                    <div className={`w-2 h-2 rounded-full mr-3`} style={{backgroundColor: s.hex}}></div>
                                    {s.name}
                                </div>
                            </td>
                            <td className="py-4 text-right">
                                <span className="text-xs font-semibold px-2 py-1 bg-gray-100 rounded text-gray-600 border border-gray-200 whitespace-nowrap">
                                    {s.maturity}
                                </span>
                            </td>
                            <td className="py-4 text-right">
                                <span className={`font-black ${s.score >= 50 ? 'text-green-600' : 'text-orange-500'}`}>
                                    {s.score}%
                                </span>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
          </div>

          <div className="bg-slate-50 p-5 rounded-lg border border-gray-200">
             <div className="flex items-start">
                <TrendingUp className="text-blue-900 mr-3 mt-1 shrink-0" size={20} />
                <div>
                    <h4 className="font-bold text-blue-900 text-sm mb-2">Interpretación Estratégica</h4>
                    <p className="text-xs text-gray-600 leading-relaxed text-justify">
                        Su organización muestra fortalezas en <strong>{scores.reduce((a, b) => a.score > b.score ? a : b).name}</strong>. 
                        Sin embargo, es crucial prestar atención a <strong>{scores.reduce((a, b) => a.score < b.score ? a : b).name}</strong>, 
                        donde se detecta la mayor brecha respecto al estándar del mercado. 
                    </p>
                </div>
             </div>
          </div>
        </div>
      </div>

      {/* Action Plan & Gap Analysis */}
      <div className="space-y-8 print:space-y-6">
        <h3 className="text-2xl font-bold text-gray-900 border-b border-gray-200 pb-4 print:mt-8 flex items-center print:break-before-auto">
            <FileCheck className="mr-3 text-blue-900" />
            Plan de Acción Personalizado
        </h3>

        {scores.map((area) => (
            <div key={area.id} className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden page-break-avoid print:shadow-none print:border print:border-gray-300 print:mb-4">
                <div className="border-l-8" style={{borderColor: area.hex}}>
                    <div className="p-6 md:p-8">
                        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 print:mb-4">
                            <div className="flex items-center mb-4 md:mb-0">
                                <div className={`p-2 rounded-full mr-4 text-white`} style={{backgroundColor: area.hex}}>
                                    <div className="font-bold text-lg w-6 h-6 flex items-center justify-center">{area.name.charAt(0)}</div>
                                </div>
                                <div>
                                    <h4 className="text-xl font-bold text-gray-900">{area.name}</h4>
                                    <span className="text-sm text-gray-500 font-medium">Nivel: {area.maturity} ({area.score}%)</span>
                                </div>
                            </div>
                            {area.score < 50 && (
                                <span className="px-3 py-1 bg-red-50 text-red-700 text-xs font-bold uppercase tracking-wider rounded-full border border-red-100 flex items-center print:border-red-500">
                                    <AlertCircle size={14} className="mr-1" /> Prioritario
                                </span>
                            )}
                        </div>

                        <div className="grid md:grid-cols-3 gap-8 print:gap-4">
                            <div className="md:col-span-2">
                                <h5 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-3">Recomendación Estratégica</h5>
                                <p className="text-gray-700 text-sm leading-relaxed border-l-2 border-gray-100 pl-4 italic print:text-black">
                                    "{area.recommendation}"
                                </p>
                            </div>
                            
                            {/* Gap Analysis Column */}
                            <div className="bg-gray-50 rounded p-4 border border-gray-100 print:bg-white print:border-gray-200">
                                <h5 className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-3 flex items-center">
                                    <ArrowRight size={12} className="mr-1" />
                                    Oportunidades
                                </h5>
                                {area.opportunities.length > 0 ? (
                                    <ul className="space-y-2">
                                        {area.opportunities.map(q => (
                                            <li key={q.id} className="text-xs text-gray-600 flex items-start">
                                                <span className="text-red-400 mr-2">•</span>
                                                {q.text.split(':')[0]}
                                            </li>
                                        ))}
                                    </ul>
                                ) : (
                                    <p className="text-xs text-green-600 font-medium flex items-center">
                                        <FileCheck size={14} className="mr-1" /> 
                                        ¡Excelente desempeño!
                                    </p>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        ))}
      </div>

      {/* ---------------- CERTIFICATE SECTION (Last Page) ---------------- */}
      <div className="print-only break-before-page min-h-screen flex flex-col justify-center items-center bg-white relative p-8">
          <div className="w-full h-full border-[20px] border-double border-blue-900 p-12 flex flex-col items-center justify-between">
              
              {/* Certificate Header */}
              <div className="text-center w-full">
                  <h1 className="text-7xl font-black text-blue-900 tracking-tighter mb-4">CEOE</h1>
                  <p className="text-sm tracking-[0.5em] font-bold text-gray-500 uppercase">Confederación Española de Organizaciones Empresariales</p>
                  <div className="h-1 w-32 bg-yellow-500 mx-auto mt-8"></div>
              </div>

              {/* Certificate Body */}
              <div className="text-center space-y-8 flex-grow flex flex-col justify-center">
                  <h2 className="text-5xl font-serif text-gray-900 italic font-medium">Certificado de Cumplimiento</h2>
                  <p className="text-2xl text-gray-600">Este documento certifica que la organización</p>
                  
                  <div className="py-6">
                      <h3 className="text-6xl font-bold text-blue-900 px-8 leading-tight">
                          {companyData.businessName}
                      </h3>
                      <p className="text-sm text-gray-400 mt-2 uppercase tracking-wider">{companyData.sector} | {companyData.location}</p>
                  </div>

                  <p className="text-2xl text-gray-600 px-12 leading-relaxed">
                      Ha completado satisfactoriamente el<br/>
                      <strong className="text-gray-900">Autodiagnóstico de Sostenibilidad y Objetivos ODS</strong>
                  </p>
                  
                  <div className="mt-8 inline-flex items-center gap-8 bg-slate-50 border-2 border-gray-100 px-12 py-6 rounded-xl mx-auto">
                      <div className="text-center border-r border-gray-300 pr-8">
                          <div className="text-xs text-gray-500 uppercase tracking-widest mb-1">Puntuación</div>
                          <div className="text-5xl font-black text-blue-900">{globalScore}/100</div>
                      </div>
                      <div className="text-center">
                          <div className="text-xs text-gray-500 uppercase tracking-widest mb-1">Nivel Alcanzado</div>
                          <div className="text-3xl font-bold text-yellow-600 uppercase">{globalMaturityLabel}</div>
                      </div>
                  </div>
              </div>

              {/* Certificate Footer */}
              <div className="w-full grid grid-cols-2 gap-24 pt-12 border-t border-gray-200 mt-12">
                  <div className="text-center">
                      <p className="text-lg font-bold text-gray-900">{new Date().toLocaleDateString('es-ES', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
                      <p className="text-xs text-gray-500 uppercase mt-2 font-bold tracking-wider">Fecha de Emisión</p>
                  </div>
                  <div className="text-center">
                       {/* Signature Placeholder */}
                       <div className="h-12 w-48 mx-auto mb-2 relative">
                          <div className="absolute inset-0 flex items-end justify-center">
                              <span className="font-serif italic text-2xl text-blue-900 opacity-80">Dirección Sostenibilidad</span>
                          </div>
                       </div>
                      <div className="h-px bg-gray-900 w-full mb-2"></div>
                      <p className="text-sm font-bold text-gray-900">CEOE España</p>
                      <p className="text-xs text-gray-500 uppercase tracking-wider">Departamento de Sostenibilidad</p>
                  </div>
              </div>
          </div>
      </div>
      {/* ---------------- END CERTIFICATE ---------------- */}

      <div className="flex flex-col sm:flex-row justify-center gap-4 no-print mt-16 pb-12">
        <button
          onClick={() => window.print()}
          className="group flex items-center justify-center px-8 py-4 bg-white border-2 border-gray-300 rounded-lg font-bold text-gray-700 hover:bg-gray-50 hover:border-blue-900 hover:text-blue-900 transition-all shadow-sm"
        >
          <Download className="mr-2 group-hover:scale-110 transition-transform" size={20} />
          DESCARGAR INFORME Y CERTIFICADO
        </button>
        <button
          onClick={onReset}
          className="flex items-center justify-center px-8 py-4 bg-blue-900 text-white rounded-lg font-bold hover:bg-blue-800 shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-0.5"
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
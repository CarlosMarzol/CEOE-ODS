import React from 'react';
import { ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, Tooltip, PieChart, Pie, Cell } from 'recharts';
import { SECTIONS, QUESTIONS, RECOMMENDATIONS, MATURITY_LEVELS } from '../data';
import { SectionId, CompanyData, Question } from '../types';
import { Download, RefreshCw, FileCheck, TrendingUp, AlertCircle, ArrowRight, CheckCircle2, Building, Users, Briefcase, MapPin } from 'lucide-react';

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

  const today = new Date().toLocaleDateString('es-ES', { year: 'numeric', month: 'long', day: 'numeric' });

  // Pie chart data for global score
  const pieData = [
    { name: 'Score', value: globalScore },
    { name: 'Remaining', value: 100 - globalScore }
  ];

  return (
    <div className="font-sans text-slate-900 bg-white">
      
      {/* ---------------- PRINT: PAGE 1 (COVER) ---------------- */}
      <div className="print-page cover hidden print:flex flex-col relative overflow-hidden">
        {/* Header Strip */}
        <div className="absolute top-0 left-0 w-full h-12 bg-yellow-500 z-10"></div>
        
        <div className="w-full h-full p-20 flex flex-col justify-between z-20 pt-32">
            <div>
                <h1 className="text-9xl font-black tracking-tighter text-white mb-6">CEOE</h1>
                <p className="text-2xl tracking-[0.3em] font-light text-blue-200 uppercase mb-2">Empresas Españolas</p>
                <div className="inline-block px-4 py-1 border border-yellow-500 text-yellow-500 rounded-full text-xs font-bold uppercase tracking-wider mb-16">
                    Informe Confidencial
                </div>

                <div className="space-y-4">
                    <h2 className="text-7xl font-bold leading-none text-white">
                        Informe de<br/>
                        <span className="text-blue-300">Sostenibilidad ODS</span>
                    </h2>
                </div>
            </div>

            <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-12 border border-white/10 mt-auto">
                <p className="text-blue-300 text-xs font-bold uppercase tracking-widest mb-4">Organización Evaluada</p>
                <div className="text-5xl font-bold text-white mb-10">{companyData.businessName}</div>
                
                <div className="grid grid-cols-2 gap-12 text-sm text-blue-100">
                     <div className="flex flex-col border-l-2 border-yellow-500 pl-4">
                        <span className="opacity-60 text-[10px] uppercase font-bold mb-1">Sector de Actividad</span>
                        <span className="font-medium text-xl text-white">{companyData.sector}</span>
                     </div>
                     <div className="flex flex-col border-l-2 border-yellow-500 pl-4">
                        <span className="opacity-60 text-[10px] uppercase font-bold mb-1">Fecha de Emisión</span>
                        <span className="font-medium text-xl text-white">{today}</span>
                     </div>
                </div>
            </div>
            
            <div className="mt-12 text-center text-[9px] text-blue-400 uppercase tracking-widest opacity-60">
                Generado por la Herramienta de Autodiagnóstico CEOE &copy; {new Date().getFullYear()}
            </div>
        </div>
      </div>


      {/* ---------------- PRINT: PAGE 2 (EXECUTIVE SUMMARY) ---------------- */}
      <div className="print-page hidden print:flex flex-col">
         {/* Page Header */}
         <div className="border-b-2 border-blue-900 pb-2 mb-8">
            <h3 className="text-2xl font-bold text-blue-900">Resumen Ejecutivo</h3>
            <p className="text-sm text-gray-500">Visión general del desempeño en sostenibilidad</p>
         </div>

         {/* Content Container - Flex-grow to fill available space but managed carefully */}
         <div className="flex flex-col gap-8">
             
             {/* Top Card: Score */}
             <div className="bg-slate-50 rounded-xl p-8 border border-gray-200 flex flex-row items-center justify-between h-[220px]">
                <div className="flex-1 pr-8">
                    <h4 className="text-gray-500 font-bold uppercase tracking-widest text-xs mb-3">Índice Global de Madurez</h4>
                    <div className="text-7xl font-black text-blue-900 mb-4">{globalScore}%</div>
                    <div className="inline-block bg-blue-900 text-white px-6 py-2 rounded text-base font-bold uppercase tracking-wide">
                        Nivel: {globalMaturityLabel}
                    </div>
                </div>
                
                {/* Donut Chart */}
                <div className="w-48 h-48 relative flex-shrink-0">
                    <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                            <Pie
                                data={pieData}
                                cx="50%"
                                cy="50%"
                                innerRadius={60}
                                outerRadius={80}
                                startAngle={90}
                                endAngle={-270}
                                dataKey="value"
                                stroke="none"
                                isAnimationActive={false} 
                            >
                                <Cell key="cell-0" fill="#EAB308" />
                                <Cell key="cell-1" fill="#e2e8f0" />
                            </Pie>
                        </PieChart>
                    </ResponsiveContainer>
                    <div className="absolute inset-0 flex items-center justify-center">
                        <TrendingUp size={40} className="text-blue-900" />
                    </div>
                </div>
             </div>

             {/* Bottom Card: Radar Chart */}
             <div className="flex flex-col items-center h-[550px] justify-center">
                 <h4 className="text-center font-bold text-gray-600 mb-6 uppercase tracking-widest text-sm">Mapa de Competitividad</h4>
                 
                 <div className="w-full flex justify-center items-center">
                    {/* FIXED DIMENSIONS FOR PRINT - Solving the visibility issue */}
                    <RadarChart width={600} height={450} cx="50%" cy="50%" outerRadius="75%" data={scores}>
                        <PolarGrid stroke="#94a3b8" />
                        <PolarAngleAxis 
                            dataKey="name" 
                            tick={{ fill: '#1e3a8a', fontSize: 11, fontWeight: 800 }} 
                        />
                        <PolarRadiusAxis angle={30} domain={[0, 100]} tick={false} axisLine={false} />
                        
                        {/* Company Radar - No Animation */}
                        <Radar 
                            name="Su Empresa" 
                            dataKey="score" 
                            stroke="#1e3a8a" 
                            strokeWidth={3} 
                            fill="#1e3a8a" 
                            fillOpacity={0.4} 
                            isAnimationActive={false}
                        />
                        
                        {/* Benchmark Radar - No Animation */}
                        <Radar 
                            name="Media" 
                            dataKey="benchmark" 
                            stroke="#cbd5e1" 
                            strokeWidth={2} 
                            fill="#cbd5e1" 
                            fillOpacity={0.2} 
                            strokeDasharray="5 5" 
                            isAnimationActive={false}
                        />
                    </RadarChart>
                 </div>

                 <div className="flex gap-8 mt-6 pt-4 border-t border-gray-100 w-full justify-center">
                    <div className="flex items-center text-xs font-bold text-blue-900">
                        <div className="w-3 h-3 bg-blue-900 mr-2 rounded-sm"></div> Su Empresa
                    </div>
                    <div className="flex items-center text-xs font-bold text-gray-400">
                        <div className="w-3 h-3 bg-gray-300 mr-2 rounded-sm"></div> Media del Sector
                    </div>
                 </div>
             </div>
         </div>
         
         <div className="mt-auto pt-4 border-t border-gray-200 text-[10px] text-gray-400 flex justify-between">
            <span>Informe generado el {today}</span>
            <span>Página 2</span>
         </div>
      </div>


      {/* ---------------- PRINT: PAGES 3+ (DETAILS) ---------------- */}
      <div className="print-page hidden print:flex flex-col">
         <div className="border-b-2 border-blue-900 pb-2 mb-6">
            <h3 className="text-2xl font-bold text-blue-900">Análisis Detallado</h3>
            <p className="text-sm text-gray-500">Desglose por dimensiones y recomendaciones estratégicas</p>
         </div>

         <div className="space-y-5">
            {scores.map((area) => (
                <div key={area.id} className="page-break-avoid border border-gray-200 rounded-lg overflow-hidden break-inside-avoid">
                    <div className="bg-slate-50 px-5 py-3 border-b border-gray-200 flex justify-between items-center">
                        <div className="flex items-center gap-3">
                            <div className="w-6 h-6 rounded bg-white border border-gray-200 flex items-center justify-center font-bold text-blue-900 text-xs">
                                {area.name.charAt(0)}
                            </div>
                            <h4 className="text-lg font-bold text-gray-900">{area.name}</h4>
                        </div>
                        <div className="flex items-center gap-4">
                            <span className="text-[10px] uppercase font-bold text-gray-500 bg-white px-2 py-0.5 rounded border border-gray-200">
                                {area.maturity}
                            </span>
                            <span className="text-xl font-black text-blue-900">{area.score}%</span>
                        </div>
                    </div>
                    
                    <div className="p-5 grid grid-cols-12 gap-6">
                        <div className="col-span-8">
                             <h5 className="text-[10px] font-bold text-blue-900 uppercase tracking-widest mb-2">Plan de Acción Sugerido</h5>
                             <p className="text-sm text-gray-700 italic leading-relaxed">"{area.recommendation}"</p>
                        </div>
                        <div className="col-span-4 bg-red-50 p-3 rounded border border-red-100">
                            <h5 className="text-[10px] font-bold text-red-800 uppercase tracking-widest mb-2">Focos de Mejora</h5>
                            {area.opportunities.length > 0 ? (
                                <ul className="space-y-1">
                                    {area.opportunities.map(q => (
                                        <li key={q.id} className="text-[10px] text-red-700 flex items-start leading-tight">
                                            <span className="mr-1">•</span> {q.text.split(':')[0]}
                                        </li>
                                    ))}
                                </ul>
                            ) : (
                                <div className="flex items-center text-green-700 text-[10px] font-bold">
                                    <CheckCircle2 size={12} className="mr-1" /> Sin brechas críticas
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            ))}
         </div>
         
         <div className="mt-auto pt-4 border-t border-gray-200 text-[10px] text-gray-400 flex justify-between">
            <span>Informe generado el {today}</span>
            <span>Página 3</span>
         </div>
      </div>


      {/* ---------------- PRINT: LAST PAGE (CERTIFICATE) ---------------- */}
      <div className="print-page certificate hidden print:flex">
          {/* Reduced margins and borders to fit A4 perfectly */}
          <div className="w-full h-full border-[10px] border-double border-blue-900 p-8 flex flex-col items-center justify-between bg-white relative box-border">
              
              {/* Corner Ornaments */}
              <div className="absolute top-3 left-3 w-12 h-12 border-t-2 border-l-2 border-yellow-500"></div>
              <div className="absolute top-3 right-3 w-12 h-12 border-t-2 border-r-2 border-yellow-500"></div>
              <div className="absolute bottom-3 left-3 w-12 h-12 border-b-2 border-l-2 border-yellow-500"></div>
              <div className="absolute bottom-3 right-3 w-12 h-12 border-b-2 border-r-2 border-yellow-500"></div>

              <div className="text-center w-full mt-4">
                  <h1 className="text-6xl font-black text-blue-900 tracking-tighter mb-2">CEOE</h1>
                  <p className="text-[10px] tracking-[0.5em] font-bold text-gray-500 uppercase">Confederación Española de Organizaciones Empresariales</p>
                  <div className="h-0.5 w-24 bg-yellow-500 mx-auto mt-6"></div>
              </div>

              <div className="text-center space-y-4 flex-grow flex flex-col justify-center w-full">
                  <h2 className="text-4xl font-serif text-gray-900 italic font-medium">Certificado de Cumplimiento</h2>
                  <p className="text-lg text-gray-500 font-light">Se otorga el presente reconocimiento a</p>
                  
                  <div className="py-6 w-full">
                      <h3 className="text-4xl font-bold text-blue-900 leading-tight px-8">
                          {companyData.businessName}
                      </h3>
                      <p className="text-xs text-gray-400 mt-3 uppercase tracking-widest font-bold">{companyData.sector} | {companyData.location}</p>
                  </div>

                  <p className="text-base text-gray-600 px-8 leading-relaxed max-w-2xl mx-auto">
                      Por haber completado satisfactoriamente el<br/>
                      <strong className="text-gray-900 text-lg">Autodiagnóstico de Sostenibilidad y Objetivos ODS</strong>
                  </p>
                  
                  <div className="mt-8 flex justify-center items-center gap-12 bg-gray-50 py-6 rounded-lg mx-12 border border-gray-100">
                      <div className="flex flex-col items-center">
                          <span className="text-[9px] text-gray-400 uppercase tracking-widest mb-1">Puntuación Global</span>
                          <span className="text-5xl font-black text-blue-900">{globalScore}/100</span>
                      </div>
                      <div className="w-px h-12 bg-gray-300"></div>
                      <div className="flex flex-col items-center">
                          <span className="text-[9px] text-gray-400 uppercase tracking-widest mb-1">Nivel Alcanzado</span>
                          <span className="text-2xl font-bold text-yellow-600 uppercase">{globalMaturityLabel}</span>
                      </div>
                  </div>
              </div>

              <div className="w-full grid grid-cols-2 gap-16 pt-6 border-t border-gray-100 mt-6 mb-2">
                  <div className="text-center pl-4">
                      <p className="text-base font-bold text-gray-900">{today}</p>
                      <p className="text-[9px] text-gray-400 uppercase mt-1 font-bold tracking-wider">Fecha de Emisión</p>
                  </div>
                  <div className="text-center relative pr-4">
                       <div className="h-10 w-40 mx-auto mb-1 flex items-end justify-center">
                          <span className="font-serif italic text-xl text-blue-900 opacity-80" style={{fontFamily: '"Playfair Display", serif'}}>Dirección Sostenibilidad</span>
                       </div>
                      <div className="h-px bg-gray-900 w-full mb-1"></div>
                      <p className="text-xs font-bold text-gray-900">CEOE España</p>
                  </div>
              </div>
          </div>
      </div>


      {/* ---------------- SCREEN VIEW (Interactive) ---------------- */}
      <div className="screen-only max-w-7xl mx-auto px-4 py-12">
        {/* Screen Header */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-8">
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
        <div className="bg-gradient-to-r from-blue-900 to-indigo-900 text-white rounded-lg shadow-lg p-8 mb-8">
            <div className="flex flex-col md:flex-row items-center justify-between gap-8">
                <div className="text-center md:text-left">
                    <h1 className="text-4xl font-black mb-2 text-white">Resultado Global</h1>
                    <p className="text-blue-200 text-lg">
                        Nivel de Madurez: <span className="font-bold text-yellow-400 uppercase">{globalMaturityLabel}</span>
                    </p>
                </div>
                <div className="flex items-center gap-6">
                    <div className="text-right hidden md:block">
                        <div className="text-sm text-blue-300 font-medium">Puntuación Total</div>
                        <div className="text-xs text-blue-400">Sobre 100</div>
                    </div>
                    <div className="relative flex items-center justify-center w-32 h-32">
                        <PieChart width={128} height={128}>
                            <Pie
                                data={pieData}
                                cx="50%"
                                cy="50%"
                                innerRadius={50}
                                outerRadius={64}
                                startAngle={90}
                                endAngle={-270}
                                dataKey="value"
                                stroke="none"
                            >
                                <Cell key="cell-0" fill="#EAB308" />
                                <Cell key="cell-1" fill="rgba(255,255,255,0.2)" />
                            </Pie>
                        </PieChart>
                        <span className="absolute text-3xl font-black text-white">{globalScore}%</span>
                    </div>
                </div>
            </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 mb-12">
            {/* Radar Chart */}
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 flex flex-col items-center justify-center min-h-[500px]">
                <div className="flex justify-between w-full items-center mb-6 border-b border-gray-100 pb-2">
                    <h3 className="text-lg font-bold text-gray-800 border-l-4 border-blue-900 pl-3">Mapa de Competitividad</h3>
                    <div className="flex gap-4 text-[10px] uppercase font-bold tracking-wider">
                        <div className="flex items-center"><div className="w-3 h-3 bg-blue-900 rounded-sm mr-2"></div> Su Empresa</div>
                        <div className="flex items-center"><div className="w-3 h-3 bg-gray-300 rounded-sm mr-2"></div> Media Sector</div>
                    </div>
                </div>
                
                <div className="w-full h-[400px]">
                    <ResponsiveContainer width="100%" height="100%">
                    <RadarChart cx="50%" cy="50%" outerRadius="70%" data={scores}>
                        <PolarGrid stroke="#e5e7eb" />
                        <PolarAngleAxis dataKey="name" tick={{ fill: '#1f2937', fontSize: 12, fontWeight: 700 }} />
                        <PolarRadiusAxis angle={30} domain={[0, 100]} tick={false} axisLine={false} />
                        <Radar name="Su Empresa" dataKey="score" stroke="#1e3a8a" strokeWidth={3} fill="#1e3a8a" fillOpacity={0.5} />
                        <Radar name="Media Sector" dataKey="benchmark" stroke="#cbd5e1" strokeWidth={2} fill="#cbd5e1" fillOpacity={0.2} strokeDasharray="4 4" />
                        <Tooltip contentStyle={{borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'}} itemStyle={{fontWeight: 'bold', color: '#1e3a8a'}} />
                    </RadarChart>
                    </ResponsiveContainer>
                </div>
            </div>

            {/* Detailed Stats */}
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 min-h-[500px]">
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
                                Sin embargo, es crucial prestar atención a <strong>{scores.reduce((a, b) => a.score < b.score ? a : b).name}</strong>.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        {/* Action Plan */}
        <div className="space-y-8">
            <h3 className="text-2xl font-bold text-gray-900 border-b border-gray-200 pb-4 flex items-center">
                <FileCheck className="mr-3 text-blue-900" />
                Plan de Acción Personalizado
            </h3>

            {scores.map((area) => (
                <div key={area.id} className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
                    <div className="border-l-8" style={{borderColor: area.hex}}>
                        <div className="p-6 md:p-8">
                            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
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
                                    <span className="px-3 py-1 bg-red-50 text-red-700 text-xs font-bold uppercase tracking-wider rounded-full border border-red-100 flex items-center">
                                        <AlertCircle size={14} className="mr-1" /> Prioritario
                                    </span>
                                )}
                            </div>

                            <div className="grid md:grid-cols-3 gap-8">
                                <div className="md:col-span-2">
                                    <h5 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-3">Recomendación Estratégica</h5>
                                    <p className="text-gray-700 text-sm leading-relaxed border-l-2 border-gray-100 pl-4 italic">
                                        "{area.recommendation}"
                                    </p>
                                </div>
                                
                                <div className="bg-gray-50 rounded p-4 border border-gray-100">
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
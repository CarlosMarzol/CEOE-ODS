import React from 'react';
import { ArrowRight, Globe, Users, TrendingUp, Handshake, Briefcase, Heart } from 'lucide-react';

interface ODSIntroProps {
  onNext: () => void;
}

export const ODSIntro: React.FC<ODSIntroProps> = ({ onNext }) => {
  return (
    <div className="bg-white min-h-screen animate-fadeIn">
      {/* Colorful ODS Strip */}
      <div className="flex h-3 w-full">
        <div className="flex-1 bg-[#E5243B]"></div> {/* ODS 1 */}
        <div className="flex-1 bg-[#DDA63A]"></div> {/* ODS 2 */}
        <div className="flex-1 bg-[#4C9F38]"></div> {/* ODS 3 */}
        <div className="flex-1 bg-[#C5192D]"></div> {/* ODS 4 */}
        <div className="flex-1 bg-[#FF3A21]"></div> {/* ODS 5 */}
        <div className="flex-1 bg-[#26BDE2]"></div> {/* ODS 6 */}
        <div className="flex-1 bg-[#FCC30B]"></div> {/* ODS 7 */}
        <div className="flex-1 bg-[#A21942]"></div> {/* ODS 8 */}
        <div className="flex-1 bg-[#FD6925]"></div> {/* ODS 9 */}
        <div className="flex-1 bg-[#DD1367]"></div> {/* ODS 10 */}
        <div className="flex-1 bg-[#FD9D24]"></div> {/* ODS 11 */}
        <div className="flex-1 bg-[#BF8B2E]"></div> {/* ODS 12 */}
        <div className="flex-1 bg-[#3F7E44]"></div> {/* ODS 13 */}
        <div className="flex-1 bg-[#0A97D9]"></div> {/* ODS 14 */}
        <div className="flex-1 bg-[#56C02B]"></div> {/* ODS 15 */}
        <div className="flex-1 bg-[#00689D]"></div> {/* ODS 16 */}
        <div className="flex-1 bg-[#19486A]"></div> {/* ODS 17 */}
      </div>

      <div className="max-w-5xl mx-auto px-4 py-16">
        {/* Header */}
        <div className="text-center mb-16">
          <span className="text-blue-900 font-bold tracking-widest uppercase text-sm mb-2 block">Agenda 2030</span>
          <h2 className="text-4xl md:text-5xl font-black text-slate-900 mb-6">
            ¿Qué son los <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-teal-500">ODS</span>?
          </h2>
          <p className="text-lg text-slate-600 max-w-3xl mx-auto leading-relaxed">
            Los <strong>Objetivos de Desarrollo Sostenible (ODS)</strong> son el plan maestro global adoptado por Naciones Unidas para erradicar la pobreza, proteger el planeta y asegurar la prosperidad para todos. Para las empresas, suponen el marco de referencia definitivo para la sostenibilidad.
          </p>
        </div>

        {/* The 5 Dimensions Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            
            <div className="bg-slate-50 p-8 rounded-2xl border border-gray-100 hover:shadow-lg transition-all duration-300 group">
                <div className="w-12 h-12 bg-orange-100 text-orange-600 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                    <Users size={24} />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-2">Personas</h3>
                <p className="text-sm text-slate-600">
                    Poner fin a la pobreza y el hambre en todas sus formas y garantizar la dignidad e igualdad.
                </p>
                <div className="mt-4 flex gap-1">
                    <div className="w-2 h-2 rounded-full bg-[#E5243B]" title="ODS 1"></div>
                    <div className="w-2 h-2 rounded-full bg-[#DDA63A]" title="ODS 2"></div>
                    <div className="w-2 h-2 rounded-full bg-[#4C9F38]" title="ODS 3"></div>
                    <div className="w-2 h-2 rounded-full bg-[#C5192D]" title="ODS 4"></div>
                    <div className="w-2 h-2 rounded-full bg-[#FF3A21]" title="ODS 5"></div>
                </div>
            </div>

            <div className="bg-slate-50 p-8 rounded-2xl border border-gray-100 hover:shadow-lg transition-all duration-300 group">
                <div className="w-12 h-12 bg-teal-100 text-teal-600 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                    <Globe size={24} />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-2">Planeta</h3>
                <p className="text-sm text-slate-600">
                    Proteger los recursos naturales de nuestro planeta y el clima para las generaciones futuras.
                </p>
                <div className="mt-4 flex gap-1">
                    <div className="w-2 h-2 rounded-full bg-[#26BDE2]" title="ODS 6"></div>
                    <div className="w-2 h-2 rounded-full bg-[#BF8B2E]" title="ODS 12"></div>
                    <div className="w-2 h-2 rounded-full bg-[#3F7E44]" title="ODS 13"></div>
                    <div className="w-2 h-2 rounded-full bg-[#0A97D9]" title="ODS 14"></div>
                    <div className="w-2 h-2 rounded-full bg-[#56C02B]" title="ODS 15"></div>
                </div>
            </div>

            <div className="bg-slate-50 p-8 rounded-2xl border border-gray-100 hover:shadow-lg transition-all duration-300 group">
                <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                    <TrendingUp size={24} />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-2">Prosperidad</h3>
                <p className="text-sm text-slate-600">
                    Asegurar vidas prósperas y satisfactorias en armonía con la naturaleza y el progreso económico.
                </p>
                <div className="mt-4 flex gap-1">
                    <div className="w-2 h-2 rounded-full bg-[#FCC30B]" title="ODS 7"></div>
                    <div className="w-2 h-2 rounded-full bg-[#A21942]" title="ODS 8"></div>
                    <div className="w-2 h-2 rounded-full bg-[#FD6925]" title="ODS 9"></div>
                    <div className="w-2 h-2 rounded-full bg-[#DD1367]" title="ODS 10"></div>
                    <div className="w-2 h-2 rounded-full bg-[#FD9D24]" title="ODS 11"></div>
                </div>
            </div>

            <div className="bg-slate-50 p-8 rounded-2xl border border-gray-100 hover:shadow-lg transition-all duration-300 group">
                <div className="w-12 h-12 bg-indigo-100 text-indigo-600 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                    <Handshake size={24} />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-2">Paz y Alianzas</h3>
                <p className="text-sm text-slate-600">
                    Promover sociedades pacíficas, justas e inclusivas e implementar la agenda a través de una sólida alianza global.
                </p>
                <div className="mt-4 flex gap-1">
                    <div className="w-2 h-2 rounded-full bg-[#00689D]" title="ODS 16"></div>
                    <div className="w-2 h-2 rounded-full bg-[#19486A]" title="ODS 17"></div>
                </div>
            </div>

            <div className="md:col-span-2 lg:col-span-2 bg-gradient-to-br from-blue-900 to-slate-800 p-8 rounded-2xl text-white shadow-xl relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-white opacity-5 rounded-full -mr-16 -mt-16 pointer-events-none"></div>
                <div className="relative z-10 flex flex-col h-full justify-between">
                    <div className="flex items-start justify-between">
                        <div>
                            <div className="bg-white/20 w-fit p-2 rounded-lg mb-4">
                                <Briefcase className="text-white" size={24} />
                            </div>
                            <h3 className="text-2xl font-bold mb-2">El Papel de la Empresa</h3>
                        </div>
                    </div>
                    <div>
                         <p className="text-blue-100 text-sm md:text-base leading-relaxed mb-6">
                            Las empresas son el motor principal para alcanzar estos objetivos. No se trata solo de filantropía, sino de integrar la sostenibilidad en la <strong>Gestión y Estrategia</strong> del negocio para garantizar su viabilidad futura, atraer talento y satisfacer a clientes cada vez más conscientes.
                        </p>
                        <button 
                            onClick={onNext}
                            className="group flex items-center bg-yellow-500 text-blue-900 px-6 py-3 rounded-lg font-bold hover:bg-yellow-400 transition-colors"
                        >
                            Comenzar Evaluación
                            <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" size={20} />
                        </button>
                    </div>
                </div>
            </div>

        </div>

        <div className="text-center">
            <p className="text-xs text-slate-400 uppercase tracking-widest font-semibold">Herramienta alineada con United Nations Global Compact</p>
        </div>
      </div>
    </div>
  );
};

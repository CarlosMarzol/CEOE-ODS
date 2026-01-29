import React, { useState } from 'react';
import { CompanyData } from '../types';
import { COMPANY_SIZE_OPTIONS, SECTORS, LOCATIONS, ROLES } from '../data';
import { Building2 } from 'lucide-react';

interface CompanyInfoProps {
  initialData: CompanyData;
  onNext: (data: CompanyData) => void;
}

export const CompanyInfo: React.FC<CompanyInfoProps> = ({ initialData, onNext }) => {
  const [formData, setFormData] = useState<CompanyData>(initialData);
  const [error, setError] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError('');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.size || !formData.sector || !formData.location || !formData.role) {
      setError('Por favor complete todos los campos obligatorios marcados con asterisco (*)');
      return;
    }
    onNext(formData);
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        <div className="bg-slate-50 border-b border-gray-200 p-6 flex items-center">
            <div className="bg-blue-900 p-2 rounded text-white mr-4">
            <Building2 size={24} />
            </div>
            <div>
                <h2 className="text-xl font-bold text-gray-900">Perfil de la Organización</h2>
                <p className="text-sm text-gray-500">Datos de segmentación para el informe</p>
            </div>
        </div>

        <form onSubmit={handleSubmit} className="p-8 space-y-6">
            
            <div className="grid md:grid-cols-2 gap-6">
                <div className="col-span-2">
                <label className="block text-sm font-bold text-gray-700 mb-2">
                    Razón social (Opcional)
                </label>
                <input
                    type="text"
                    name="businessName"
                    value={formData.businessName || ''}
                    onChange={handleChange}
                    className="w-full p-3 border border-gray-300 rounded bg-gray-50 focus:bg-white focus:ring-2 focus:ring-blue-900 focus:border-blue-900 outline-none transition"
                    placeholder="Nombre de su empresa"
                />
                </div>

                <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">
                    Tamaño de la empresa *
                </label>
                <select
                    name="size"
                    value={formData.size}
                    onChange={handleChange}
                    className="w-full p-3 border border-gray-300 rounded bg-white focus:ring-2 focus:ring-blue-900 focus:border-blue-900 outline-none transition"
                >
                    <option value="">Seleccione una opción</option>
                    {COMPANY_SIZE_OPTIONS.map((opt) => (
                    <option key={opt} value={opt}>{opt}</option>
                    ))}
                </select>
                </div>

                <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">
                    Ubicación principal *
                </label>
                <select
                    name="location"
                    value={formData.location}
                    onChange={handleChange}
                    className="w-full p-3 border border-gray-300 rounded bg-white focus:ring-2 focus:ring-blue-900 focus:border-blue-900 outline-none transition"
                >
                    <option value="">Seleccione una opción</option>
                    {LOCATIONS.map((opt) => (
                    <option key={opt} value={opt}>{opt}</option>
                    ))}
                </select>
                </div>

                <div className="col-span-2">
                <label className="block text-sm font-bold text-gray-700 mb-2">
                    Actividad principal (CNAE) *
                </label>
                <select
                    name="sector"
                    value={formData.sector}
                    onChange={handleChange}
                    className="w-full p-3 border border-gray-300 rounded bg-white focus:ring-2 focus:ring-blue-900 focus:border-blue-900 outline-none transition"
                >
                    <option value="">Seleccione una opción</option>
                    {SECTORS.map((opt) => (
                    <option key={opt} value={opt}>{opt}</option>
                    ))}
                </select>
                </div>

                <div className="col-span-2">
                <label className="block text-sm font-bold text-gray-700 mb-2">
                    Su rol en la empresa *
                </label>
                <select
                    name="role"
                    value={formData.role}
                    onChange={handleChange}
                    className="w-full p-3 border border-gray-300 rounded bg-white focus:ring-2 focus:ring-blue-900 focus:border-blue-900 outline-none transition"
                >
                    <option value="">Seleccione una opción</option>
                    {ROLES.map((opt) => (
                    <option key={opt} value={opt}>{opt}</option>
                    ))}
                </select>
                </div>
            </div>

            {error && (
            <div className="p-4 bg-red-50 text-red-700 border-l-4 border-red-600 text-sm font-medium">
                {error}
            </div>
            )}

            <div className="pt-4">
                <button
                type="submit"
                className="w-full bg-blue-900 text-white py-4 rounded font-bold uppercase tracking-wider hover:bg-blue-800 transition-colors shadow-sm"
                >
                Continuar al Cuestionario
                </button>
            </div>
        </form>
      </div>
    </div>
  );
};
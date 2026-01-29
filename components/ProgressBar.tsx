import React from 'react';

interface ProgressBarProps {
  current: number;
  total: number;
  label?: string;
  colorClass?: string;
}

export const ProgressBar: React.FC<ProgressBarProps> = ({ 
  current, 
  total, 
  label, 
  colorClass
}) => {
  const percentage = Math.min(100, Math.max(0, (current / total) * 100));
  
  // Default to corporate blue if no specific color provided, but allow override for sections
  const actualColorClass = colorClass || 'bg-blue-900';

  return (
    <div className="w-full">
      <div className="flex justify-between items-center mb-1">
        {label && <span className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">{label}</span>}
        <span className="text-xs font-bold text-gray-600">{Math.round(percentage)}%</span>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-2">
        <div 
          className={`h-2 rounded-full transition-all duration-500 ease-out ${actualColorClass}`} 
          style={{ width: `${percentage}%` }}
        ></div>
      </div>
    </div>
  );
};
import React from 'react';
import { AnalysisResponse, ValidationStatus } from '../types';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';

interface ValidationResultsProps {
  report: AnalysisResponse;
}

const ValidationResults: React.FC<ValidationResultsProps> = ({ report }) => {
  if (!report.issues) return null;

  const getStatusColor = (status: ValidationStatus) => {
    switch (status) {
      case ValidationStatus.COMPLIANT: return 'bg-green-100 text-green-800 border-green-200';
      case ValidationStatus.NON_COMPLIANT: return 'bg-red-100 text-red-800 border-red-200';
      case ValidationStatus.WARNING: return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      default: return 'bg-slate-100 text-slate-800 border-slate-200';
    }
  };

  const getStatusIcon = (status: ValidationStatus) => {
     switch (status) {
      case ValidationStatus.COMPLIANT: return '✓';
      case ValidationStatus.NON_COMPLIANT: return '✕';
      case ValidationStatus.WARNING: return '!';
      default: return '?';
    }
  };

  // Prepare data for chart
  const statusCounts = report.issues.reduce((acc, curr) => {
    acc[curr.status] = (acc[curr.status] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const chartData = [
    { name: 'Compliant', value: statusCounts[ValidationStatus.COMPLIANT] || 0, color: '#22c55e' },
    { name: 'Warning', value: statusCounts[ValidationStatus.WARNING] || 0, color: '#eab308' },
    { name: 'Non-Compliant', value: statusCounts[ValidationStatus.NON_COMPLIANT] || 0, color: '#ef4444' },
    { name: 'Unknown', value: statusCounts[ValidationStatus.UNKNOWN] || 0, color: '#94a3b8' },
  ].filter(d => d.value > 0);

  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden h-full flex flex-col">
      {/* Header - Fixed Height Area */}
      <div className="p-6 border-b border-slate-100 flex justify-between items-start bg-slate-50 shrink-0">
        <div className="flex-1 pr-4">
          <h2 className="text-xl font-semibold text-slate-800">Validation Report</h2>
          <div className="mt-2 p-3 bg-white rounded-lg border border-slate-200 shadow-sm max-h-32 overflow-y-auto">
            <p className="text-sm text-slate-600 leading-relaxed whitespace-pre-line font-medium italic">
              {report.summary}
            </p>
          </div>
        </div>
        <div className="h-24 w-24 shrink-0">
           <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={chartData}
                innerRadius={0}
                outerRadius={45}
                paddingAngle={0}
                dataKey="value"
                stroke="none"
              >
                {chartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Results List - Scrollable Area */}
      <div className="p-6 overflow-y-auto flex-1 min-h-0">
         <div className="space-y-4">
            {report.issues.map((result, idx) => {
              return (
                <div key={idx} className="border border-slate-100 rounded-lg p-4 hover:shadow-md transition-shadow bg-white">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h4 className="font-bold text-slate-900">{result.ruleName || result.ruleId}</h4>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-xs font-bold border flex items-center gap-1 shrink-0 ${getStatusColor(result.status)}`}>
                       <span>{getStatusIcon(result.status)}</span>
                       {result.status}
                    </span>
                  </div>
                  
                  <p className="text-sm text-slate-700 mt-2 leading-relaxed">{result.message}</p>
                  
                  {result.detectedValue && (
                    <div className="mt-3 text-sm flex items-center gap-2">
                      <span className="font-semibold text-slate-600 text-xs uppercase tracking-wide">Evidence</span>
                      <span className="font-mono text-slate-800 bg-slate-100 px-2 py-0.5 rounded text-xs truncate max-w-xs">{result.detectedValue}</span>
                    </div>
                  )}

                  {result.suggestion && (
                    <div className="mt-3 text-sm bg-blue-50 text-blue-800 p-3 rounded-lg border border-blue-100 flex gap-2">
                      <span className="font-bold shrink-0">Required Action:</span>
                      <span>{result.suggestion}</span>
                    </div>
                  )}

                  {/* Related Files Tags */}
                  {result.relatedFileNames && result.relatedFileNames.length > 0 && (
                     <div className="mt-3 flex flex-wrap gap-2">
                       {result.relatedFileNames.map((fname, fidx) => (
                         <span key={fidx} className="inline-flex items-center px-2 py-1 rounded text-xs font-medium bg-slate-100 text-slate-600 border border-slate-200">
                           <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-3 h-3 mr-1 text-slate-400">
                              <path fillRule="evenodd" d="M4.5 2A1.5 1.5 0 003 3.5v13A1.5 1.5 0 004.5 18h11a1.5 1.5 0 001.5-1.5V7.621a1.5 1.5 0 00-.44-1.06l-4.12-4.122A1.5 1.5 0 0011.378 2H4.5zm2.25 8.5a.75.75 0 000 1.5h6.5a.75.75 0 000-1.5h-6.5zm0 3a.75.75 0 000 1.5h6.5a.75.75 0 000-1.5h-6.5z" clipRule="evenodd" />
                           </svg>
                           {fname}
                         </span>
                       ))}
                     </div>
                  )}
                </div>
              );
            })}
         </div>
      </div>
    </div>
  );
};

export default ValidationResults;
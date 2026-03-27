import React from 'react';
import { useSelector } from 'react-redux';
import { X, CheckCircle, AlertCircle, TrendingUp } from 'lucide-react';

export const AtsAnalysisModal = ({ isOpen, onClose }) => {
    const { atsData, isAtsLoading } = useSelector((state) => state.resume);

    if (!isOpen) return null;

    const ScoreCircle = ({ score, label }) => {
        let color = 'text-green-500';
        if (score < 50) color = 'text-red-500';
        else if (score < 80) color = 'text-yellow-500';

        return (
            <div className="flex flex-col items-center">
                <div className={`text-3xl font-bold ${color}`}>{score}%</div>
                <div className="text-sm text-gray-500 uppercase tracking-widest mt-1">{label}</div>
            </div>
        );
    };

    return (
        <div className="fixed inset-0 z-[100] overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
            <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
                <div className="fixed inset-0 transition-opacity bg-gray-500 bg-opacity-75" aria-hidden="true" onClick={onClose}></div>

                <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>

                <div className="inline-block px-4 pt-5 pb-4 overflow-hidden text-left align-bottom transition-all transform bg-white rounded-lg shadow-xl sm:my-8 sm:align-middle sm:max-w-3xl sm:w-full sm:p-6">
                    <div className="flex justify-between items-center border-b pb-3 mb-4">
                        <h3 className="text-xl font-medium leading-6 text-gray-900" id="modal-title">
                            AI ATS Analysis
                        </h3>
                        <button onClick={onClose} className="text-gray-400 hover:text-gray-500 focus:outline-none">
                            <X className="w-6 h-6" />
                        </button>
                    </div>

                    {isAtsLoading ? (
                        <div className="flex flex-col items-center justify-center py-12">
                            <div className="w-12 h-12 border-4 border-indigo-500 rounded-full border-t-transparent animate-spin mb-4"></div>
                            <p className="text-lg text-gray-700 font-medium">Analyzing your resume against industry standards...</p>
                            <p className="text-sm text-gray-500 mt-2">This may take a few seconds.</p>
                        </div>
                    ) : atsData ? (
                        <div className="space-y-6">
                            {/* Scores */}
                            <div className="bg-gray-50 rounded-lg p-6 border border-gray-100 flex flex-wrap justify-around items-center">
                                <ScoreCircle score={atsData.scores.overall} label="Overall Score" />
                                <div className="hidden md:block w-px h-16 bg-gray-300"></div>
                                <ScoreCircle score={atsData.scores.formatting} label="Formatting" />
                                <ScoreCircle score={atsData.scores.keywords} label="Keywords" />
                                <ScoreCircle score={atsData.scores.readability} label="Readability" />
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {/* Actionable Suggestions */}
                                <div className="bg-blue-50/50 rounded-lg p-5 border border-blue-100">
                                    <h4 className="flex items-center font-semibold text-blue-900 mb-3">
                                        <TrendingUp className="w-5 h-5 mr-2 text-blue-600" />
                                        Actionable Suggestions
                                    </h4>
                                    <ul className="space-y-2">
                                        {atsData.actionableSuggestions?.map((suggestion, i) => (
                                            <li key={i} className="flex items-start">
                                                <CheckCircle className="w-4 h-4 text-blue-500 mr-2 mt-0.5 flex-shrink-0" />
                                                <span className="text-sm text-gray-700">{suggestion}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>

                                {/* Missing Keywords */}
                                <div className="bg-yellow-50/50 rounded-lg p-5 border border-yellow-100">
                                    <h4 className="flex items-center font-semibold text-yellow-900 mb-3">
                                        <AlertCircle className="w-5 h-5 mr-2 text-yellow-600" />
                                        Missing Keywords to Consider
                                    </h4>
                                    <div className="flex flex-wrap gap-2">
                                        {atsData.missingKeywords?.length > 0 ? atsData.missingKeywords.map((kw, i) => (
                                            <span key={i} className="px-2.5 py-1 bg-yellow-100 text-yellow-800 text-xs font-medium rounded-md border border-yellow-200">
                                                {kw}
                                            </span>
                                        )) : <span className="text-sm text-gray-500">No major keywords missing!</span>}
                                    </div>
                                </div>
                            </div>

                            {/* Weak Sections */}
                            {atsData.weakSections?.length > 0 && (
                                <div className="bg-red-50/50 rounded-lg p-5 border border-red-100 mt-6">
                                    <h4 className="font-semibold text-red-900 mb-3">Sections Needing Improvement</h4>
                                    <div className="space-y-3">
                                        {atsData.weakSections.map((ws, i) => (
                                            <div key={i} className="bg-white p-3 rounded shadow-sm border border-red-50 text-sm">
                                                <div className="font-semibold text-gray-800 mb-1">{ws.section}</div>
                                                <div className="text-red-600 mb-1"><span className="font-medium">Issue:</span> {ws.reason}</div>
                                                <div className="text-green-600"><span className="font-medium">Fix:</span> {ws.suggestion}</div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}

                        </div>
                    ) : (
                        <div className="text-center py-8 text-gray-500">
                            No analysis data. Please click "Analyze ATS" to begin.
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

import React from 'react';
import { useSelector } from 'react-redux';
import { X, CheckCircle, AlertCircle, TrendingUp } from 'lucide-react';

export const AtsAnalysisModal = ({ isOpen, onClose }) => {
    const { atsData, isAtsLoading } = useSelector((state) => state.resume);

    if (!isOpen) return null;

    const ScoreCircle = ({ score, label }) => {
        let color = 'text-[#16a34a]';
        if (score < 50) color = 'text-[#e63946]';
        else if (score < 80) color = 'text-[#ea580c]';

        return (
            <div className="flex flex-col items-center">
                <div className={`text-3xl font-extrabold ${color}`}>{score}%</div>
                <div className="text-xs text-app-muted uppercase tracking-[0.16em] mt-1">{label}</div>
            </div>
        );
    };

    return (
        <div className="fixed inset-0 z-[100] overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
            <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
                <div className="fixed inset-0 transition-opacity bg-[#0f1117]/55" aria-hidden="true" onClick={onClose}></div>

                <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>

                <div className="inline-block px-4 pt-5 pb-4 overflow-hidden text-left align-bottom transition-all transform modal-card sm:my-8 sm:align-middle sm:max-w-3xl sm:w-full sm:p-6">
                    <div className="flex justify-between items-center border-b border-app pb-3 mb-4">
                        <h3 className="text-3xl font-extrabold" id="modal-title">ATS Analysis</h3>
                        <button onClick={onClose} className="text-app-muted hover:text-[#202530] focus:outline-none">
                            <X className="w-6 h-6" />
                        </button>
                    </div>

                    {isAtsLoading ? (
                        <div className="flex flex-col items-center justify-center py-12">
                            <div className="w-12 h-12 border-4 border-[#e63946] rounded-full border-t-transparent animate-spin mb-4"></div>
                            <p className="text-lg font-semibold">Analyzing your resume...</p>
                            <p className="text-sm text-app-muted mt-2">This usually takes a few seconds.</p>
                        </div>
                    ) : atsData ? (
                        <div className="space-y-6">
                            <div className="bg-[#f2f3f0] rounded-xl p-6 border border-app flex flex-wrap justify-around items-center">
                                <ScoreCircle score={atsData.scores.overall} label="Overall" />
                                <div className="hidden md:block w-px h-16 bg-[#ccd2dc]"></div>
                                <ScoreCircle score={atsData.scores.formatting} label="Formatting" />
                                <ScoreCircle score={atsData.scores.keywords} label="Keywords" />
                                <ScoreCircle score={atsData.scores.readability} label="Readability" />
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="bg-white rounded-xl p-5 border border-app">
                                    <h4 className="flex items-center font-bold text-[#202530] mb-3">
                                        <TrendingUp className="w-5 h-5 mr-2 text-[#e63946]" />
                                        Actionable Suggestions
                                    </h4>
                                    <ul className="space-y-2">
                                        {atsData.actionableSuggestions?.map((suggestion, i) => (
                                            <li key={i} className="flex items-start">
                                                <CheckCircle className="w-4 h-4 text-[#16a34a] mr-2 mt-0.5 flex-shrink-0" />
                                                <span className="text-sm text-[#2f3644]">{suggestion}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>

                                <div className="bg-white rounded-xl p-5 border border-app">
                                    <h4 className="flex items-center font-bold text-[#202530] mb-3">
                                        <AlertCircle className="w-5 h-5 mr-2 text-[#ea580c]" />
                                        Missing Keywords
                                    </h4>
                                    <div className="flex flex-wrap gap-2">
                                        {atsData.missingKeywords?.length > 0 ? atsData.missingKeywords.map((kw, i) => (
                                            <span key={i} className="px-2.5 py-1 bg-[#ffe9ec] text-[#c92233] text-xs font-semibold rounded-md border border-[#f8cfd5]">
                                                {kw}
                                            </span>
                                        )) : <span className="text-sm text-app-muted">No major keywords missing.</span>}
                                    </div>
                                </div>
                            </div>

                            {atsData.weakSections?.length > 0 && (
                                <div className="bg-white rounded-xl p-5 border border-app mt-6">
                                    <h4 className="font-bold text-[#202530] mb-3">Sections Needing Improvement</h4>
                                    <div className="space-y-3">
                                        {atsData.weakSections.map((ws, i) => (
                                            <div key={i} className="bg-[#f7f8f5] p-3 rounded-lg border border-app text-sm">
                                                <div className="font-semibold text-[#111217] mb-1">{ws.section}</div>
                                                <div className="text-[#e63946] mb-1"><span className="font-semibold">Issue:</span> {ws.reason}</div>
                                                <div className="text-[#16a34a]"><span className="font-semibold">Fix:</span> {ws.suggestion}</div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    ) : (
                        <div className="text-center py-8 text-app-muted">No analysis data yet.</div>
                    )}
                </div>
            </div>
        </div>
    );
};

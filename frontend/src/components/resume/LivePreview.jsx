import React, { useRef } from 'react';
import TemplateManager from './templates/TemplateManager';
import { Download, LayoutTemplate, ChevronDown } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { setTemplate } from '../../redux/slices/resumeSlice';

export const LivePreview = () => {
    const resumeRef = useRef(null);
    const dispatch = useDispatch();
    const { currentResume } = useSelector(state => state.resume);

    const downloadPDF = async () => {
        const element = resumeRef.current;
        if (!element) return;

        const { default: html2pdf } = await import('html2pdf.js');

        const opt = {
            margin: 0,
            filename: 'resume.pdf',
            image: { type: 'jpeg', quality: 0.98 },
            html2canvas: { scale: 2, useCORS: true },
            jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' }
        };

        html2pdf().set(opt).from(element).save();
    };

    return (
        <div className="flex flex-col h-full relative" style={{ background: 'var(--surface)' }}>
            {/* Header */}
            <div className="border-b border-app px-4 py-3 md:px-5 md:py-4 z-10 sticky top-0" style={{ background: 'var(--surface)' }}>
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div>
                            <p className="section-caption">Output</p>
                            <h2 className="text-lg md:text-xl font-extrabold leading-tight">Live Preview</h2>
                        </div>
                    </div>
                    <button onClick={downloadPDF} className="btn-primary text-xs md:text-sm">
                        <Download className="w-4 h-4 mr-1.5" />
                        Export PDF
                    </button>
                </div>

                {/* Template selector row */}
                <div className="mt-3 flex items-center gap-2">
                    <div className="flex items-center gap-2 rounded-xl px-3 py-2 border border-app" style={{ background: 'var(--surface-2)' }}>
                        <LayoutTemplate className="w-4 h-4 flex-shrink-0" style={{ color: 'var(--accent)' }} />
                        <select
                            value={currentResume.templateType || 'Modern'}
                            onChange={(e) => dispatch(setTemplate(e.target.value))}
                            className="bg-transparent border-none text-sm font-bold focus:outline-none focus:ring-0 cursor-pointer pr-1 py-0"
                            style={{ color: 'var(--text)' }}
                        >
                            <option value="Modern">Modern</option>
                            <option value="Minimal">Minimal</option>
                            <option value="Corporate">Corporate</option>
                            <option value="Classic">Classic</option>
                            <option value="Harvard">Harvard</option>
                            <option value="Executive">Executive</option>
                        </select>
                    </div>
                    <span className="text-[11px] uppercase tracking-[0.12em] font-semibold" style={{ color: 'var(--text-muted)' }}>Template</span>
                </div>
            </div>

            {/* Resume canvas */}
            <div className="flex-1 overflow-y-auto p-4 md:p-6 flex justify-center" style={{ background: 'var(--surface-2)', backgroundImage: 'radial-gradient(circle at 50% 0%, rgba(230,57,70,0.04), transparent 60%)' }}>
                <div
                    ref={resumeRef}
                    className="border border-app shadow-sm transform origin-top scale-[0.6] sm:scale-75 md:scale-90 lg:scale-[0.98] transition-all duration-300 rounded-sm"
                    style={{ width: '8.5in', minHeight: '11in', background: '#ffffff' }}
                >
                    <TemplateManager />
                </div>
            </div>
        </div>
    );
};

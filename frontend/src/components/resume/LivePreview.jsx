import React, { useRef } from 'react';
import html2pdf from 'html2pdf.js';
import TemplateManager from './templates/TemplateManager';
import { Download, LayoutTemplate } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { setTemplate } from '../../redux/slices/resumeSlice';

export const LivePreview = () => {
    const resumeRef = useRef(null);
    const dispatch = useDispatch();
    const { currentResume } = useSelector(state => state.resume);

    const downloadPDF = () => {
        const element = resumeRef.current;
        if (!element) return;

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
        <div className="flex flex-col h-full bg-gray-50 relative">
            <div className="px-4 py-3 border-b bg-white flex justify-between items-center shadow-sm z-10 sticky top-0">
                <div className="flex items-center space-x-4">
                    <h2 className="text-lg font-medium text-gray-800">Live Preview</h2>
                    
                    <div className="flex items-center justify-between space-x-2 bg-gray-100 rounded-md px-3 py-1.5 border border-gray-200">
                        <LayoutTemplate className="w-4 h-4 text-gray-500 " />
                        <select 
                            value={currentResume.templateType || 'Modern'} 
                            onChange={(e) => dispatch(setTemplate(e.target.value))}
                            className="bg-transparent border-none text-sm font-medium text-gray-700 focus:outline-none focus:ring-0 cursor-pointer"
                        >
                            <option value="Modern">Modern Template</option>
                            <option value="Minimal">Minimal Template</option>
                            <option value="Corporate">Corporate Template</option>
                            <option value="Classic">Classic Template (ATS)</option>
                            <option value="Harvard">Harvard Template (ATS Safe)</option>
                            <option value="Executive">Executive Themes</option>
                        </select>
                    </div>
                </div>

                <div className="flex space-x-2">
                    <button
                        onClick={downloadPDF}
                        className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 shadow-sm transition-colors"
                    >
                        <Download className="w-4 h-4 mr-1.5" />
                        Download
                    </button>
                </div>
            </div>

            <div className="flex-1 overflow-y-auto p-4 md:p-8 flex justify-center bg-gray-200">
                <div
                    ref={resumeRef}
                    className="shadow-2xl transform origin-top scale-[0.6] sm:scale-75 md:scale-90 lg:scale-[0.98] transition-all duration-300"
                    style={{ width: '8.5in', minHeight: '11in' }}
                >
                    <TemplateManager />
                </div>
            </div>
        </div>
    );
};

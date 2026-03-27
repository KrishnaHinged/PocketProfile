import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setThemeColor, toggleAtsSafeMode } from '../../redux/slices/resumeSlice';

const PREDEFINED_COLORS = ['#374151', '#2563eb', '#16a34a', '#dc2626', '#4f46e5', '#ca8a04', '#0891b2', '#be185d'];

export const CustomizationPanel = () => {
    const dispatch = useDispatch();
    const { currentResume } = useSelector(state => state.resume);
    
    // Fallback if older resumes load without the themeSettings object
    const themeSettings = currentResume.themeSettings || {
        primaryColor: '#374151',
        secondaryColor: '#6B7280',
        isAtsSafeMode: true
    };

    const { primaryColor, secondaryColor, isAtsSafeMode } = themeSettings;

    return (
        <div className="space-y-6">
            <div className="bg-white border rounded-lg p-5 shadow-sm">
                <h3 className="text-lg font-medium text-gray-900 border-b pb-3 mb-4">Design Settings</h3>
                
                {/* ATS SAFE TOGGLE */}
                <div className="flex items-center justify-between bg-blue-50 p-4 rounded-md border border-blue-200 mb-6 transition-all">
                    <div>
                        <h4 className="font-semibold text-blue-900">ATS Safe Mode</h4>
                        <p className="text-xs text-blue-700 mt-1">Locks formatting to strict ATS standards.<br />Disables custom colors and defaults to 'Harvard' model.</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                        <input 
                            type="checkbox" 
                            checked={isAtsSafeMode} 
                            onChange={(e) => dispatch(toggleAtsSafeMode(e.target.checked))} 
                            className="sr-only peer"
                        />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                    </label>
                </div>

                {/* COLOR PICKER AREA */}
                <div className={`transition-opacity duration-300 ${isAtsSafeMode ? 'opacity-40 pointer-events-none grayscale' : ''}`}>
                    <div className="mb-6">
                        <label className="block text-sm font-medium text-gray-700 mb-3">Primary Color (Headings & Accents)</label>
                        <div className="flex flex-wrap items-center gap-3 mb-4">
                            {PREDEFINED_COLORS.map(hex => (
                                <button 
                                    key={hex} 
                                    style={{ backgroundColor: hex }}
                                    onClick={() => dispatch(setThemeColor({ key: 'primaryColor', value: hex }))}
                                    title={hex}
                                    className={`w-8 h-8 rounded-full shadow-sm border-2 transform transition-transform hover:scale-110 focus:outline-none ${primaryColor === hex ? 'border-gray-900 ring-2 ring-offset-1 ring-gray-400 scale-110' : 'border-transparent'}`}
                                />
                            ))}
                        </div>
                        <div className="flex items-center space-x-3 bg-gray-50 border p-2 rounded-md w-max">
                            <input 
                                type="color" 
                                value={primaryColor} 
                                onChange={(e) => dispatch(setThemeColor({ key: 'primaryColor', value: e.target.value }))}
                                className="w-8 h-8 cursor-pointer rounded overflow-hidden p-0 border-0" 
                                title="Custom Color"
                            />
                            <span className="text-sm text-gray-600 font-mono uppercase pr-2">{primaryColor}</span>
                        </div>
                    </div>

                    <div className="pt-4 border-t border-gray-100">
                        <label className="block text-sm font-medium text-gray-700 mb-3">Secondary Color (Subheadings & Borders)</label>
                        <div className="flex items-center space-x-3 bg-gray-50 border p-2 rounded-md w-max">
                            <input 
                                type="color" 
                                value={secondaryColor} 
                                onChange={(e) => dispatch(setThemeColor({ key: 'secondaryColor', value: e.target.value }))}
                                className="w-8 h-8 cursor-pointer rounded overflow-hidden p-0 border-0" 
                            />
                            <span className="text-sm text-gray-600 font-mono uppercase pr-2">{secondaryColor}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

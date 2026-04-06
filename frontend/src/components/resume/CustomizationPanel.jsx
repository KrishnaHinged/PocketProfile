import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setThemeColor, toggleAtsSafeMode } from '../../redux/slices/resumeSlice';

const PREDEFINED_COLORS = ['#111827', '#e63946', '#2563eb', '#0f766e', '#16a34a', '#ea580c', '#7c3aed', '#1f2937'];

export const CustomizationPanel = () => {
    const dispatch = useDispatch();
    const { currentResume } = useSelector(state => state.resume);

    const themeSettings = currentResume.themeSettings || {
        primaryColor: '#111827',
        secondaryColor: '#6B7280',
        isAtsSafeMode: true
    };

    const { primaryColor, secondaryColor, isAtsSafeMode } = themeSettings;

    return (
        <div className="feature-card space-y-6">
            <div>
                <p className="section-caption">Design System</p>
                <h3 className="section-title">Customization</h3>
            </div>

            <div className="flex items-center justify-between bg-[#f2f3f0] p-4 rounded-xl border border-app transition-all">
                <div>
                    <h4 className="font-bold text-[#202530]">ATS Safe Mode</h4>
                    <p className="text-xs text-app-muted mt-1">Locks formatting for strict parser compatibility.</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                    <input
                        type="checkbox"
                        checked={isAtsSafeMode}
                        onChange={(e) => dispatch(toggleAtsSafeMode(e.target.checked))}
                        className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-[#cbd2dd] rounded-full peer peer-checked:bg-[#e63946] after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-[#aeb5c2] after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:after:translate-x-full"></div>
                </label>
            </div>

            <div className={`transition-opacity duration-300 ${isAtsSafeMode ? 'opacity-40 pointer-events-none grayscale' : ''}`}>
                <div className="mb-6">
                    <label className="field-label">Primary Color</label>
                    <div className="flex flex-wrap items-center gap-3 mb-4">
                        {PREDEFINED_COLORS.map(hex => (
                            <button
                                key={hex}
                                style={{ backgroundColor: hex }}
                                onClick={() => dispatch(setThemeColor({ key: 'primaryColor', value: hex }))}
                                title={hex}
                                className={`w-8 h-8 rounded-full border-2 transition-transform hover:scale-110 ${primaryColor === hex ? 'border-[#111217] ring-2 ring-[#d0d4dc] scale-110' : 'border-transparent'}`}
                            />
                        ))}
                    </div>
                    <div className="flex items-center space-x-3 bg-[#f2f3f0] border border-app p-2 rounded-lg w-max">
                        <input
                            type="color"
                            value={primaryColor}
                            onChange={(e) => dispatch(setThemeColor({ key: 'primaryColor', value: e.target.value }))}
                            className="w-8 h-8 cursor-pointer rounded overflow-hidden p-0 border-0"
                        />
                        <span className="text-sm text-app-muted font-mono uppercase pr-2">{primaryColor}</span>
                    </div>
                </div>

                <div className="pt-4 border-t border-app">
                    <label className="field-label">Secondary Color</label>
                    <div className="flex items-center space-x-3 bg-[#f2f3f0] border border-app p-2 rounded-lg w-max">
                        <input
                            type="color"
                            value={secondaryColor}
                            onChange={(e) => dispatch(setThemeColor({ key: 'secondaryColor', value: e.target.value }))}
                            className="w-8 h-8 cursor-pointer rounded overflow-hidden p-0 border-0"
                        />
                        <span className="text-sm text-app-muted font-mono uppercase pr-2">{secondaryColor}</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

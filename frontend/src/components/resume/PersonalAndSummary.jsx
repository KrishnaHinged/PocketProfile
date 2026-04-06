import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { updatePersonalInfo, updateSummary, enhanceTextWithAI } from '../../redux/slices/resumeSlice';
import { Sparkles } from 'lucide-react';

export const PersonalInfoForm = () => {
    const dispatch = useDispatch();
    const personalInfo = useSelector((state) => state.resume.currentResume.personalInfo);

    const handleChange = (e) => {
        dispatch(updatePersonalInfo({ [e.target.name]: e.target.value }));
    };

    return (
        <section className="feature-card space-y-5">
            <div>
                <p className="section-caption">Profile Block</p>
                <h2 className="section-title">Personal Information</h2>
                <p className="text-sm text-app-muted mt-1">Set core identity details used across every template and export.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                    <label className="field-label">Full Name</label>
                    <input type="text" name="fullName" value={personalInfo.fullName} onChange={handleChange} />
                </div>
                <div>
                    <label className="field-label">Email</label>
                    <input type="email" name="email" value={personalInfo.email} onChange={handleChange} />
                </div>
                <div>
                    <label className="field-label">Phone</label>
                    <input type="tel" name="phone" value={personalInfo.phone} onChange={handleChange} />
                </div>
                <div>
                    <label className="field-label">Location</label>
                    <input type="text" name="location" value={personalInfo.location} onChange={handleChange} />
                </div>
                <div>
                    <label className="field-label">LinkedIn</label>
                    <input type="url" name="linkedin" value={personalInfo.linkedin} onChange={handleChange} />
                </div>
                <div>
                    <label className="field-label">Portfolio / GitHub</label>
                    <input type="url" name="github" value={personalInfo.github} onChange={handleChange} />
                </div>
            </div>
        </section>
    );
};

export const SummaryForm = () => {
    const dispatch = useDispatch();
    const summary = useSelector((state) => state.resume.currentResume.professionalSummary);
    const [isGenerating, setIsGenerating] = useState(false);

    const handleChange = (e) => {
        dispatch(updateSummary(e.target.value));
    };

    const handleAIEnhance = async () => {
        setIsGenerating(true);
        dispatch(enhanceTextWithAI({ text: summary, type: 'summary' }))
            .unwrap()
            .then((enhancedText) => {
                dispatch(updateSummary(enhancedText.enhancedText || enhancedText));
                setIsGenerating(false);
            })
            .catch((err) => {
                console.error('AI Error:', err);
                setIsGenerating(false);
            });
    };

    return (
        <section className="feature-card space-y-4 mt-6">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <div>
                    <p className="section-caption">Value Proposition</p>
                    <h2 className="section-title">Professional Summary</h2>
                </div>
                <button onClick={handleAIEnhance} disabled={isGenerating || !summary} className="btn-secondary disabled:opacity-50">
                    <Sparkles className="w-4 h-4 mr-1" />
                    {isGenerating ? 'Enhancing...' : 'Enhance with AI'}
                </button>
            </div>

            <textarea
                rows={5}
                value={summary}
                onChange={handleChange}
                placeholder="Write a concise, high-impact summary of your expertise and outcomes..."
            />
        </section>
    );
};

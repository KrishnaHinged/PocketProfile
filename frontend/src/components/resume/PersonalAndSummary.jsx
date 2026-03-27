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
        <div className="space-y-4">
            <h2 className="text-xl font-semibold text-gray-800 border-b pb-2">Personal Information</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700">Full Name</label>
                    <input
                        type="text"
                        name="fullName"
                        value={personalInfo.fullName}
                        onChange={handleChange}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2 border"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">Email Header</label>
                    <input
                        type="email"
                        name="email"
                        value={personalInfo.email}
                        onChange={handleChange}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2 border"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">Phone</label>
                    <input
                        type="tel"
                        name="phone"
                        value={personalInfo.phone}
                        onChange={handleChange}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2 border"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">Location (City, State)</label>
                    <input
                        type="text"
                        name="location"
                        value={personalInfo.location}
                        onChange={handleChange}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2 border"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">LinkedIn Profile</label>
                    <input
                        type="url"
                        name="linkedin"
                        value={personalInfo.linkedin}
                        onChange={handleChange}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2 border"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">GitHub / Portfolio</label>
                    <input
                        type="url"
                        name="github"
                        value={personalInfo.github}
                        onChange={handleChange}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2 border"
                    />
                </div>
            </div>
        </div>
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
                console.error("AI Error:", err);
                setIsGenerating(false);
            });
    };

    return (
        <div className="space-y-4 mt-8">
            <h2 className="text-xl font-semibold text-gray-800 border-b pb-2 flex justify-between items-center">
                Professional Summary
                <button
                    onClick={handleAIEnhance}
                    disabled={isGenerating || !summary}
                    className="inline-flex items-center px-3 py-1 border border-transparent text-sm font-medium rounded-md text-indigo-700 bg-indigo-100 hover:bg-indigo-200 disabled:opacity-50"
                >
                    <Sparkles className="w-4 h-4 mr-1" />
                    {isGenerating ? 'Enhancing...' : 'Enhance with AI'}
                </button>
            </h2>
            <div>
                <textarea
                    rows={4}
                    value={summary}
                    onChange={handleChange}
                    placeholder="Write a brief professional summary..."
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2 border"
                />
            </div>
        </div>
    );
};

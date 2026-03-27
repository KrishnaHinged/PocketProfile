import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addExperience, updateExperience, removeExperience, enhanceTextWithAI } from '../../redux/slices/resumeSlice';
import { Plus, Trash2, Sparkles } from 'lucide-react';

export const ExperienceForm = () => {
    const dispatch = useDispatch();
    const experienceList = useSelector((state) => state.resume.currentResume.experience);
    const [generatingIndex, setGeneratingIndex] = useState(null);

    const handleAdd = () => {
        dispatch(addExperience({
            jobTitle: '',
            employer: '',
            city: '',
            state: '',
            startDate: '',
            endDate: '',
            current: false,
            description: ''
        }));
    };

    const handleChange = (index, field, value) => {
        dispatch(updateExperience({ index, data: { [field]: value } }));
    };

    const handleRemove = (index) => {
        dispatch(removeExperience(index));
    };

    const handleAIEnhance = async (index) => {
        setGeneratingIndex(index);
        const currentDesc = experienceList[index].description;

        dispatch(enhanceTextWithAI({ text: currentDesc, type: 'experience' }))
            .unwrap()
            .then((enhancedText) => {
                handleChange(index, 'description', enhancedText.enhancedText || enhancedText);
                setGeneratingIndex(null);
            })
            .catch((err) => {
                console.error("AI Error:", err);
                setGeneratingIndex(null);
            });
    };

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center border-b pb-2">
                <h2 className="text-xl font-semibold text-gray-800">Work Experience</h2>
                <button
                    onClick={handleAdd}
                    className="inline-flex items-center px-3 py-1.5 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
                >
                    <Plus className="w-4 h-4 mr-1" />
                    Add Experience
                </button>
            </div>

            {experienceList.length === 0 ? (
                <p className="text-sm text-gray-500 italic">No work experience added yet. Click &quot;Add Experience&quot; to begin.</p>
            ) : (
                <div className="space-y-6">
                    {experienceList.map((exp, index) => (
                        <div key={index} className="p-4 border border-gray-200 rounded-lg bg-gray-50">
                            <div className="flex justify-between items-center mb-4">
                                <h3 className="text-lg font-medium text-gray-700">Experience {index + 1}</h3>
                                <button
                                    onClick={() => handleRemove(index)}
                                    className="text-red-500 hover:text-red-700 p-1"
                                >
                                    <Trash2 className="w-5 h-5" />
                                </button>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Job Title</label>
                                    <input
                                        type="text"
                                        value={exp.jobTitle}
                                        onChange={(e) => handleChange(index, 'jobTitle', e.target.value)}
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2 border"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Employer</label>
                                    <input
                                        type="text"
                                        value={exp.employer}
                                        onChange={(e) => handleChange(index, 'employer', e.target.value)}
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2 border"
                                    />
                                </div>
                                <div className="grid grid-cols-2 gap-2">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700">Start Date</label>
                                        <input
                                            type="month"
                                            value={exp.startDate}
                                            onChange={(e) => handleChange(index, 'startDate', e.target.value)}
                                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2 border"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700">End Date</label>
                                        <input
                                            type="month"
                                            value={exp.endDate}
                                            onChange={(e) => handleChange(index, 'endDate', e.target.value)}
                                            disabled={exp.current}
                                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2 border disabled:bg-gray-200"
                                        />
                                    </div>
                                </div>
                                <div className="flex items-center mt-6">
                                    <input
                                        type="checkbox"
                                        checked={exp.current}
                                        onChange={(e) => handleChange(index, 'current', e.target.checked)}
                                        className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                                    />
                                    <label className="ml-2 block text-sm text-gray-900">
                                        I currently work here
                                    </label>
                                </div>

                                <div className="col-span-1 md:col-span-2">
                                    <div className="flex justify-between items-center mb-1">
                                        <label className="block text-sm font-medium text-gray-700">Description</label>
                                        <button
                                            onClick={() => handleAIEnhance(index)}
                                            disabled={generatingIndex === index || !exp.description}
                                            className="inline-flex items-center px-2 py-1 text-xs font-medium rounded text-indigo-700 bg-indigo-100 hover:bg-indigo-200 disabled:opacity-50"
                                        >
                                            <Sparkles className="w-3 h-3 mr-1" />
                                            {generatingIndex === index ? 'Enhancing...' : 'Enhance with AI'}
                                        </button>
                                    </div>
                                    <textarea
                                        rows={4}
                                        value={exp.description}
                                        onChange={(e) => handleChange(index, 'description', e.target.value)}
                                        placeholder="Describe your responsibilities and achievements..."
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2 border"
                                    />
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

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
                console.error('AI Error:', err);
                setGeneratingIndex(null);
            });
    };

    return (
        <div className="space-y-5">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between pb-2 border-b border-app">
                <div>
                    <p className="section-caption">Experience Engine</p>
                    <h2 className="section-title">Work Experience</h2>
                </div>
                <button onClick={handleAdd} className="btn-secondary">
                    <Plus className="w-4 h-4 mr-1" />
                    Add Experience
                </button>
            </div>

            {experienceList.length === 0 ? (
                <p className="text-sm text-app-muted italic">No entries yet. Add your first role to get started.</p>
            ) : (
                <div className="space-y-5">
                    {experienceList.map((exp, index) => (
                        <section key={index} className="feature-card">
                            <div className="flex justify-between items-center mb-4">
                                <h3 className="text-xl font-extrabold">Role #{index + 1}</h3>
                                <button onClick={() => handleRemove(index)} className="btn-secondary !text-[#e63946]">
                                    <Trash2 className="w-4 h-4" />
                                </button>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="field-label">Job Title</label>
                                    <input type="text" value={exp.jobTitle} onChange={(e) => handleChange(index, 'jobTitle', e.target.value)} />
                                </div>
                                <div>
                                    <label className="field-label">Employer</label>
                                    <input type="text" value={exp.employer} onChange={(e) => handleChange(index, 'employer', e.target.value)} />
                                </div>
                                <div className="grid grid-cols-2 gap-2">
                                    <div>
                                        <label className="field-label">Start Date</label>
                                        <input type="month" value={exp.startDate} onChange={(e) => handleChange(index, 'startDate', e.target.value)} />
                                    </div>
                                    <div>
                                        <label className="field-label">End Date</label>
                                        <input type="month" value={exp.endDate} onChange={(e) => handleChange(index, 'endDate', e.target.value)} disabled={exp.current} className="disabled:bg-[#eef0f4]" />
                                    </div>
                                </div>
                                <label className="flex items-center mt-6 text-sm font-medium text-app-muted">
                                    <input type="checkbox" checked={exp.current} onChange={(e) => handleChange(index, 'current', e.target.checked)} className="h-4 w-4 mr-2 rounded border-app" />
                                    I currently work here
                                </label>

                                <div className="col-span-1 md:col-span-2">
                                    <div className="flex justify-between items-center mb-1">
                                        <label className="field-label !mb-0">Impact Summary</label>
                                        <button
                                            onClick={() => handleAIEnhance(index)}
                                            disabled={generatingIndex === index || !exp.description}
                                            className="btn-secondary !py-1 !px-3 text-xs disabled:opacity-50"
                                        >
                                            <Sparkles className="w-3 h-3 mr-1" />
                                            {generatingIndex === index ? 'Enhancing...' : 'Enhance with AI'}
                                        </button>
                                    </div>
                                    <textarea
                                        rows={4}
                                        value={exp.description}
                                        onChange={(e) => handleChange(index, 'description', e.target.value)}
                                        placeholder="Describe outcomes, ownership, and measurable impact..."
                                    />
                                </div>
                            </div>
                        </section>
                    ))}
                </div>
            )}
        </div>
    );
};

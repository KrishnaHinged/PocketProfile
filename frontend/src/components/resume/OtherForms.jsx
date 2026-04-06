import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
    addEducation, updateEducation, removeEducation,
    updateSkills,
    addProject, updateProject, removeProject
} from '../../redux/slices/resumeSlice';
import { Plus, Trash2 } from 'lucide-react';

export const EducationForm = () => {
    const dispatch = useDispatch();
    const educationList = useSelector((state) => state.resume.currentResume.education);

    const handleAdd = () => {
        dispatch(addEducation({
            school: '',
            degree: '',
            fieldOfStudy: '',
            startDate: '',
            endDate: '',
            current: false,
            description: ''
        }));
    };

    const handleChange = (index, field, value) => {
        dispatch(updateEducation({ index, data: { [field]: value } }));
    };

    const handleRemove = (index) => {
        dispatch(removeEducation(index));
    };

    return (
        <div className="space-y-5">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between pb-2 border-b border-app">
                <div>
                    <p className="section-caption">Credential Block</p>
                    <h2 className="section-title">Education</h2>
                </div>
                <button onClick={handleAdd} className="btn-secondary">
                    <Plus className="w-4 h-4 mr-1" />
                    Add Education
                </button>
            </div>

            {educationList.length === 0 ? (
                <p className="text-sm text-app-muted italic">No education entries yet.</p>
            ) : (
                <div className="space-y-5">
                    {educationList.map((edu, index) => (
                        <section key={index} className="feature-card">
                            <div className="flex justify-between items-center mb-4">
                                <h3 className="text-xl font-extrabold">Education #{index + 1}</h3>
                                <button onClick={() => handleRemove(index)} className="btn-secondary !text-[#e63946]">
                                    <Trash2 className="w-4 h-4" />
                                </button>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="field-label">School / University</label>
                                    <input type="text" value={edu.school} onChange={(e) => handleChange(index, 'school', e.target.value)} />
                                </div>
                                <div>
                                    <label className="field-label">Degree</label>
                                    <input type="text" value={edu.degree} onChange={(e) => handleChange(index, 'degree', e.target.value)} />
                                </div>
                                <div className="col-span-1 md:col-span-2">
                                    <label className="field-label">Field of Study</label>
                                    <input type="text" value={edu.fieldOfStudy} onChange={(e) => handleChange(index, 'fieldOfStudy', e.target.value)} />
                                </div>
                                <div className="grid grid-cols-2 gap-2">
                                    <div>
                                        <label className="field-label">Start Date</label>
                                        <input type="month" value={edu.startDate} onChange={(e) => handleChange(index, 'startDate', e.target.value)} />
                                    </div>
                                    <div>
                                        <label className="field-label">End Date</label>
                                        <input type="month" value={edu.endDate} onChange={(e) => handleChange(index, 'endDate', e.target.value)} disabled={edu.current} className="disabled:bg-[#eef0f4]" />
                                    </div>
                                </div>
                                <label className="flex items-center mt-6 text-sm font-medium text-app-muted">
                                    <input type="checkbox" checked={edu.current} onChange={(e) => handleChange(index, 'current', e.target.checked)} className="h-4 w-4 mr-2 rounded border-app" />
                                    I currently attend here
                                </label>

                                <div className="col-span-1 md:col-span-2">
                                    <label className="field-label">Highlights</label>
                                    <textarea
                                        rows={3}
                                        value={edu.description}
                                        onChange={(e) => handleChange(index, 'description', e.target.value)}
                                        placeholder="Awards, coursework, leadership, or notable outcomes..."
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

export const SkillsForm = () => {
    const dispatch = useDispatch();
    const skillsList = useSelector((state) => state.resume.currentResume.skills);

    const handleChange = (e) => {
        const skillsArray = e.target.value.split(',').map(s => s.trim());
        dispatch(updateSkills(skillsArray));
    };

    return (
        <section className="feature-card space-y-4">
            <p className="section-caption">Capability Stack</p>
            <h2 className="section-title">Skills</h2>
            <p className="text-sm text-app-muted">Use a comma-separated list to keep parsing and ATS matching clean.</p>
            <textarea
                value={skillsList.join(', ')}
                onChange={handleChange}
                rows="5"
                placeholder="React, Node.js, TypeScript, Product Thinking, Communication..."
            ></textarea>
        </section>
    );
};

export const ProjectsForm = () => {
    const dispatch = useDispatch();
    const projectsList = useSelector((state) => state.resume.currentResume.projects);

    const handleAdd = () => {
        dispatch(addProject({
            title: '',
            link: '',
            description: ''
        }));
    };

    const handleChange = (index, field, value) => {
        dispatch(updateProject({ index, data: { [field]: value } }));
    };

    const handleRemove = (index) => {
        dispatch(removeProject(index));
    };

    return (
        <div className="space-y-5">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between pb-2 border-b border-app">
                <div>
                    <p className="section-caption">Build Portfolio</p>
                    <h2 className="section-title">Projects</h2>
                </div>
                <button onClick={handleAdd} className="btn-secondary">
                    <Plus className="w-4 h-4 mr-1" />
                    Add Project
                </button>
            </div>

            {projectsList.length === 0 ? (
                <p className="text-sm text-app-muted italic">No projects yet.</p>
            ) : (
                <div className="space-y-5">
                    {projectsList.map((proj, index) => (
                        <section key={index} className="feature-card">
                            <div className="flex justify-between items-center mb-4">
                                <h3 className="text-xl font-extrabold">Project #{index + 1}</h3>
                                <button onClick={() => handleRemove(index)} className="btn-secondary !text-[#e63946]">
                                    <Trash2 className="w-4 h-4" />
                                </button>
                            </div>

                            <div className="grid grid-cols-1 gap-4">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <label className="field-label">Project Title</label>
                                        <input type="text" value={proj.title} onChange={(e) => handleChange(index, 'title', e.target.value)} />
                                    </div>
                                    <div>
                                        <label className="field-label">Link / URL</label>
                                        <input type="url" value={proj.link} onChange={(e) => handleChange(index, 'link', e.target.value)} />
                                    </div>
                                </div>

                                <div>
                                    <label className="field-label">Project Impact</label>
                                    <textarea
                                        rows={4}
                                        value={proj.description}
                                        onChange={(e) => handleChange(index, 'description', e.target.value)}
                                        placeholder="Describe what you built, what changed, and why it matters..."
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

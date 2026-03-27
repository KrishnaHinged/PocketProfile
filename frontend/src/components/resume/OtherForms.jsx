import React, { useState } from 'react';
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
        <div className="space-y-6">
            <div className="flex justify-between items-center border-b pb-2">
                <h2 className="text-xl font-semibold text-gray-800">Education</h2>
                <button
                    onClick={handleAdd}
                    className="inline-flex items-center px-3 py-1.5 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
                >
                    <Plus className="w-4 h-4 mr-1" />
                    Add Education
                </button>
            </div>

            {educationList.length === 0 ? (
                <p className="text-sm text-gray-500 italic">No education details added yet. Click "Add Education" to begin.</p>
            ) : (
                <div className="space-y-6">
                    {educationList.map((edu, index) => (
                        <div key={index} className="p-4 border border-gray-200 rounded-lg bg-gray-50">
                            <div className="flex justify-between items-center mb-4">
                                <h3 className="text-lg font-medium text-gray-700">Education {index + 1}</h3>
                                <button
                                    onClick={() => handleRemove(index)}
                                    className="text-red-500 hover:text-red-700 p-1"
                                >
                                    <Trash2 className="w-5 h-5" />
                                </button>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">School/University</label>
                                    <input
                                        type="text"
                                        value={edu.school}
                                        onChange={(e) => handleChange(index, 'school', e.target.value)}
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2 border"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Degree</label>
                                    <input
                                        type="text"
                                        value={edu.degree}
                                        onChange={(e) => handleChange(index, 'degree', e.target.value)}
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2 border"
                                    />
                                </div>
                                <div className="col-span-1 md:col-span-2">
                                    <label className="block text-sm font-medium text-gray-700">Field of Study</label>
                                    <input
                                        type="text"
                                        value={edu.fieldOfStudy}
                                        onChange={(e) => handleChange(index, 'fieldOfStudy', e.target.value)}
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2 border"
                                    />
                                </div>
                                <div className="grid grid-cols-2 gap-2">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700">Start Date</label>
                                        <input
                                            type="month"
                                            value={edu.startDate}
                                            onChange={(e) => handleChange(index, 'startDate', e.target.value)}
                                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2 border"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700">End Date</label>
                                        <input
                                            type="month"
                                            value={edu.endDate}
                                            onChange={(e) => handleChange(index, 'endDate', e.target.value)}
                                            disabled={edu.current}
                                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2 border disabled:bg-gray-200"
                                        />
                                    </div>
                                </div>
                                <div className="flex items-center mt-6">
                                    <input
                                        type="checkbox"
                                        checked={edu.current}
                                        onChange={(e) => handleChange(index, 'current', e.target.checked)}
                                        className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                                    />
                                    <label className="ml-2 block text-sm text-gray-900">
                                        I currently attend here
                                    </label>
                                </div>

                                <div className="col-span-1 md:col-span-2">
                                    <label className="block text-sm font-medium text-gray-700">Description (Optional)</label>
                                    <textarea
                                        rows={3}
                                        value={edu.description}
                                        onChange={(e) => handleChange(index, 'description', e.target.value)}
                                        placeholder="Relevant coursework, honors, or extracurricular activities..."
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

export const SkillsForm = () => {
    const dispatch = useDispatch();
    const skillsList = useSelector((state) => state.resume.currentResume.skills);

    const handleChange = (e) => {
        // Simple comma separated approach for now
        const skillsArray = e.target.value.split(',').map(s => s.trim());
        dispatch(updateSkills(skillsArray));
    };

    return (
        <div className="space-y-6">
            <div className="border-b pb-2">
                <h2 className="text-xl font-semibold text-gray-800">Skills</h2>
                <p className="text-sm text-gray-500">Provide a comma-separated list of your skills.</p>
            </div>
            <div>
                <textarea
                    value={skillsList.join(', ')}
                    onChange={handleChange}
                    className="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 p-2 border"
                    rows="4"
                    placeholder="JavaScript, React, Node.js, Project Management..."
                ></textarea>
            </div>
        </div>
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
        <div className="space-y-6">
            <div className="flex justify-between items-center border-b pb-2">
                <h2 className="text-xl font-semibold text-gray-800">Projects</h2>
                <button
                    onClick={handleAdd}
                    className="inline-flex items-center px-3 py-1.5 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
                >
                    <Plus className="w-4 h-4 mr-1" />
                    Add Project
                </button>
            </div>

            {projectsList.length === 0 ? (
                <p className="text-sm text-gray-500 italic">No projects added yet. Click "Add Project" to begin.</p>
            ) : (
                <div className="space-y-6">
                    {projectsList.map((proj, index) => (
                        <div key={index} className="p-4 border border-gray-200 rounded-lg bg-gray-50">
                            <div className="flex justify-between items-center mb-4">
                                <h3 className="text-lg font-medium text-gray-700">Project {index + 1}</h3>
                                <button
                                    onClick={() => handleRemove(index)}
                                    className="text-red-500 hover:text-red-700 p-1"
                                >
                                    <Trash2 className="w-5 h-5" />
                                </button>
                            </div>

                            <div className="grid grid-cols-1 gap-4">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700">Project Title</label>
                                        <input
                                            type="text"
                                            value={proj.title}
                                            onChange={(e) => handleChange(index, 'title', e.target.value)}
                                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2 border"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700">Link / URL (Optional)</label>
                                        <input
                                            type="url"
                                            value={proj.link}
                                            onChange={(e) => handleChange(index, 'link', e.target.value)}
                                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2 border"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Description</label>
                                    <textarea
                                        rows={4}
                                        value={proj.description}
                                        onChange={(e) => handleChange(index, 'description', e.target.value)}
                                        placeholder="Describe the project, technologies used, and your contribution..."
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

import React from 'react';
import { useSelector } from 'react-redux';

export const CorporateTemplate = () => {
    const { currentResume } = useSelector((state) => state.resume);
    const { personalInfo, professionalSummary, experience, education, skills, projects } = currentResume;
    
    const themeSettings = currentResume.themeSettings || { primaryColor: '#1e293b', secondaryColor: '#e2e8f0' };
    const { primaryColor, secondaryColor } = themeSettings;

    return (
        <div className="bg-white p-0 w-full max-w-3xl mx-auto shadow-sm font-serif text-gray-800" style={{ minHeight: '1056px' }}>
            {/* Header Info */}
            <div className="p-8 pb-10" style={{ backgroundColor: primaryColor, color: '#ffffff' }}>
                <h1 className="text-4xl font-bold uppercase tracking-wider mb-2">{personalInfo.fullName || 'YOUR NAME'}</h1>
                <div className="flex flex-wrap gap-x-4 gap-y-1 text-sm font-medium" style={{ color: '#ffffff' }}>
                    {personalInfo.email && <span>{personalInfo.email}</span>}
                    {personalInfo.phone && <span>• {personalInfo.phone}</span>}
                    {personalInfo.location && <span>• {personalInfo.location}</span>}
                </div>
                <div className="flex flex-wrap gap-x-4 gap-y-1 mt-1 text-sm font-medium">
                    {personalInfo.linkedin && <a href={personalInfo.linkedin} className="opacity-90 hover:underline">LinkedIn</a>}
                    {personalInfo.github && <a href={personalInfo.github} className="opacity-90 hover:underline">GitHub</a>}
                </div>
            </div>

            <div className="p-8">
                {/* Summary */}
                {professionalSummary && (
                    <div className="mb-6">
                        <p className="text-gray-800 text-sm leading-relaxed">{professionalSummary}</p>
                    </div>
                )}

                {/* Experience */}
                {experience && experience.length > 0 && (
                    <div className="mb-6">
                        <h2 className="text-xl font-bold uppercase border-b-2 mb-4 pb-1" style={{ color: primaryColor, borderColor: secondaryColor }}>Professional Experience</h2>
                        <div className="space-y-5">
                            {experience.map((exp, index) => (
                                <div key={index}>
                                    <div className="flex justify-between items-baseline mb-1">
                                        <h3 className="font-bold text-gray-900">{exp.jobTitle}</h3>
                                        <span className="text-sm font-semibold text-gray-600">
                                            {exp.startDate ? new Date(exp.startDate).toLocaleDateString(undefined, { month: 'short', year: 'numeric' }) : ''}
                                            {' - '}
                                            {exp.current ? 'Present' : (exp.endDate ? new Date(exp.endDate).toLocaleDateString(undefined, { month: 'short', year: 'numeric' }) : '')}
                                        </span>
                                    </div>
                                    <div className="text-sm font-medium mb-2" style={{ color: primaryColor }}>{exp.employer}{exp.city ? `, ${exp.city}` : ''}</div>
                                    {exp.description && (
                                        <ul className="list-disc list-outside ml-5 text-sm text-gray-800 space-y-1">
                                            {exp.description.split('\n').map((point, i) => {
                                                const text = point.replace(/^•\s*/, '').trim();
                                                if (!text) return null;
                                                return <li key={i}>{text}</li>
                                            })}
                                        </ul>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* Education */}
                {education && education.length > 0 && (
                    <div className="mb-6">
                        <h2 className="text-xl font-bold uppercase border-b-2 mb-4 pb-1" style={{ color: primaryColor, borderColor: secondaryColor }}>Education</h2>
                        <div className="space-y-4">
                            {education.map((edu, index) => (
                                <div key={index}>
                                    <div className="flex justify-between items-baseline mb-1">
                                        <h3 className="font-bold text-gray-900">{edu.degree}</h3>
                                        <span className="text-sm font-semibold text-gray-600">
                                            {edu.startDate ? new Date(edu.startDate).toLocaleDateString(undefined, { month: 'short', year: 'numeric' }) : ''}
                                            {' - '}
                                            {edu.current ? 'Present' : (edu.endDate ? new Date(edu.endDate).toLocaleDateString(undefined, { month: 'short', year: 'numeric' }) : '')}
                                        </span>
                                    </div>
                                    <div className="text-sm font-medium mb-2" style={{ color: primaryColor }}>
                                        {edu.school}{edu.fieldOfStudy ? ` • ${edu.fieldOfStudy}` : ''}
                                    </div>
                                    {edu.description && (
                                        <p className="text-sm text-gray-800 ml-5">{edu.description}</p>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* Skills */}
                {skills && skills.length > 0 && (
                    <div className="mb-6">
                        <h2 className="text-xl font-bold uppercase border-b-2 mb-4 pb-1" style={{ color: primaryColor, borderColor: secondaryColor }}>Skills</h2>
                        <div className="flex flex-wrap gap-2">
                            {skills.map((skill, index) => (
                                <span key={index} className="px-3 py-1 font-semibold text-sm rounded-sm border" style={{ color: primaryColor, borderColor: secondaryColor, backgroundColor: primaryColor + '10' }}>
                                    {skill}
                                </span>
                            ))}
                        </div>
                    </div>
                )}

                {/* Projects */}
                {projects && projects.length > 0 && (
                    <div className="mb-6">
                        <h2 className="text-xl font-bold uppercase border-b-2 mb-4 pb-1" style={{ color: primaryColor, borderColor: secondaryColor }}>Notable Projects</h2>
                        <div className="space-y-4">
                            {projects.map((proj, index) => (
                                <div key={index}>
                                    <div className="flex justify-between items-baseline mb-1">
                                        <h3 className="font-bold text-gray-900">
                                            {proj.title}
                                            {proj.link && (
                                                <a href={proj.link} target="_blank" rel="noopener noreferrer" className="ml-2 hover:underline text-sm font-normal" style={{ color: primaryColor }}>
                                                    Link
                                                </a>
                                            )}
                                        </h3>
                                    </div>
                                    {proj.description && (
                                        <p className="text-sm text-gray-800 mt-1">{proj.description}</p>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

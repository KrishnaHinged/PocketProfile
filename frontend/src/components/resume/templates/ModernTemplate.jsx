import React from 'react';
import { useSelector } from 'react-redux';

export const ModernTemplate = () => {
    const { currentResume } = useSelector((state) => state.resume);
    const { personalInfo, professionalSummary, experience, education, skills, projects } = currentResume;
    
    const themeSettings = currentResume.themeSettings || { primaryColor: '#2563eb', secondaryColor: '#1e293b' };
    const { primaryColor, secondaryColor } = themeSettings;

    return (
        <div className="bg-white p-8 w-full max-w-3xl mx-auto shadow-sm text-gray-800 font-sans" style={{ minHeight: '1056px' }}>
            <div className="border-b-2 pb-4 mb-6" style={{ borderColor: secondaryColor }}>
                <h1 className="text-4xl font-bold uppercase tracking-wider" style={{ color: primaryColor }}>{personalInfo.fullName || 'YOUR NAME'}</h1>
                <div className="flex flex-wrap gap-x-4 gap-y-1 mt-2 text-sm font-medium" style={{ color: secondaryColor }}>
                    {personalInfo.email && <span>{personalInfo.email}</span>}
                    {personalInfo.phone && <span>• {personalInfo.phone}</span>}
                    {personalInfo.location && <span>• {personalInfo.location}</span>}
                </div>
                <div className="flex flex-wrap gap-x-4 gap-y-1 mt-1 text-sm font-medium">
                    {personalInfo.linkedin && <a href={personalInfo.linkedin} className="hover:underline" style={{ color: primaryColor }}>LinkedIn</a>}
                    {personalInfo.github && <a href={personalInfo.github} className="hover:underline" style={{ color: primaryColor }}>GitHub</a>}
                </div>
            </div>

            {professionalSummary && (
                <div className="mb-6">
                    <h2 className="text-lg font-bold uppercase tracking-wider mb-2" style={{ color: primaryColor }}>Professional Summary</h2>
                    <p className="text-gray-700 text-sm leading-relaxed">{professionalSummary}</p>
                </div>
            )}

            {experience && experience.length > 0 && (
                <div className="mb-6">
                    <h2 className="text-lg font-bold uppercase tracking-wider mb-3" style={{ color: primaryColor }}>Work Experience</h2>
                    <div className="space-y-4">
                        {experience.map((exp, index) => (
                            <div key={index}>
                                <div className="flex justify-between items-baseline mb-1">
                                    <h3 className="font-semibold text-gray-900">{exp.jobTitle}</h3>
                                    <span className="text-sm font-medium" style={{ color: primaryColor }}>
                                        {exp.startDate ? new Date(exp.startDate).toLocaleDateString(undefined, { month: 'short', year: 'numeric' }) : ''}
                                        {' - '}
                                        {exp.current ? 'Present' : (exp.endDate ? new Date(exp.endDate).toLocaleDateString(undefined, { month: 'short', year: 'numeric' }) : '')}
                                    </span>
                                </div>
                                <div className="text-sm font-medium mb-2" style={{ color: secondaryColor }}>{exp.employer}{exp.city ? `, ${exp.city}` : ''}</div>
                                {exp.description && (
                                    <ul className="list-disc list-inside text-sm text-gray-700 space-y-1">
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

            {education && education.length > 0 && (
                <div className="mb-6">
                    <h2 className="text-lg font-bold uppercase tracking-wider mb-3" style={{ color: primaryColor }}>Education</h2>
                    <div className="space-y-4">
                        {education.map((edu, index) => (
                            <div key={index}>
                                <div className="flex justify-between items-baseline mb-1">
                                    <h3 className="font-semibold text-gray-900">{edu.degree}</h3>
                                    <span className="text-sm font-medium" style={{ color: primaryColor }}>
                                        {edu.startDate ? new Date(edu.startDate).toLocaleDateString(undefined, { month: 'short', year: 'numeric' }) : ''}
                                        {' - '}
                                        {edu.current ? 'Present' : (edu.endDate ? new Date(edu.endDate).toLocaleDateString(undefined, { month: 'short', year: 'numeric' }) : '')}
                                    </span>
                                </div>
                                <div className="text-sm font-medium mb-2" style={{ color: secondaryColor }}>
                                    {edu.school}{edu.fieldOfStudy ? ` • ${edu.fieldOfStudy}` : ''}
                                </div>
                                {edu.description && (
                                    <p className="text-sm text-gray-700">{edu.description}</p>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {skills && skills.length > 0 && (
                <div className="mb-6">
                    <h2 className="text-lg font-bold uppercase tracking-wider mb-3" style={{ color: primaryColor }}>Skills</h2>
                    <div className="flex flex-wrap gap-2">
                        {skills.map((skill, index) => (
                            <span key={index} className="px-2 py-1 bg-gray-100 text-gray-800 text-sm font-semibold rounded box-border border-b-2" style={{ borderBottomColor: secondaryColor }}>
                                {skill}
                            </span>
                        ))}
                    </div>
                </div>
            )}

            {projects && projects.length > 0 && (
                <div className="mb-6">
                    <h2 className="text-lg font-bold uppercase tracking-wider mb-3" style={{ color: primaryColor }}>Projects</h2>
                    <div className="space-y-4">
                        {projects.map((proj, index) => (
                            <div key={index}>
                                <div className="flex justify-between items-baseline mb-1">
                                    <h3 className="font-semibold text-gray-900">
                                        {proj.title}
                                        {proj.link && (
                                            <a href={proj.link} target="_blank" rel="noopener noreferrer" className="ml-2 hover:underline text-sm font-normal" style={{ color: primaryColor }}>
                                                Link
                                            </a>
                                        )}
                                    </h3>
                                </div>
                                {proj.description && (
                                    <p className="text-sm text-gray-700 mt-1">{proj.description}</p>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

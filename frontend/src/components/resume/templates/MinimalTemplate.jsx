import React from 'react';
import { useSelector } from 'react-redux';

export const MinimalTemplate = () => {
    const { currentResume } = useSelector((state) => state.resume);
    const { personalInfo, professionalSummary, experience, education, skills, projects } = currentResume;
    
    const themeSettings = currentResume.themeSettings || { primaryColor: '#374151', secondaryColor: '#6B7280' };
    const { primaryColor, secondaryColor } = themeSettings;

    return (
        <div className="bg-white p-10 w-full max-w-3xl mx-auto shadow-sm tracking-wide font-sans text-gray-800" style={{ minHeight: '1056px' }}>
            <div className="text-center mb-10">
                <h1 className="text-3xl font-light tracking-widest" style={{ color: primaryColor }}>{personalInfo.fullName || 'Your Name'}</h1>
                <div className="flex justify-center flex-wrap gap-x-3 gap-y-1 mt-3 text-xs uppercase" style={{ color: secondaryColor }}>
                    {personalInfo.email && <span>{personalInfo.email}</span>}
                    {personalInfo.phone && <span>| {personalInfo.phone}</span>}
                    {personalInfo.location && <span>| {personalInfo.location}</span>}
                </div>
                <div className="flex justify-center flex-wrap gap-x-3 gap-y-1 mt-1 text-xs uppercase font-medium">
                    {personalInfo.linkedin && <a href={personalInfo.linkedin} className="hover:underline" style={{ color: primaryColor }}>LinkedIn</a>}
                    {personalInfo.github && <a href={personalInfo.github} className="hover:underline" style={{ color: primaryColor }}>| GitHub</a>}
                </div>
            </div>

            {professionalSummary && (
                <div className="mb-8">
                    <p className="text-sm leading-relaxed text-center italic" style={{ color: secondaryColor }}>"{professionalSummary}"</p>
                </div>
            )}

            {experience && experience.length > 0 && (
                <div className="mb-8">
                    <h2 className="text-sm font-semibold uppercase tracking-widest mb-4" style={{ color: primaryColor }}>Experience</h2>
                    <div className="space-y-6">
                        {experience.map((exp, index) => (
                            <div key={index}>
                                <div className="flex justify-between items-baseline mb-1">
                                    <h3 className="font-medium text-base text-gray-800">{exp.jobTitle}</h3>
                                    <span className="text-xs" style={{ color: secondaryColor }}>
                                        {exp.startDate ? new Date(exp.startDate).toLocaleDateString(undefined, { month: 'short', year: 'numeric' }) : ''}
                                        {' - '}
                                        {exp.current ? 'Present' : (exp.endDate ? new Date(exp.endDate).toLocaleDateString(undefined, { month: 'short', year: 'numeric' }) : '')}
                                    </span>
                                </div>
                                <div className="text-sm mb-2 italic" style={{ color: secondaryColor }}>{exp.employer}{exp.city ? `, ${exp.city}` : ''}</div>
                                {exp.description && (
                                    <ul className="list-disc list-outside ml-4 text-sm text-gray-600 space-y-1">
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
                <div className="mb-8">
                    <h2 className="text-sm font-semibold uppercase tracking-widest mb-4" style={{ color: primaryColor }}>Education</h2>
                    <div className="space-y-4">
                        {education.map((edu, index) => (
                            <div key={index}>
                                <div className="flex justify-between items-baseline mb-1">
                                    <h3 className="font-medium text-base text-gray-800">{edu.degree}</h3>
                                    <span className="text-xs" style={{ color: secondaryColor }}>
                                        {edu.startDate ? new Date(edu.startDate).toLocaleDateString(undefined, { month: 'short', year: 'numeric' }) : ''}
                                        {' - '}
                                        {edu.current ? 'Present' : (edu.endDate ? new Date(edu.endDate).toLocaleDateString(undefined, { month: 'short', year: 'numeric' }) : '')}
                                    </span>
                                </div>
                                <div className="text-sm mb-2 italic" style={{ color: secondaryColor }}>
                                    {edu.school}{edu.fieldOfStudy ? ` • ${edu.fieldOfStudy}` : ''}
                                </div>
                                {edu.description && (
                                    <p className="text-sm text-gray-600 ml-4">{edu.description}</p>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {skills && skills.length > 0 && (
                <div className="mb-8">
                    <h2 className="text-sm font-semibold uppercase tracking-widest mb-4" style={{ color: primaryColor }}>Skills</h2>
                    <div className="text-sm text-gray-600 leading-relaxed font-medium">
                        {skills.join(' • ')}
                    </div>
                </div>
            )}

            {projects && projects.length > 0 && (
                <div className="mb-8">
                    <h2 className="text-sm font-semibold uppercase tracking-widest mb-4" style={{ color: primaryColor }}>Projects</h2>
                    <div className="space-y-4">
                        {projects.map((proj, index) => (
                            <div key={index}>
                                <div className="flex justify-between items-baseline mb-1">
                                    <h3 className="font-medium text-gray-800 text-base">
                                        {proj.title}
                                        {proj.link && (
                                            <a href={proj.link} target="_blank" rel="noopener noreferrer" className="ml-2 hover:underline text-xs italic" style={{ color: primaryColor }}>
                                                Link
                                            </a>
                                        )}
                                    </h3>
                                </div>
                                {proj.description && (
                                    <p className="text-sm text-gray-600 mt-1">{proj.description}</p>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

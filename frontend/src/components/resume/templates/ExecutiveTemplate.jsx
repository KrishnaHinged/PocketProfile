import React from 'react';
import { useSelector } from 'react-redux';

export const ExecutiveTemplate = () => {
    const { currentResume } = useSelector((state) => state.resume);
    const { personalInfo, professionalSummary, experience, education, skills, projects } = currentResume;
    
    const themeSettings = currentResume.themeSettings || { primaryColor: '#2563eb', secondaryColor: '#1e293b' };
    const { primaryColor, secondaryColor } = themeSettings;

    const HeaderSection = ({ title }) => (
        <h2 className="text-lg font-bold uppercase mt-6 mb-4 flex items-center" style={{ color: primaryColor }}>
            <span className="w-8 h-px mr-4" style={{ backgroundColor: secondaryColor }}></span>
            {title}
        </h2>
    );

    return (
        <div className="bg-white p-12 w-full max-w-3xl mx-auto font-sans text-gray-800" style={{ minHeight: '1056px' }}>
            
            <div className="grid grid-cols-3 gap-6 mb-8 border-b-4 pb-6" style={{ borderColor: primaryColor }}>
                <div className="col-span-2">
                    <h1 className="text-5xl font-black uppercase tracking-tight mb-2" style={{ color: primaryColor }}>{personalInfo.fullName || 'YOUR NAME'}</h1>
                    <p className="text-sm font-semibold tracking-widest uppercase" style={{ color: secondaryColor }}>Executive Professional</p>
                </div>
                <div className="col-span-1 text-right text-sm flex flex-col justify-end space-y-1">
                    {personalInfo.phone && <div className="font-medium text-gray-600">{personalInfo.phone}</div>}
                    {personalInfo.email && <div className="font-medium text-gray-600">{personalInfo.email}</div>}
                    {personalInfo.location && <div className="font-medium text-gray-600">{personalInfo.location}</div>}
                    {personalInfo.linkedin && <div style={{ color: primaryColor }}><a href={personalInfo.linkedin} className="hover:underline">LinkedIn</a></div>}
                </div>
            </div>

            {professionalSummary && (
                <div>
                    <h2 className="text-xl font-bold mb-3" style={{ color: secondaryColor }}>Executive Summary</h2>
                    <p className="text-sm leading-relaxed text-gray-700 font-medium">{professionalSummary}</p>
                </div>
            )}

            {experience && experience.length > 0 && (
                <div>
                    <HeaderSection title="Professional Experience" />
                    <div className="space-y-6">
                        {experience.map((exp, index) => (
                            <div key={index} className="relative pl-6 border-l-2" style={{ borderColor: primaryColor }}>
                                <div className="absolute w-3 h-3 rounded-full -left-[7px] top-1.5" style={{ backgroundColor: primaryColor }}></div>
                                <div className="flex justify-between items-baseline mb-1">
                                    <h3 className="text-lg font-bold text-gray-900">{exp.jobTitle}</h3>
                                </div>
                                <div className="flex justify-between items-baseline mb-2">
                                    <span className="text-sm font-bold uppercase tracking-wider" style={{ color: secondaryColor }}>
                                        {exp.employer}{exp.city ? `, ${exp.city}` : ''}
                                    </span>
                                    <span className="text-sm font-semibold text-gray-500">
                                        {exp.startDate ? new Date(exp.startDate).toLocaleDateString(undefined, { month: 'short', year: 'numeric' }) : ''}
                                        {' - '}
                                        {exp.current ? 'Present' : (exp.endDate ? new Date(exp.endDate).toLocaleDateString(undefined, { month: 'short', year: 'numeric' }) : '')}
                                    </span>
                                </div>
                                {exp.description && (
                                    <ul className="list-disc list-outside ml-4 text-sm text-gray-700 space-y-1 mt-2">
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

            <div className="grid grid-cols-2 gap-8 mt-6">
                <div>
                    {education && education.length > 0 && (
                        <div>
                            <HeaderSection title="Education" />
                            <div className="space-y-4">
                                {education.map((edu, index) => (
                                    <div key={index}>
                                        <h3 className="font-bold text-gray-900">{edu.degree}</h3>
                                        <div className="text-sm font-medium" style={{ color: secondaryColor }}>
                                            {edu.school}{edu.fieldOfStudy ? ` • ${edu.fieldOfStudy}` : ''}
                                        </div>
                                        <div className="text-xs text-gray-500 mt-1">
                                            {edu.startDate ? new Date(edu.startDate).getFullYear() : ''}
                                            {' - '}
                                            {edu.current ? 'Present' : (edu.endDate ? new Date(edu.endDate).getFullYear() : '')}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>

                <div>
                    {skills && skills.length > 0 && (
                        <div>
                            <HeaderSection title="Core Competencies" />
                            <div className="flex flex-wrap gap-2">
                                {skills.map((skill, index) => (
                                    <span key={index} className="px-2 py-1 bg-gray-100 text-xs font-bold text-gray-700 rounded border" style={{ borderColor: secondaryColor + '40' }}>
                                        {skill}
                                    </span>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {projects && projects.length > 0 && (
                <div>
                    <HeaderSection title="Noteworthy Projects" />
                    <div className="space-y-4">
                        {projects.map((proj, index) => (
                            <div key={index}>
                                <div className="flex justify-between items-baseline mb-1">
                                    <h3 className="font-bold text-gray-900">{proj.title}</h3>
                                </div>
                                {proj.description && (
                                    <p className="text-sm text-gray-700">{proj.description}</p>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

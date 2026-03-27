import React from 'react';
import { useSelector } from 'react-redux';

export const HarvardTemplate = () => {
    const { currentResume } = useSelector((state) => state.resume);
    const { personalInfo, professionalSummary, experience, education, skills, projects } = currentResume;
    
    // Harvard template deliberately mutes colors to preserve strict classic formatting
    // but we use primaryColor sparsely for the top name if safe mode isn't forcing it to black
    const themeSettings = currentResume.themeSettings || { primaryColor: '#000000', secondaryColor: '#333333' };
    const { primaryColor } = themeSettings;

    const SectionHeader = ({ title }) => (
        <h2 className="text-[13px] font-bold uppercase tracking-widest text-center mt-6 mb-2 text-black">
            {title}
        </h2>
    );

    return (
        <div className="bg-white p-[1in] w-full max-w-3xl mx-auto font-serif text-[11pt] leading-[1.15] text-black" style={{ minHeight: '11in' }}>
            
            <div className="text-center mb-4 pb-2 border-b border-black border-dotted">
                <h1 className="text-[24pt] font-semibold tracking-wide mb-1" style={{ color: primaryColor }}>{personalInfo.fullName || 'First Last'}</h1>
                <div className="flex justify-center flex-wrap gap-2 text-[10pt]">
                    {personalInfo.location && <span>{personalInfo.location}</span>}
                    {personalInfo.phone && <span>• {personalInfo.phone}</span>}
                    {personalInfo.email && <span>• {personalInfo.email}</span>}
                    {personalInfo.linkedin && <span>• {personalInfo.linkedin}</span>}
                </div>
            </div>

            {professionalSummary && (
                <div className="mb-4 text-justify">
                    <p>{professionalSummary}</p>
                </div>
            )}

            {education && education.length > 0 && (
                <div>
                    <SectionHeader title="Education" />
                    <div className="space-y-3">
                        {education.map((edu, index) => (
                            <div key={index}>
                                <div className="flex justify-between items-baseline">
                                    <strong className="text-[12pt]">{edu.school}</strong>
                                    <span>
                                        {edu.startDate ? new Date(edu.startDate).toLocaleDateString(undefined, { month: 'long', year: 'numeric' }) : ''}
                                        {' - '}
                                        {edu.current ? 'Present' : (edu.endDate ? new Date(edu.endDate).toLocaleDateString(undefined, { month: 'long', year: 'numeric' }) : '')}
                                    </span>
                                </div>
                                <div className="flex justify-between items-baseline mt-0.5">
                                    <span className="italic">{edu.degree}{edu.fieldOfStudy ? ` in ${edu.fieldOfStudy}` : ''}</span>
                                    {edu.city && <span>{edu.city}</span>}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {experience && experience.length > 0 && (
                <div>
                    <SectionHeader title="Experience" />
                    <div className="space-y-4">
                        {experience.map((exp, index) => (
                            <div key={index}>
                                <div className="flex justify-between items-baseline">
                                    <strong className="text-[12pt]">{exp.employer}</strong>
                                    <span>
                                        {exp.startDate ? new Date(exp.startDate).toLocaleDateString(undefined, { month: 'long', year: 'numeric' }) : ''}
                                        {' - '}
                                        {exp.current ? 'Present' : (exp.endDate ? new Date(exp.endDate).toLocaleDateString(undefined, { month: 'long', year: 'numeric' }) : '')}
                                    </span>
                                </div>
                                <div className="flex justify-between items-baseline mt-0.5 mb-1.5">
                                    <span className="italic">{exp.jobTitle}</span>
                                    {exp.city && <span>{exp.city}</span>}
                                </div>
                                {exp.description && (
                                    <ul className="list-disc list-outside ml-[0.3in] space-y-[0.05in]">
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

            {projects && projects.length > 0 && (
                <div>
                    <SectionHeader title="Projects" />
                    <div className="space-y-3">
                        {projects.map((proj, index) => (
                            <div key={index} className="text-justify">
                                <strong>{proj.title}</strong>
                                {proj.description && (
                                    <span>{' – '}{proj.description}</span>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {skills && skills.length > 0 && (
                <div>
                    <SectionHeader title="Skills & Interests" />
                    <div>
                        <strong>Technical: </strong>
                        <span>{skills.join(', ')}</span>
                    </div>
                </div>
            )}
        </div>
    );
};

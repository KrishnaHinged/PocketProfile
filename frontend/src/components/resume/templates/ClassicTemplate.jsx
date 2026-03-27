import React from 'react';
import { useSelector } from 'react-redux';

export const ClassicTemplate = () => {
    const { currentResume } = useSelector((state) => state.resume);
    const { personalInfo, professionalSummary, experience, education, skills, projects } = currentResume;
    
    const themeSettings = currentResume.themeSettings || { primaryColor: '#2563eb', secondaryColor: '#1e293b' };
    const { primaryColor, secondaryColor } = themeSettings;

    const HeaderSection = ({ title }) => (
        <h2 className="text-xl font-bold uppercase mt-6 mb-3 pb-1 border-b-[1.5px]" style={{ color: primaryColor, borderColor: secondaryColor }}>
            {title}
        </h2>
    );

    return (
        <div className="bg-white p-10 w-full max-w-3xl mx-auto font-sans leading-relaxed text-gray-800" style={{ minHeight: '1056px' }}>
            
            <div className="text-center mb-6">
                <h1 className="text-4xl font-extrabold tracking-tight mb-2" style={{ color: primaryColor }}>{personalInfo.fullName || 'YOUR NAME'}</h1>
                <div className="flex flex-wrap justify-center gap-2 text-sm" style={{ color: secondaryColor }}>
                    {personalInfo.email && <span>{personalInfo.email}</span>}
                    {personalInfo.phone && <span>• {personalInfo.phone}</span>}
                    {personalInfo.location && <span>• {personalInfo.location}</span>}
                </div>
                <div className="flex flex-wrap justify-center gap-2 text-sm mt-1" style={{ color: secondaryColor }}>
                    {personalInfo.linkedin && <a href={personalInfo.linkedin} className="hover:underline">LinkedIn</a>}
                    {personalInfo.github && <a href={personalInfo.github} className="hover:underline">• GitHub</a>}
                </div>
            </div>

            {professionalSummary && (
                <div>
                    <HeaderSection title="Professional Summary" />
                    <p className="text-sm">{professionalSummary}</p>
                </div>
            )}

            {experience && experience.length > 0 && (
                <div>
                    <HeaderSection title="Experience" />
                    <div className="space-y-4">
                        {experience.map((exp, index) => (
                            <div key={index}>
                                <div className="flex justify-between items-baseline">
                                    <h3 className="font-bold text-gray-900">{exp.jobTitle}</h3>
                                    <span className="text-sm font-semibold" style={{ color: primaryColor }}>
                                        {exp.startDate ? new Date(exp.startDate).toLocaleDateString(undefined, { month: 'short', year: 'numeric' }) : ''}
                                        {' - '}
                                        {exp.current ? 'Present' : (exp.endDate ? new Date(exp.endDate).toLocaleDateString(undefined, { month: 'short', year: 'numeric' }) : '')}
                                    </span>
                                </div>
                                <div className="text-sm font-medium italic mb-1" style={{ color: secondaryColor }}>
                                    {exp.employer}{exp.city ? `, ${exp.city}` : ''}
                                </div>
                                {exp.description && (
                                    <ul className="list-disc list-outside ml-5 text-sm space-y-1">
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
                <div>
                    <HeaderSection title="Education" />
                    <div className="space-y-3">
                        {education.map((edu, index) => (
                            <div key={index}>
                                <div className="flex justify-between items-baseline">
                                    <h3 className="font-bold text-gray-900">{edu.degree}</h3>
                                    <span className="text-sm font-semibold" style={{ color: primaryColor }}>
                                        {edu.startDate ? new Date(edu.startDate).toLocaleDateString(undefined, { month: 'short', year: 'numeric' }) : ''}
                                        {' - '}
                                        {edu.current ? 'Present' : (edu.endDate ? new Date(edu.endDate).toLocaleDateString(undefined, { month: 'short', year: 'numeric' }) : '')}
                                    </span>
                                </div>
                                <div className="text-sm font-medium mb-1" style={{ color: secondaryColor }}>
                                    {edu.school}{edu.fieldOfStudy ? ` • ${edu.fieldOfStudy}` : ''}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {skills && skills.length > 0 && (
                <div>
                    <HeaderSection title="Skills" />
                    <p className="text-sm leading-relaxed font-medium text-gray-800">
                        {skills.join(' • ')}
                    </p>
                </div>
            )}

            {projects && projects.length > 0 && (
                <div>
                    <HeaderSection title="Projects" />
                    <div className="space-y-3">
                        {projects.map((proj, index) => (
                            <div key={index}>
                                <div className="flex justify-between items-baseline mb-1">
                                    <h3 className="font-bold text-gray-900">{proj.title}</h3>
                                </div>
                                {proj.description && (
                                    <p className="text-sm">{proj.description}</p>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

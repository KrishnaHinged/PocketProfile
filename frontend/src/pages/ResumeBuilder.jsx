import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { PenLine, Eye } from 'lucide-react';
import { PersonalInfoForm, SummaryForm } from '../components/resume/PersonalAndSummary';
import { ExperienceForm } from '../components/resume/ExperienceForm';
import { EducationForm, SkillsForm, ProjectsForm } from '../components/resume/OtherForms';
import { CustomizationPanel } from '../components/resume/CustomizationPanel';
import { LivePreview } from '../components/resume/LivePreview';
import { AtsAnalysisModal } from '../components/resume/AtsAnalysisModal';
import { saveResume, fetchResumeById, updateTitle, fetchAtsScore } from '../redux/slices/resumeSlice';

const ResumeBuilder = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [activeTab, setActiveTab] = useState('Personal');
    const [mobileView, setMobileView] = useState('form'); // 'form' | 'preview'
    const [isSaveModalOpen, setIsSaveModalOpen] = useState(false);
    const [isAtsModalOpen, setIsAtsModalOpen] = useState(false);
    const [resumeTitleInput, setResumeTitleInput] = useState('');
    const { currentResume, status, isAtsLoading } = useSelector((state) => state.resume);

    useEffect(() => {
        if (id) {
            dispatch(fetchResumeById(id));
        }
    }, [id, dispatch]);

    const performSave = (titleToSave) => {
        const sanitizeDates = (arr) => arr.map(item => {
            const sanitized = { ...item };
            if (sanitized.startDate === '') delete sanitized.startDate;
            if (sanitized.endDate === '') delete sanitized.endDate;
            return sanitized;
        });

        const resumeToSave = {
            ...currentResume,
            title: titleToSave,
            experience: sanitizeDates(currentResume.experience.filter(exp => exp.jobTitle && exp.jobTitle.trim() !== '' && exp.employer && exp.employer.trim() !== '')),
            education: sanitizeDates(currentResume.education.filter(edu => edu.school && edu.school.trim() !== '' && edu.degree && edu.degree.trim() !== '')),
            projects: sanitizeDates(currentResume.projects.filter(proj => proj.title && proj.title.trim() !== '')),
        };

        dispatch(saveResume(resumeToSave)).then((res) => {
            if (res.meta.requestStatus === 'fulfilled' && !id) {
                navigate(`/builder/${res.payload._id}`, { replace: true });
            }
        });
    };

    const handleSave = () => {
        if (currentResume.title === 'Untitled Resume') {
            setResumeTitleInput('My Professional Resume');
            setIsSaveModalOpen(true);
            return;
        }
        performSave(currentResume.title);
    };

    const handleModalSave = () => {
        const titleToSave = resumeTitleInput.trim() || 'My Professional Resume';
        dispatch(updateTitle(titleToSave));
        setIsSaveModalOpen(false);
        performSave(titleToSave);
    };

    const handleAtsAnalysis = () => {
        setIsAtsModalOpen(true);
        dispatch(fetchAtsScore({ resumeData: currentResume, jobDescription: '' }));
    };

    const tabs = ['Personal', 'Experience', 'Education', 'Skills', 'Projects', 'Design'];

    /* --- Form content (shared between desktop & mobile) --- */
    const FormContent = (
        <>
            <div className="border-b border-app bg-[#f7f8f5] p-3 md:p-4">
                <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
                    <div className="flex overflow-x-auto gap-1.5 pb-1 scrollbar-hide">
                        {tabs.map((tab) => (
                            <button
                                key={tab}
                                onClick={() => setActiveTab(tab)}
                                className={`tab-chip whitespace-nowrap ${activeTab === tab ? 'tab-chip-active' : ''}`}
                            >
                                {tab}
                            </button>
                        ))}
                    </div>
                    <div className="flex gap-2">
                        <button
                            onClick={handleAtsAnalysis}
                            disabled={isAtsLoading || status === 'loading'}
                            className="btn-secondary disabled:opacity-50 text-xs md:text-sm"
                        >
                            {isAtsLoading ? 'Analyzing...' : 'ATS Check'}
                        </button>
                        <button
                            onClick={handleSave}
                            disabled={status === 'loading'}
                            className="btn-primary disabled:opacity-50 text-xs md:text-sm"
                        >
                            {status === 'loading' ? 'Saving...' : 'Save'}
                        </button>
                    </div>
                </div>
            </div>

            <div className="flex-1 overflow-y-auto p-4 md:p-7 bg-white">
                {activeTab === 'Personal' && (
                    <div>
                        <PersonalInfoForm />
                        <SummaryForm />
                    </div>
                )}
                {activeTab === 'Experience' && <ExperienceForm />}
                {activeTab === 'Education' && <EducationForm />}
                {activeTab === 'Skills' && <SkillsForm />}
                {activeTab === 'Projects' && <ProjectsForm />}
                {activeTab === 'Design' && <CustomizationPanel />}
            </div>
        </>
    );

    return (
        <div className="flex flex-col gap-4 md:gap-6">
            {/* Hero — hidden on mobile for compact builder */}
            <section className="hero-panel hidden md:block">
                <p className="hero-kicker">Resume Builder</p>
                <h1 className="hero-title mt-2">Build Your Resume. Smarter.</h1>
                <p className="hero-subtitle">
                    A high-speed workspace designed for serious creators. Structure your experience in clear feature blocks and ship polished resumes with confidence.
                </p>
            </section>

            {/* ========== MOBILE LAYOUT (< md) ========== */}
            <div className="md:hidden flex flex-col h-[calc(100vh-5rem)]">
                {/* Mobile toggle bar */}
                <div className="flex bg-[#f2f3f0] rounded-xl border border-app p-1 mb-3">
                    <button
                        onClick={() => setMobileView('form')}
                        className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-lg text-sm font-bold transition duration-200 ${
                            mobileView === 'form'
                                ? 'bg-[#e63946] text-white shadow-sm'
                                : 'text-[#5d6474]'
                        }`}
                    >
                        <PenLine className="w-4 h-4" />
                        Edit
                    </button>
                    <button
                        onClick={() => setMobileView('preview')}
                        className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-lg text-sm font-bold transition duration-200 ${
                            mobileView === 'preview'
                                ? 'bg-[#e63946] text-white shadow-sm'
                                : 'text-[#5d6474]'
                        }`}
                    >
                        <Eye className="w-4 h-4" />
                        Preview
                    </button>
                </div>

                {/* Mobile: Form View */}
                {mobileView === 'form' && (
                    <section className="flex-1 flex flex-col feature-card overflow-hidden p-0">
                        {FormContent}
                    </section>
                )}

                {/* Mobile: Preview View */}
                {mobileView === 'preview' && (
                    <section className="flex-1 feature-card overflow-hidden flex flex-col p-0">
                        <LivePreview />
                    </section>
                )}
            </div>

            {/* ========== DESKTOP LAYOUT (>= md) ========== */}
            <div className="hidden md:flex flex-row gap-6 h-[calc(100vh-14rem)]">
                <section className="w-1/2 flex flex-col feature-card overflow-hidden p-0">
                    {FormContent}
                </section>

                <section className="w-1/2 feature-card overflow-hidden flex flex-col p-0">
                    <LivePreview />
                </section>
            </div>

            {/* Save Modal */}
            {isSaveModalOpen && (
                <div className="fixed inset-0 z-50 overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
                    <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                        <div className="fixed inset-0 bg-[#0f1117]/55 transition-opacity" aria-hidden="true" onClick={() => setIsSaveModalOpen(false)}></div>
                        <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
                        <div className="inline-block align-bottom modal-card text-left overflow-hidden transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
                            <div className="px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                                <div className="sm:flex sm:items-start">
                                    <div className="mt-3 text-center sm:mt-0 sm:text-left w-full">
                                        <h3 className="text-2xl font-extrabold" id="modal-title">Name This Resume</h3>
                                        <p className="text-sm text-app-muted mt-2 mb-4">Give this version a clear, professional title.</p>
                                        <input
                                            type="text"
                                            value={resumeTitleInput}
                                            onChange={(e) => setResumeTitleInput(e.target.value)}
                                            onKeyDown={(e) => { if (e.key === 'Enter') handleModalSave(); }}
                                            placeholder="e.g., Senior Product Designer"
                                            autoFocus
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="bg-[#f7f8f5] px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse gap-2">
                                <button type="button" onClick={handleModalSave} className="btn-primary w-full sm:w-auto">Save</button>
                                <button type="button" onClick={() => setIsSaveModalOpen(false)} className="btn-secondary mt-2 sm:mt-0 w-full sm:w-auto">Cancel</button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            <AtsAnalysisModal isOpen={isAtsModalOpen} onClose={() => setIsAtsModalOpen(false)} />
        </div>
    );
};

export default ResumeBuilder;

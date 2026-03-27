import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
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
        // Sanitize data before saving to prevent Mongoose validation errors on empty rows and dates
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
                // Redirect to edit URL if this was a new creation
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

    return (
        <div className="flex flex-col md:flex-row gap-6 h-[calc(100vh-8rem)]">
            {/* Form Section */}
            <div className="w-full md:w-1/2 flex flex-col bg-white rounded-lg shadow border border-gray-200 overflow-hidden">

                {/* Form Tabs and Save Button */}
                <div className="flex justify-between items-center border-b">
                    <div className="flex overflow-x-auto">
                        {tabs.map((tab) => (
                            <button
                                key={tab}
                                onClick={() => setActiveTab(tab)}
                                className={`px-4 py-3 text-sm font-medium whitespace-nowrap ${activeTab === tab
                                    ? 'border-b-2 border-indigo-500 text-indigo-600'
                                    : 'text-gray-500 hover:text-gray-700'
                                    }`}
                            >
                                {tab}
                            </button>
                        ))}
                    </div>
                    <div className="pr-4 flex space-x-2">
                        <button
                            onClick={handleAtsAnalysis}
                            disabled={isAtsLoading || status === 'loading'}
                            className="inline-flex items-center px-4 py-2 border border-blue-600 text-sm font-medium rounded-md shadow-sm text-blue-600 bg-white hover:bg-blue-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
                        >
                            {isAtsLoading ? 'Analyzing...' : 'ATS Check'}
                        </button>
                        <button
                            onClick={handleSave}
                            disabled={status === 'loading'}
                            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
                        >
                            {status === 'loading' ? 'Saving...' : 'Save Resume'}
                        </button>
                    </div>
                </div>

                {/* Form Content */}
                <div className="flex-1 overflow-y-auto p-6">
                    {activeTab === 'Personal' && (
                        <div>
                            <PersonalInfoForm />
                            <SummaryForm />
                        </div>
                    )}
                    {activeTab === 'Experience' && (
                        <div>
                            <ExperienceForm />
                        </div>
                    )}
                    {activeTab === 'Education' && (
                        <div>
                            <EducationForm />
                        </div>
                    )}
                    {activeTab === 'Skills' && (
                        <div>
                            <SkillsForm />
                        </div>
                    )}
                    {activeTab === 'Projects' && (
                        <div>
                            <ProjectsForm />
                        </div>
                    )}
                    {activeTab === 'Design' && (
                        <div>
                            <CustomizationPanel />
                        </div>
                    )}
                </div>
            </div>

            {/* Live Preview Section */}
            <div className="w-full md:w-1/2 rounded-lg shadow border border-gray-200 overflow-hidden flex flex-col">
                <LivePreview />
            </div>

            {/* Save Resume Modal */}
            {isSaveModalOpen && (
                <div className="fixed inset-0 z-50 overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
                    <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                        {/* Background overlay */}
                        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" aria-hidden="true" onClick={() => setIsSaveModalOpen(false)}></div>

                        {/* This element is to trick the browser into centering the modal contents. */}
                        <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>

                        <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
                            <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                                <div className="sm:flex sm:items-start">
                                    <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full">
                                        <h3 className="text-lg leading-6 font-medium text-gray-900" id="modal-title">
                                            Name Your Resume
                                        </h3>
                                        <div className="mt-2">
                                            <p className="text-sm text-gray-500 mb-4">
                                                Please provide a professional name for this resume before saving.
                                            </p>
                                            <input
                                                type="text"
                                                value={resumeTitleInput}
                                                onChange={(e) => setResumeTitleInput(e.target.value)}
                                                onKeyDown={(e) => {
                                                    if (e.key === 'Enter') {
                                                        handleModalSave();
                                                    }
                                                }}
                                                className="w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                                placeholder="e.g., Software Engineer Resume"
                                                autoFocus
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                                <button
                                    type="button"
                                    onClick={handleModalSave}
                                    className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-indigo-600 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:ml-3 sm:w-auto sm:text-sm"
                                >
                                    Save
                                </button>
                                <button
                                    type="button"
                                    onClick={() => setIsSaveModalOpen(false)}
                                    className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                                >
                                    Cancel
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* ATS Analysis Modal */}
            <AtsAnalysisModal isOpen={isAtsModalOpen} onClose={() => setIsAtsModalOpen(false)} />
        </div>
    );
};

export default ResumeBuilder;

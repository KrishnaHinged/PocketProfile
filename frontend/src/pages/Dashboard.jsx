import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { FilePlus, FileText, Trash2, Edit } from 'lucide-react';
import { fetchAllResumes, deleteResume, resetResumeData } from '../redux/slices/resumeSlice';

const Dashboard = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { allResumes, status } = useSelector((state) => state.resume);

    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [deleteConfirmId, setDeleteConfirmId] = useState(null);

    useEffect(() => {
        dispatch(fetchAllResumes());
    }, [dispatch]);

    const handleCreateNew = () => {
        dispatch(resetResumeData());
        navigate('/builder');
    };

    const handleDelete = (id) => {
        setDeleteConfirmId(id);
        setIsDeleteModalOpen(true);
    };

    const confirmDelete = () => {
        if (deleteConfirmId) {
            dispatch(deleteResume(deleteConfirmId));
            setIsDeleteModalOpen(false);
            setDeleteConfirmId(null);
        }
    };

    const cancelDelete = () => {
        setIsDeleteModalOpen(false);
        setDeleteConfirmId(null);
    };

    return (
        <div className="space-y-6">
            <section className="hero-panel">
                <p className="hero-kicker">Workspace</p>
                <h1 className="hero-title mt-2">Your Resume Command Center</h1>
                <p className="hero-subtitle">Track versions, iterate fast, and ship applications with a clear, high-performance workflow.</p>
            </section>

            <div className="flex justify-end">
                <button onClick={handleCreateNew} className="btn-primary">
                    <FilePlus className="w-5 h-5 mr-2" />
                    Create New Resume
                </button>
            </div>

            {status === 'loading' ? (
                <div className="text-center text-app-muted py-10">Loading resumes...</div>
            ) : allResumes.length === 0 ? (
                <div className="feature-card text-center py-14 px-6">
                    <FileText className="mx-auto h-10 w-10 text-[#e63946]" />
                    <h3 className="mt-3 text-xl font-extrabold">No resumes yet</h3>
                    <p className="mt-2 text-sm text-app-muted">Start your first draft and build momentum.</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {allResumes.map((resume) => (
                        <article key={resume._id} className="feature-card flex flex-col transition duration-200 hover:border-[#e63946]">
                            <div className="p-1 flex-1">
                                <div className="flex items-center">
                                    <div className="flex-shrink-0 rounded-lg bg-[#ffe9ec] p-2.5">
                                        <FileText className="h-5 w-5 text-[#e63946]" />
                                    </div>
                                    <div className="ml-4 w-0 flex-1">
                                        <p className="text-xs uppercase tracking-[0.12em] text-app-muted truncate">Updated {new Date(resume.updatedAt).toLocaleDateString()}</p>
                                        <p className="text-lg font-bold text-app truncate">{resume.title || resume.personalInfo?.fullName || 'Untitled Resume'}</p>
                                    </div>
                                </div>
                            </div>
                            <div className="bg-[#f7f8f5] px-4 py-3 flex justify-between mt-4 rounded-lg border border-app">
                                <Link to={`/builder/${resume._id}`} className="text-[#e63946] hover:text-[#c92233] flex items-center text-sm font-semibold">
                                    <Edit className="w-4 h-4 mr-1" /> Edit
                                </Link>
                                <button onClick={() => handleDelete(resume._id)} className="text-[#e63946] hover:text-[#c92233]" title="Delete Resume">
                                    <Trash2 className="w-4 h-4" />
                                </button>
                            </div>
                        </article>
                    ))}
                </div>
            )}

            {isDeleteModalOpen && (
                <div className="fixed inset-0 z-50 overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
                    <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                        <div className="fixed inset-0 bg-[#0f1117]/55 transition-opacity" aria-hidden="true" onClick={cancelDelete}></div>
                        <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>

                        <div className="inline-block align-bottom modal-card text-left overflow-hidden transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
                            <div className="px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                                <h3 className="text-2xl font-extrabold" id="modal-title">Delete Resume</h3>
                                <p className="text-sm text-app-muted mt-2">This action cannot be undone.</p>
                            </div>
                            <div className="bg-[#f7f8f5] px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse gap-2">
                                <button type="button" onClick={confirmDelete} className="btn-primary w-full sm:w-auto">Delete</button>
                                <button type="button" onClick={cancelDelete} className="btn-secondary mt-2 sm:mt-0 w-full sm:w-auto">Cancel</button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Dashboard;

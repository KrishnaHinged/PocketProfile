import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { FilePlus, FileText, Copy, Trash2, Edit } from 'lucide-react';
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
            <div className="flex justify-between items-center">
                <h1 className="text-2xl font-bold text-gray-900">Your Resumes</h1>
                <button
                    onClick={handleCreateNew}
                    className="inline-flex items-center px-4 py-2 bg-indigo-600 border border-transparent rounded-md font-medium text-white hover:bg-indigo-700 cursor-pointer"
                >
                    <FilePlus className="w-5 h-5 mr-2" />
                    Create New Resume
                </button>
            </div>

            {status === 'loading' ? (
                <div className="text-center text-gray-500 py-10">Loading resumes...</div>
            ) : allResumes.length === 0 ? (
                <div className="text-center py-12 bg-white rounded-lg border border-gray-200 shadow-sm">
                    <FileText className="mx-auto h-12 w-12 text-gray-400" />
                    <h3 className="mt-2 text-sm font-medium text-gray-900">No resumes</h3>
                    <p className="mt-1 text-sm text-gray-500">Get started by creating a new resume.</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {allResumes.map((resume) => (
                        <div key={resume._id} className="bg-white overflow-hidden shadow rounded-lg border border-gray-200 flex flex-col">
                            <div className="p-5 flex-1">
                                <div className="flex items-center">
                                    <div className="flex-shrink-0">
                                        <FileText className="h-10 w-10 text-indigo-500" />
                                    </div>
                                    <div className="ml-5 w-0 flex-1">
                                        <dl>
                                            <dt className="text-sm font-medium text-gray-500 truncate">
                                                Last updated: {new Date(resume.updatedAt).toLocaleDateString()}
                                            </dt>
                                            <dd className="text-lg font-medium text-gray-900 truncate">
                                                {resume.title || resume.personalInfo?.fullName || 'Untitled Resume'}
                                            </dd>
                                        </dl>
                                    </div>
                                </div>
                            </div>
                            <div className="bg-gray-50 px-5 py-3 flex justify-between mt-auto">
                                <Link to={`/builder/${resume._id}`} className="text-indigo-600 hover:text-indigo-900 flex items-center">
                                    <Edit className="w-4 h-4 mr-1" /> Edit
                                </Link>
                                <div className="flex space-x-3">
                                    <button
                                        onClick={() => handleDelete(resume._id)}
                                        className="text-red-500 hover:text-red-700"
                                        title="Delete Resume"
                                    >
                                        <Trash2 className="w-4 h-4" />
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {/* Delete Confirmation Modal */}
            {isDeleteModalOpen && (
                <div className="fixed inset-0 z-50 overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
                    <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                        {/* Background overlay */}
                        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" aria-hidden="true" onClick={cancelDelete}></div>

                        {/* This element is to trick the browser into centering the modal contents. */}
                        <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>

                        <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
                            <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                                <div className="sm:flex sm:items-start">
                                    <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                                        <Trash2 className="h-6 w-6 text-red-600" aria-hidden="true" />
                                    </div>
                                    <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                                        <h3 className="text-lg leading-6 font-medium text-gray-900" id="modal-title">
                                            Delete Resume
                                        </h3>
                                        <div className="mt-2">
                                            <p className="text-sm text-gray-500">
                                                Are you sure you want to delete this resume? This action cannot be undone.
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                                <button
                                    type="button"
                                    onClick={confirmDelete}
                                    className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm"
                                >
                                    Delete
                                </button>
                                <button
                                    type="button"
                                    onClick={cancelDelete}
                                    className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                                >
                                    Cancel
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Dashboard;

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { createResumeService, getResumesService, updateResumeService, getResumeService, generateEnhancementService, deleteResumeService, analyzeResumeAtsService } from '../../services/apiService';

const initialState = {
    currentResume: {
        title: 'Untitled Resume',
        personalInfo: {
            fullName: '',
            email: '',
            phone: '',
            location: '',
            linkedin: '',
            github: '',
            website: '',
        },
        professionalSummary: '',
        experience: [],
        education: [],
        skills: [],
        projects: [],
        certifications: [],
        languages: [],
        templateType: 'Modern',
        themeSettings: {
            primaryColor: '#374151',
            secondaryColor: '#6B7280',
            isAtsSafeMode: true
        }
    },
    atsData: null,
    isAtsLoading: false,
    status: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
    message: '',
    allResumes: [],
};

// Async Thunks
export const saveResume = createAsyncThunk('resume/save', async (resumeData, thunkAPI) => {
    try {
        if (resumeData._id) {
            return await updateResumeService(resumeData._id, resumeData);
        } else {
            return await createResumeService(resumeData);
        }
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.error) || error.message || error.toString();
        return thunkAPI.rejectWithValue(message);
    }
});

export const fetchAllResumes = createAsyncThunk('resume/fetchAll', async (_, thunkAPI) => {
    try {
        return await getResumesService();
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.error) || error.message || error.toString();
        return thunkAPI.rejectWithValue(message);
    }
});

export const fetchResumeById = createAsyncThunk('resume/fetchById', async (id, thunkAPI) => {
    try {
        return await getResumeService(id);
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.error) || error.message || error.toString();
        return thunkAPI.rejectWithValue(message);
    }
});

export const enhanceTextWithAI = createAsyncThunk('resume/enhanceText', async (promptData, thunkAPI) => {
    try {
        return await generateEnhancementService(promptData);
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.error) || error.message || error.toString();
        return thunkAPI.rejectWithValue(message);
    }
});

export const deleteResume = createAsyncThunk('resume/delete', async (id, thunkAPI) => {
    try {
        await deleteResumeService(id);
        return id;
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.error) || error.message || error.toString();
        return thunkAPI.rejectWithValue(message);
    }
});

export const fetchAtsScore = createAsyncThunk('resume/fetchAtsScore', async (data, thunkAPI) => {
    try {
        return await analyzeResumeAtsService(data);
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.error) || error.message || error.toString();
        return thunkAPI.rejectWithValue(message);
    }
});

export const resumeSlice = createSlice({
    name: 'resume',
    initialState,
    reducers: {
        updatePersonalInfo: (state, action) => {
            state.currentResume.personalInfo = { ...state.currentResume.personalInfo, ...action.payload };
        },
        updateSummary: (state, action) => {
            state.currentResume.professionalSummary = action.payload;
        },
        addExperience: (state, action) => {
            state.currentResume.experience.push(action.payload);
        },
        updateExperience: (state, action) => {
            const { index, data } = action.payload;
            state.currentResume.experience[index] = { ...state.currentResume.experience[index], ...data };
        },
        removeExperience: (state, action) => {
            state.currentResume.experience.splice(action.payload, 1);
        },
        // Education reducers
        addEducation: (state, action) => {
            state.currentResume.education.push(action.payload);
        },
        updateEducation: (state, action) => {
            const { index, data } = action.payload;
            state.currentResume.education[index] = { ...state.currentResume.education[index], ...data };
        },
        removeEducation: (state, action) => {
            state.currentResume.education.splice(action.payload, 1);
        },
        // Skills reducers
        updateSkills: (state, action) => {
            state.currentResume.skills = action.payload;
        },
        // Projects reducers
        addProject: (state, action) => {
            state.currentResume.projects.push(action.payload);
        },
        updateProject: (state, action) => {
            const { index, data } = action.payload;
            state.currentResume.projects[index] = { ...state.currentResume.projects[index], ...data };
        },
        removeProject: (state, action) => {
            state.currentResume.projects.splice(action.payload, 1);
        },
        updateTitle: (state, action) => {
            state.currentResume.title = action.payload;
        },
        setTemplate: (state, action) => {
            state.currentResume.templateType = action.payload;
        },
        setThemeColor: (state, action) => {
            const { key, value } = action.payload;
            state.currentResume.themeSettings[key] = value;
            if (state.currentResume.themeSettings.isAtsSafeMode) {
                state.currentResume.themeSettings.isAtsSafeMode = false;
            }
        },
        toggleAtsSafeMode: (state, action) => {
            state.currentResume.themeSettings.isAtsSafeMode = action.payload;
            if (action.payload) {
                state.currentResume.themeSettings.primaryColor = '#000000';
                state.currentResume.themeSettings.secondaryColor = '#374151';
                state.currentResume.templateType = 'Harvard'; // Fallback to safe template
            }
        },
        resetResumeData: (state) => {
            state.currentResume = initialState.currentResume;
        },
        setFullResumeForEdit: (state, action) => {
            state.currentResume = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(saveResume.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(saveResume.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.currentResume = action.payload;
            })
            .addCase(saveResume.rejected, (state, action) => {
                state.status = 'failed';
                state.message = action.payload;
            })
            .addCase(fetchAllResumes.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchAllResumes.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.allResumes = action.payload;
            })
            .addCase(fetchAllResumes.rejected, (state, action) => {
                state.status = 'failed';
                state.message = action.payload;
            })
            .addCase(fetchResumeById.fulfilled, (state, action) => {
                state.currentResume = action.payload;
            })
            .addCase(deleteResume.fulfilled, (state, action) => {
                state.allResumes = state.allResumes.filter((resume) => resume._id !== action.payload);
            })
            .addCase(fetchAtsScore.pending, (state) => {
                state.isAtsLoading = true;
            })
            .addCase(fetchAtsScore.fulfilled, (state, action) => {
                state.isAtsLoading = false;
                state.atsData = action.payload;
            })
            .addCase(fetchAtsScore.rejected, (state, action) => {
                state.isAtsLoading = false;
                state.message = action.payload;
            });
    },
});

export const {
    updatePersonalInfo,
    updateSummary,
    addExperience,
    updateExperience,
    removeExperience,
    addEducation,
    updateEducation,
    removeEducation,
    updateSkills,
    addProject,
    updateProject,
    removeProject,
    updateTitle,
    setTemplate,
    setThemeColor,
    toggleAtsSafeMode,
    resetResumeData,
    setFullResumeForEdit,
} = resumeSlice.actions;

export default resumeSlice.reducer;

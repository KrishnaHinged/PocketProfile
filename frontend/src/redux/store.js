import { configureStore } from '@reduxjs/toolkit';
import resumeReducer from './slices/resumeSlice';
import authReducer from './slices/authSlice';

export const store = configureStore({
    reducer: {
        auth: authReducer,
        resume: resumeReducer,
    },
});

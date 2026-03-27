import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { registerService, loginService, logoutService, updateProfileService } from '../../services/apiService';

// Get user from localStorage
const user = JSON.parse(localStorage.getItem('user'));

const initialState = {
    user: user ? user : null,
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: '',
};

// Register user
export const register = createAsyncThunk('auth/register', async (user, thunkAPI) => {
    try {
        const data = await registerService(user);
        localStorage.setItem('user', JSON.stringify(data));
        return data;
    } catch (error) {
        let message = error.message || error.toString();
        if (error.response && error.response.data) {
            if (error.response.data.error) {
                message = error.response.data.error;
            } else if (error.response.data.errors && error.response.data.errors.length > 0) {
                message = error.response.data.errors[0].msg;
            }
        }
        return thunkAPI.rejectWithValue(message);
    }
});

// Login user
export const login = createAsyncThunk('auth/login', async (user, thunkAPI) => {
    try {
        const data = await loginService(user);
        localStorage.setItem('user', JSON.stringify(data));
        return data;
    } catch (error) {
        let message = error.message || error.toString();
        if (error.response && error.response.data) {
            if (error.response.data.error) {
                message = error.response.data.error;
            } else if (error.response.data.errors && error.response.data.errors.length > 0) {
                message = error.response.data.errors[0].msg;
            }
        }
        return thunkAPI.rejectWithValue(message);
    }
});

export const logout = createAsyncThunk('auth/logout', async () => {
    logoutService();
    localStorage.removeItem('user');
});

// Update user profile
export const updateProfile = createAsyncThunk('auth/updateProfile', async (userData, thunkAPI) => {
    try {
        const data = await updateProfileService(userData);
        localStorage.setItem('user', JSON.stringify(data));
        return data;
    } catch (error) {
        let message = error.message || error.toString();
        if (error.response && error.response.data) {
            message = error.response.data.error || message;
        }
        return thunkAPI.rejectWithValue(message);
    }
});

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        reset: (state) => {
            state.isLoading = false;
            state.isError = false;
            state.isSuccess = false;
            state.message = '';
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(register.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(register.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.user = action.payload;
            })
            .addCase(register.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
                state.user = null;
            })
            .addCase(login.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(login.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.user = action.payload;
            })
            .addCase(login.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
                state.user = null;
            })
            .addCase(updateProfile.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(updateProfile.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.user = action.payload;
            })
            .addCase(updateProfile.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            })
            .addCase(logout.fulfilled, (state) => {
                state.user = null;
            });
    },
});

export const { reset } = authSlice.actions;
export default authSlice.reducer;

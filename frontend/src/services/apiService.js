
import axios from "axios";

// Use Vite proxy in dev, full URL in production
const API_URL =
    import.meta.env.MODE === "production"
        ? "https://pocketprofile.onrender.com/api"
        : "/api";

// Create axios instance
const api = axios.create({
    baseURL: API_URL,
});

// ===============================
// REQUEST INTERCEPTOR (IMPORTANT)
// ===============================
api.interceptors.request.use(
    (config) => {
        // Redux authSlice saves the whole user object under the key 'user'
        const userString = localStorage.getItem("user");
        if (userString) {
            try {
                const user = JSON.parse(userString);
                if (user && user.token) {
                    config.headers.Authorization = `Bearer ${user.token}`;
                }
            } catch (e) {
                console.error("Error parsing user from localStorage", e);
            }
        }

        return config;
    },
    (error) => Promise.reject(error)
);

// ===============================
// RESPONSE INTERCEPTOR
// ===============================
api.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        if (error.response && error.response.status === 401) {
            // Token expired or invalid
            localStorage.removeItem("user");
            window.location.href = "/login";
        }
        return Promise.reject(error);
    }
);

// ===============================
// AUTH SERVICES
// ===============================
export const registerService = async (userData) => {
    const response = await api.post("/auth/register", userData);
    // Storage is handled by Redux thunk in authSlice
    return response.data.data;
};

export const loginService = async (userData) => {
    const response = await api.post("/auth/login", userData);
    // Storage is handled by Redux thunk in authSlice
    return response.data.data;
};

export const logoutService = () => {
    localStorage.removeItem("user");
};

export const updateProfileService = async (userData) => {
    const response = await api.put("/auth/profile", userData);
    return response.data.data;
};

// ===============================
// RESUME SERVICES
// ===============================
export const createResumeService = async (resumeData) => {
    const response = await api.post("/resume", resumeData);
    return response.data.data;
};

export const getResumesService = async () => {
    const response = await api.get("/resume");
    return response.data.data;
};

export const getResumeService = async (id) => {
    const response = await api.get(`/resume/${id}`);
    return response.data.data;
};

export const updateResumeService = async (id, resumeData) => {
    const response = await api.put(`/resume/${id}`, resumeData);
    return response.data.data;
};

export const deleteResumeService = async (id) => {
    const response = await api.delete(`/resume/${id}`);
    return response.data.data;
};

// ===============================
// AI SERVICE
// ===============================
export const generateEnhancementService = async (promptData) => {
    const response = await api.post("/ai/enhance", promptData);
    return response.data.data;
};

// ===============================
// ATS SERVICE
// ===============================
export const analyzeResumeAtsService = async (data) => {
    const response = await api.post("/ats/analyze", data);
    return response.data.data;
};

export default api;
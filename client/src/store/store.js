import { create } from 'zustand';
import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

export const useAuthStore = create((set) => ({
  user: null,
  token: localStorage.getItem('token'),
  isAuthenticated: false,
  loading: false,
  
  login: async (email, password) => {
    try {
      set({ loading: true });
      const response = await axios.post(`${API_URL}/auth/login`, { email, password });
      const { token, user } = response.data;
      
      localStorage.setItem('token', token);
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      
      set({ user, token, isAuthenticated: true, loading: false });
      return { success: true };
    } catch (error) {
      set({ loading: false });
      return { success: false, error: error.response?.data?.message || 'Login failed' };
    }
  },
  
  register: async (name, email, password) => {
    try {
      set({ loading: true });
      const response = await axios.post(`${API_URL}/auth/register`, { name, email, password });
      const { token, user } = response.data;
      
      localStorage.setItem('token', token);
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      
      set({ user, token, isAuthenticated: true, loading: false });
      return { success: true };
    } catch (error) {
      set({ loading: false });
      return { success: false, error: error.response?.data?.message || 'Registration failed' };
    }
  },
  
  logout: () => {
    localStorage.removeItem('token');
    delete axios.defaults.headers.common['Authorization'];
    set({ user: null, token: null, isAuthenticated: false });
  },
  
  checkAuth: async () => {
    const token = localStorage.getItem('token');
    if (!token) return;
    
    try {
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      const response = await axios.get(`${API_URL}/auth/me`);
      set({ user: response.data, isAuthenticated: true });
    } catch (error) {
      localStorage.removeItem('token');
      delete axios.defaults.headers.common['Authorization'];
      set({ user: null, token: null, isAuthenticated: false });
    }
  },
}));

export const useVisualizerStore = create((set) => ({
  algorithm: null,
  isPlaying: false,
  speed: 500,
  currentStep: 0,
  steps: [],
  code: '',
  language: 'python',
  
  setAlgorithm: (algorithm) => set({ algorithm, currentStep: 0, steps: [] }),
  setIsPlaying: (isPlaying) => set({ isPlaying }),
  setSpeed: (speed) => set({ speed }),
  setCurrentStep: (currentStep) => set({ currentStep }),
  setSteps: (steps) => set({ steps }),
  setCode: (code) => set({ code }),
  setLanguage: (language) => set({ language }),
  
  reset: () => set({
    isPlaying: false,
    currentStep: 0,
    steps: [],
  }),
}));

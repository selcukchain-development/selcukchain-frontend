import axios, { AxiosInstance } from 'axios';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5001/api';

const api: AxiosInstance = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

interface CourseData {
  // Define the structure of courseData here
}

interface FeatureData {
  // Define the structure of featureData here
}

interface ResourceData {
  // Define the structure of resourceData here
}

export const getCourses = () => api.get('/courses');
export const createCourse = (courseData: CourseData) => api.post('/courses', courseData);
export const updateCourse = (id: string, courseData: CourseData) => api.put(`/courses/${id}`, courseData);
export const deleteCourse = (id: string) => api.delete(`/courses/${id}`);

export const getFeatures = () => api.get('/features');
export const createFeature = (featureData: FeatureData) => api.post('/features', featureData);
export const updateFeature = (id: string, featureData: FeatureData) => api.put(`/features/${id}`, featureData);
export const deleteFeature = (id: string) => api.delete(`/features/${id}`);

export const getResources = () => api.get('/resources');
export const createResource = (resourceData: ResourceData) => api.post('/resources', resourceData);
export const updateResource = (id: string, resourceData: ResourceData) => api.put(`/resources/${id}`, resourceData);
export const deleteResource = (id: string) => api.delete(`/resources/${id}`);

export const login = (email: string, password: string) => api.post('/auth/login', { email, password });

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers['x-auth-token'] = token;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;
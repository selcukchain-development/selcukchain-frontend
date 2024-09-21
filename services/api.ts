import axios, { AxiosInstance } from 'axios';

const API_URL = process.env.NEXT_PUBLIC_PROD_API_URL || process.env.NEXT_PUBLIC_DEV_API_URL;
console.log("uri", API_URL);


const api: AxiosInstance = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export interface CourseData {
  title: string;
  description: string;
  instructor: string;
  duration: string;
  level: string;
  topics: string[];
}

export interface FeatureData {
  title: string;
  description: string;
  icon: string;
}

export interface ResourceData {
  title: string;
  description: string;
  link: string;
  type: string;
}

export interface GalleryEventData {
  title: string;
  description: string;
  date: Date;
  imageUrl: string;
}

export interface UserData {
  name: string;
  email: string;
  password: string;
  role: string;
}

export interface AboutUsData {
  vision: string;
  mission: string;
  features: {
    icon: string;
    title: string;
    description: string;
  }[];
  teamMembers: {
    name: string;
    role: string;
    bio: string;
  }[];
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

export const getGalleryEvents = () => api.get('/gallery-events');
export const createGalleryEvent = (eventData: GalleryEventData) => api.post('/gallery-events', eventData);
export const updateGalleryEvent = (id: string, eventData: GalleryEventData) => api.put(`/gallery-events/${id}`, eventData);
export const deleteGalleryEvent = (id: string) => api.delete(`/gallery-events/${id}`);

export const getUsers = () => api.get('/users');
export const createUser = (userData: UserData) => api.post('/users', userData);
export const updateUser = (id: string, userData: UserData) => api.put(`/users/${id}`, userData);
export const deleteUser = (id: string) => api.delete(`/users/${id}`);

export const getAboutUs = () => api.get('/aboutus');
export const updateAboutUs = (aboutUsData: AboutUsData) => api.put('/aboutus', aboutUsData);

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
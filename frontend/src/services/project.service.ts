import api from './api';
import { Project } from '../types';

export const getProjects = async () => {
  const res = await api.get<Project[]>('/api/projects');
  return res.data;
};

import axios from 'axios';

const API_BASE = 'http://127.0.0.1:8000/api';

// Get all events
export const getEvents = async () => {
  const response = await axios.get(`${API_BASE}/event_list_create`);
  return response.data;
};

// Get single event
export const getEvent = async (id) => {
  const response = await axios.get(`${API_BASE}/event_detail/${id}/`);
  return response.data;
};

// Create event
export const createEvent = async (data) => {
  const response = await axios.post(`${API_BASE}/event_list_create`, data);
  return response.data;
};

// Update event
export const updateEvent = async (id, data) => {
  const response = await axios.put(`${API_BASE}/event_detail/${id}/`, data);
  return response.data;
};

// Delete event
export const deleteEvent = async (id) => {
  const response = await axios.delete(`${API_BASE}/event_detail/${id}/`);
  return response.data;
};



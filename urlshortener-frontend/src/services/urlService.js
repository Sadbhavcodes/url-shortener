import api from './api';

export const shortenUrl = async (longUrl, userId) => {
  const payload = { longUrl };
  if (userId) payload.userId = userId;
  const response = await api.post('/urls/shorten', payload);
  return response.data;
};

export const getUserUrls = async (userId) => {
  if (!userId) return [];
  const response = await api.get(`/urls/user/${userId}`);
  return response.data;
};

export const deleteUrl = async (shortCode) => {
  const response = await api.delete(`/urls/${shortCode}`);
  return response.data;
};

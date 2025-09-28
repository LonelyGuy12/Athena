import request from './index';
import { API_ENDPOINTS } from '../constants/common';

export const fetchUserDetails = async (authToken: string) => {
  return request(API_ENDPOINTS.USER_ME, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${authToken}`,
      'Content-Type': 'application/json',
    },
  });
};

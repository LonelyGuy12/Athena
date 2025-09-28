import request from '.';
import { API_ENDPOINTS } from '../constants/common';

export default function getRestrictedApps(): Promise<string[]> {
  return request(API_ENDPOINTS.ATHENA_RESTRICTED_APPS, {
    method: 'GET',
  });
}

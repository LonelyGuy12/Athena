import request from '.';
import { API_ENDPOINTS } from '../constants/common';

export default async function getEnableSipCheck(): Promise<boolean> {
  const result = await request(API_ENDPOINTS.ENABLE_SIP_CHECK, {
    method: 'GET',
  });
  return result?.value === '1';
}

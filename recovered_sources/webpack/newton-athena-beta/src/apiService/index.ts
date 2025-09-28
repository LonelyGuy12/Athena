import { API_ENDPOINTS } from '../constants/common';

/**
 * Makes an HTTP request to the specified URL with the given options.
 *
 * @param {string} url - The URL to which the request is sent.
 * @param {object} options - The options to apply to the request, such as method, headers, body, etc.
 * @returns {Promise<any>} A promise that resolves to the response data in JSON format.
 * @throws {Error} Throws an error if the response is not ok or if there is a network error.
 */
export default async function request(
  url: string,
  options: object,
): Promise<any> {
  return fetch(`${API_ENDPOINTS.BASE_URL}${url}`, options)
    .then((response) => {
      if (!response.ok) {
        throw new Error(response.statusText);
      }
      return response.json();
    })
    .catch((error) => {
      throw error;
    });
}

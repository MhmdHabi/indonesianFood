// api-endpoint.js
import CONFIG from './config';

const API_ENDPOINT = {
  LIST: `${CONFIG.API_BASE_URL}/list`,
  RESTAURANT_DETAIL: (id) => `${CONFIG.API_BASE_URL}/detail/${id}`,
  SEARCH: (query) => `${CONFIG.API_BASE_URL}/search?q=${query}`,
};

export default API_ENDPOINT;

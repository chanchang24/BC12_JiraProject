import axios from 'axios';
import { BASE_URL, TOKEN_CYBERSOFT } from '../setting/apiConfig';

const callApi = (endpoint, method = 'GET', data = null, token = null) => {
  return axios({
    url: `${BASE_URL}/${endpoint}`,
    method,
    data,
    headers: token
      ? {
          Authorization: `Bearer ${token}`,
          TokenCybersoft: TOKEN_CYBERSOFT,
        }
      : null,
  });
};
export default callApi;

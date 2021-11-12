import callApi from '../utils/callApi';

const projectApi = {
  getAllProject: (token) =>
    callApi('Project/getAllProject', 'GET', null, token),
};
export default projectApi;

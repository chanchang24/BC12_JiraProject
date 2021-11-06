import React, { useEffect } from 'react';
import projectApi from '../../../apis/projectApi';
import { ACCESS_TOKEN } from '../../../setting/apiConfig';

export default function ProjectManagement() {
  const getAllProject = async () => {
    try {
      const { data } = await projectApi.getAllProject(ACCESS_TOKEN);
      console.log(data);
    } catch (err) {
      console.log(err.response);
    }
  };
  useEffect(() => {
    getAllProject();
  }, []);

  return <div>ProjectManagement</div>;
}

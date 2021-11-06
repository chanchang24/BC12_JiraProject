import ProjectManagement from '../containers/admin/ProjectManagement/ProjectManagement';

export const adminRoutes = [
  {
    path: '/',
    component: ProjectManagement,
    exact: true,
    isPrivate: false,
  },
];

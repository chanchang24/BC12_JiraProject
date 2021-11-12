import ProjectManagement from '../containers/admin/ProjectManagement/ProjectManagement';
import Home from "../containers/client/Home/Home";
import Register from "../containers/share/Auth/Register/Register";


export const clientRoutes =[
    {
        path: '/',
        component: Home,
        exact: true,
        isPrivate: false,
    },
 
];
export const adminRoutes = [
  {
    path: '/',
    component: ProjectManagement,
    exact: true,
    isPrivate: false,
  },
];


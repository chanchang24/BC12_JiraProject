import Home from "../containers/client/Home/Home";
import Register from "../containers/share/Auth/Register/Register";

export const clientRoutes =[
    {
        path: '/',
        component: Home,
        exact: true,
        isPrivate: false,
    },
    {
        path: '/register',
        component: Register,
        exact: false,
        isPrivate: false,
    },

   
]
// export const adminRoutes =[
//     {
//         path: '/admin',
//         component:Dashboard,
//         exact: true,
//         isPrivate: true,
//     }
// ];
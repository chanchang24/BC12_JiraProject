import Movie from "containers/admin/Movie/Movie";
import Passport from "containers/admin/Dashboard/Dashboard";
import User from "containers/admin/User/User";
import About from "containers/client/About/About";
import DemoAntDesign from "containers/client/DemoAntDesgin/DemoAntDesign";
import DemoHOC from "containers/client/DemoHOC/DemoHOC";
import DemoHook from "containers/client/DemoHook/DemoHook";
import Home from "containers/client/Home/Home";
import MovieDetail from "containers/client/MovieDetail/MovieDetail";
import Review from "containers/client/Review/Review";
import SeatPlan from "containers/client/SeatPlan/SeatPlan";
import Theater from "containers/client/Theater/Theater";
import Dashboard from "containers/admin/Dashboard/Dashboard";

export const clientRoutes =[
    {
        path: '/',
        component: Home,
        exact: true,
        isPrivate: false,
    },
    
   
]
export const adminRoutes =[
    {
        path: '/admin',
        component:Dashboard,
        exact: true,
        isPrivate: true,
    }
];
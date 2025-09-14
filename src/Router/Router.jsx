import { createBrowserRouter } from "react-router";
import RootLayout from "../Layouts/RootLayout";
import Home from "../Pages/Home/Home";
import BreakingNews from "../Pages/News/BreakingNews";
import BusinessNews from "../Pages/News/BusinessNews";
import TechNews from "../Pages/News/TechNews";
import HealthNews from "../Pages/News/HealthNews";
import SportNews from "../Pages/News/SportNews";
import EntertainNews from "../Pages/News/EntertainNews";
import ScienceNews from "../Pages/News/ScienceNews";
import PoliticsNews from "../Pages/News/PoliticsNews";
import EduNews from "../Pages/News/EduNews";
import LifestyleNews from "../Pages/News/LifestyleNews";
import NewsDetails from "../Pages/NewsDetails/NewsDetails";
import LoginForm from "../Pages/Authentication/Login";
import Login from "../Pages/Authentication/Login";
import Register from "../Pages/Authentication/Register";
import DashLayout from "../Layouts/DashLayout";
import DashboardHome from "../Pages/Dashboard/DashHome/DashHome";
import AddPost from "../Pages/Dashboard/Admin/AddPost";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout></RootLayout>,
    children: [
      {
        index: true,
        Component: Home,
      },
      {
        path: "/category/1",
        Component: BreakingNews,
      },
      {
        path: "/category/2",
        Component: BusinessNews,
      },
      {
        path: "/category/3",
        Component: TechNews,
      },
      {
        path: "/category/4",
        Component: HealthNews,
      },
      {
        path: "/category/5",
        Component: SportNews,
      },
      {
        path: "/category/6",
        Component: EntertainNews,
      },
      {
        path: "/category/7",
        Component: ScienceNews,
      },
      {
        path: "/category/8",
        Component: PoliticsNews,
      },
      {
        path: "/category/9",
        Component: EduNews,
      },
      {
        path: "/category/10",
        Component: LifestyleNews,
      },
      {
        path: "/login",
        Component: Login,
      },
      {
        path: "/register",
        Component: Register,
      },
      {
        path: "/category/:id",

        Component: NewsDetails,
        loader: ({ params }) =>
          fetch(`http://localhost:3000/all-news/${params.id}`),
      },
    ],
  },
  {
    path: "/dashboard",
    element: <DashLayout></DashLayout>,
    children: [
      {
        index: true,
        element: <DashboardHome></DashboardHome>,
      },
      {
        path: "/dashboard/add-post",
        element: <AddPost></AddPost>,
      },
    ],
  },
]);

export default router;

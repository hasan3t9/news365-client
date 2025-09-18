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
import Login from "../Pages/Authentication/Login";
import Register from "../Pages/Authentication/Register";
import DashLayout from "../Layouts/DashLayout";
import DashboardHome from "../Pages/Dashboard/DashHome/DashHome";
import AddPost from "../Pages/Dashboard/Admin/AddPost";
import PostList from "../Pages/Dashboard/Admin/PostList";
import AddNewsPost from "../Pages/Dashboard/Admin/AddNewsPost";
import EditNewsPost from "../Pages/Dashboard/Admin/EditNewsPost";
import NewsPostList from "../Pages/Dashboard/Admin/NewsPostList";

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
        path: "/category/breaking-news",
        Component: BreakingNews,
      },
      {
        path: "/category/business-news",
        Component: BusinessNews,
      },
      {
        path: "/category/technology-news",
        Component: TechNews,
      },
      {
        path: "/category/health-news",
        Component: HealthNews,
      },
      {
        path: "/category/sport-news",
        Component: SportNews,
      },
      {
        path: "/category/entertainment-news",
        Component: EntertainNews,
      },
      {
        path: "/category/science-news",
        Component: ScienceNews,
      },
      {
        path: "/category/politics-news",
        Component: PoliticsNews,
      },
      {
        path: "/category/education-news",
        Component: EduNews,
      },
      {
        path: "/category/lifestyle-news",
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
          fetch(`http://localhost:3000/all-news365/${params.id}`),
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
      {
        path: "/dashboard/add-news-post",
        element: <AddNewsPost></AddNewsPost>,
      },
      {
        path: "/dashboard/post-list",
        element: <PostList></PostList>,
      },
      {
        path: "/dashboard/news-post-list",
        element: <NewsPostList></NewsPostList>,
      },
      {
        path: "/dashboard/edit-post/:id",
        element: <EditNewsPost></EditNewsPost>,
      },
    ],
  },
]);

export default router;

import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "./components/auth/Login.jsx";
import Signup from "./components/auth/Signup.jsx";
import Home from "./components/Home.jsx";
import Jobs from "./components/Jobs.jsx";
import Browser from "./components/Browser.jsx";
import Profile from "./components/Profile.jsx";
import JobDescription from "./components/JobDescription.jsx";
import Companies from "./components/admin/Companies.jsx";
import CompaniesCreate from "./components/admin/CompaniesCreate.jsx";
import CompanySetup from "./components/admin/CompanySetup.jsx";
import AdminJobs from "./components/admin/AdminJobs.jsx";
import PostJob from "./components/admin/PostJob";
import Applicants from "./components/admin/Applicants";
// import Navbar from "./components/commen/Navbar.jsx";

const appRoute = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/signup",
    element: <Signup />,
  },
  {
    path: "/jobs",
    element: <Jobs />,
  },
  {
    path: "/jobs/description/:id",
    element: <JobDescription />,
  },
  {
    path: "/browser",
    element: <Browser />,
  },
  {
    path: "/profile",
    element: <Profile />,
  },
  /////////// admin routes............. //////////
  {
    path: "/admin/companies",
    element: <Companies />,
  },

  {
    path: "/admin/companies/create",
    element: <CompaniesCreate />,
  },
  {
    path: "/admin/companies/:id",
    element: <CompanySetup />,
  },
  {
    path: "/admin/jobs",
    element: <AdminJobs />,
  },
  {
    path: "/admin/jobs/create",
    element: <PostJob />,
  },
  {
    path: "/admin/jobs/:id/applicants",
    element: <Applicants />,
  },
]);

function App() {
  // console.log(oi);
  return (
    <>
      <RouterProvider router={appRoute} />
    </>
  );
}

export default App;

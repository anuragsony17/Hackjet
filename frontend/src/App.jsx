import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

import Home from './components/home/Home';
import AdminDashboard from "./components/admin/AdminDashboard";
import AdminProblemsPage from "./components/admin/componentAdmin/AdminProblemsPage";
import UserAdminPage from "./components/admin/componentAdmin/UserAdminPage";
import Login from "./components/auth/components/Login";
import ResetPasswordModal from "./components/auth/components/Reset";
import Signup from "./components/auth/components/Signup";
import ForgotPasswordModal from "./components/auth/components/ForgetPass";
import WorkSpace from "./components/models/workspace/WorkSpace";
import Protected from "./components/auth/components/Protected";

import { useDispatch } from "react-redux";
import { checkAuthAsync } from "./components/auth/authSlices";
import { useEffect } from "react";

/* 🔥 ADD THESE */
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Pricing from "./components/price/PricePage";
import Settings from "./components/setting/Setting";
import MyProfile from "./components/profile/MyProfile";
import PaymentSuccess from "./components/price/PaymentSuccess";
import StripeCheckout from "./components/price/StripeCheckout";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(checkAuthAsync());
  }, []);

  const router = createBrowserRouter([
    { path: "/auth-login", element: <Login /> },
    { path: "/auth-reset-password", element: <ResetPasswordModal /> },
    { path: "/auth-singup", element: <Signup /> },
    { path: "/auth-forget", element: <ForgotPasswordModal /> },

    { path: "/", element: <Home /> },

    {
      path: "/problems/:id",
      element: (
        <Protected>
          <WorkSpace />
        </Protected>
      ),
    },
    {
      path: "/price",
      element: (
        <Protected>
          <Pricing/>
        </Protected>
      ),
    },
    {
      path: "/settings",
      element: (
        <Protected>
          <Settings/>
        </Protected>
      ),
    },
     {
      path: "/profile",
      element: (
        <Protected>
          <MyProfile />
        </Protected>
      ),
    },

    {
      path: "/payment-success",
      element: (
        <Protected>
          <PaymentSuccess />
        </Protected>
      ),
    },

    {
      path: '/checkout',
      element: (
        <Protected>
          <StripeCheckout></StripeCheckout>
        </Protected>
      ),
    },

    { path: "/admin", element: <AdminDashboard /> },
    { path: "/adminProblem", element: <AdminProblemsPage /> },
    { path: "/adminUsers", element: <UserAdminPage /> },
  ]);

  return (
    <>
      {/* 🔥 TOAST CONTAINER */}
      <ToastContainer position="top-right" autoClose={3000}/>
      <RouterProvider router={router} />
    </>
  );
}

export default App;

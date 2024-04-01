import "./App.css";
import Home from "./components/HomePage/Home";
import Books from "./components/Books";
import BookDetails from "./components/BookDetails";
import Cookies from "js-cookie";

import {
  BrowserRouter as Router,
  Outlet,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Login from "./components/Login";
import Register from "./components/Register";
import ScrollToTop from "./components/ScrollToTop";
import CartDetails from "./components/CartDetails";
import Profile from "./components/Profile";
import { useSelector } from "react-redux";
import UserDetails from "./components/UserDetails";
import History from "./components/History";
import Notifications from "./components/Notifications";
import Settings from "./components/Settings";
import UpdateUser from "./components/UpdateUser";
import Checkout from "./components/Checkout";
import Contact from "./components/Contact";
import ConfirmAccount from "./components/ConfirmAccount";
import SendRecoverPassword from "./components/SendRecoverPassword";
import RecoverPassword from "./components/RecoverPassword";
import NotFound from "./components/NotFound";
import { useEffect } from "react";

const Layout = () => {
  const { currentUser } = useSelector((state) => state.user);
  return <div>{currentUser ? <Outlet /> : <Navigate to="/login" />}</div>;
};
const PreventLog = () => {
  const { currentUser } = useSelector((state) => state.user);
  return (
    <div>
      {currentUser ? (
        <Navigate to={currentUser.isActive ? "/" : "/confirmAccount"} />
      ) : (
        <Outlet />
      )}
    </div>
  );
};
const Activate = () => {
  const { currentUser } = useSelector((state) => state.user);
  return (
    <>
      {currentUser && currentUser.isActive ? (
        <Outlet />
      ) : (
        <Navigate to="/confirmAccount" />
      )}
    </>
  );
};
const AlreadyActive = () => {
  const { currentUser } = useSelector((state) => state.user);
  return <div>{currentUser.isActive ? <Navigate to="/" /> : <Outlet />}</div>;
};
function App() {
  useEffect(() => {
    const cookieExists = Cookies.get("access_token");

    if (!cookieExists) {
      localStorage.removeItem("persist:root");
    }
  }, []);
  return (
    <div className="bg-bgcolor overflow-hidden  ">
      <Router>
        <ScrollToTop />
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/books" element={<Books />} />
          <Route path="/Contact" element={<Contact />} />

          <Route path="/recoverPassword/:code" element={<RecoverPassword />} />
          <Route path="/books/:id" element={<BookDetails />} />
          <Route element={<PreventLog />}>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route
              path="/sendRecoverPassword"
              element={<SendRecoverPassword />}
            />
          </Route>
          <Route element={<Layout />}>
            <Route path="/cartDetails" element={<CartDetails />} />
            <Route element={<Activate />}>
              <Route path="/Checkout" element={<Checkout />} />
            </Route>
            <Route element={<AlreadyActive />}>
              <Route path="/confirmAccount" element={<ConfirmAccount />} />
            </Route>

            <Route path="/profile" element={<Profile />}>
              <Route path="userDetails" element={<UserDetails />} />
              <Route path="history" element={<History />} />
              <Route path="notifications" element={<Notifications />} />
              <Route path="settings" element={<Settings />} />
              <Route path="settings/update" element={<UpdateUser />} />
            </Route>
          </Route>
          <Route path="/*" element={<NotFound />} />
        </Routes>
        <Footer />
      </Router>
    </div>
  );
}

export default App;

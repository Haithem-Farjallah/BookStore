import "./App.css";
import Home from "./components/HomePage/Home";
import Books from "./components/Books";
import BookDetails from "./components/BookDetails";
import Cart from "./components/Cart";

import {
  BrowserRouter as Router,
  Outlet,
  Routes,
  Route,
} from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Login from "./components/Login";
import Register from "./components/Register";
import ScrollToTop from "./components/ScrollToTop";
import Search from "./components/Search";
import CartTotals from "./components/CartTotals";

const Layout = () => {
  return (
    <div className="overflow-x-hidden">
      <Navbar />
      <Outlet />
      <Footer />
    </div>
  );
};

function App() {
  return (
    <div className="bg-bgcolor  ">
      <Router>
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route path="/" element={<Home />} />
            <Route path="books" element={<Books />} />
            <Route path="cartTotals" element={<CartTotals />} />
            <Route path="books/:id" element={<BookDetails />} />
          </Route>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;

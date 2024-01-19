import "./App.css";
import Home from "./components/HomePage/Home";
import Books from "./components/Books";
import BookDetails from "./components/BookDetails";
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
            <Route path="login" element={<Login />} />
            <Route path="register" element={<Register />} />
            <Route path="books/:id" element={<BookDetails />} />
          </Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;

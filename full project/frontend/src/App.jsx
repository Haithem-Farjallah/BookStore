import './App.css';
import Home from './components/HomePage/Home';
import Books from './components/Books';
import { createBrowserRouter , Outlet, RouterProvider } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Login from './components/Login';
import Register from './components/Register';

const Layout=()=>{
  return(
    <>
      <Navbar/>
      <Outlet/>
      <Footer/>
    </>
  )
}
const router=createBrowserRouter([
  {
    path:'/',
    element:<Layout/>,
    errorElement: <p>Oops something went wrong</p>,
    children:[{
        path:'/',
        element:<Home/>
      },
      {
        path:'/books',
        element:<Books/>
      }
    ]
  },
  {
    path:'/login',
    element:<Login/>
  },
  {
    path:'/register',
    element:<Register/>
  }
  
])

function App() {
  return (
    <div className="bg-bgcolor h-screen overflow-x-hidden  ">
      <RouterProvider router ={router}/>
    </div>
  );
}

export default App;

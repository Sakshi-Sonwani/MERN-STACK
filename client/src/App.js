import './App.css';
import AddUser from './adduser/AddUser';
import User from "./getuser/user";
import { createBrowserRouter, RouterProvider } from "react-router-dom"; 
import { Navigate } from "react-router-dom";
import UpdateUser from './updateuser/Update';

function App() {
  const router = createBrowserRouter([
    { 
      path: "/users", 
      element: <User />
    },       // main page
    { 
      path: "/adduser", 
      element: <AddUser /> 
    },  // add user form
    { 
      path: "/", 
      element: <Navigate to="/users" replace /> 
    }, // redirect root to /users
    {
      path: "/updateuser/:id",
      element: <UpdateUser /> 
    }
  ]);

  return (
    <div className="App">
      <RouterProvider router={router}></RouterProvider>
    </div>
  );
}

export default App;

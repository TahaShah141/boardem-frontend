import './App.css'
import {
  createBrowserRouter,
  Route,
  RouterProvider,
  createRoutesFromElements,
  Navigate,
} from "react-router-dom";

//layouts
import RootLayout from './Layouts/RootLayout';
import Authenticator from './Components/Authenticator';
import Authentication from './Components/Authentication';

//pages
import SignUp from './Pages/SignUp';
import Login from './Pages/Login';
import Home from './Pages/Home';
import UserMessages from './Pages/UserMessages';
import User from './Pages/User';
import Protected404 from './Pages/Protected404';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<RootLayout />}>

      <Route element={<Authenticator />} >
        <Route index element={<Home />} />
        <Route path='home' element={<Navigate to="./"/>} />
        <Route path='messages' element={<UserMessages />} />
        <Route path='profile' element={<User />} />
        <Route path='users/:id/messages' element={<UserMessages />} />
      </Route>

      <Route element={<Authentication />}>
        <Route path='login' element={<Login />} />
        <Route path='signup' element={<SignUp />} />
      </Route>

      <Route path="*" element={<Navigate to='/' />} />
    </Route>
  )
)

function App() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  )
}

export default App

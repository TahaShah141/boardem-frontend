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
import User from './Pages/Profile/User';
import BoardDetails from './Pages/Profile/BoardDetails';
import Boards from './Pages/Boards/Boards';
import BoardsCreated from './Pages/Boards/BoardsCreated';
import BoardView from './Components/BoardView';
import BoardsJoined from './Pages/Boards/BoardsJoined';
import MessagesSent from './Pages/Profile/MessagesSent';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<RootLayout />}>
      <Route index element={<Home />} />

      <Route element={<Authentication />}>
        <Route path='login' element={<Login />} />
        <Route path='signup' element={<SignUp />} />
      </Route>

      <Route element={<Authenticator />} >
        <Route path='boards' element={<Boards/>}>
          <Route index element={<Navigate to='created' />} />
          <Route path='created' element={<BoardsCreated />}/>
          <Route path='joined' element={<BoardsJoined />}/>
        </Route>
        <Route path='boards/:boardID' element={<BoardView delay={15000}/>} /> 
        <Route path='profile' element={<User />} >
          <Route index element={<Navigate to='boards' />} />
          <Route path='boards' element={<BoardDetails />} />
          <Route path='messages' element={<MessagesSent />} />
        </Route>
      </Route>
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

import { Route, Routes } from 'react-router-dom';
import logo from './logo.svg';

import Register from './Pages/Auth/Register';
import Login from './Pages/Auth/Login';
import Users from './Pages/Dashboard/Users';
import Logout from './Pages/Auth/LogOut';
import GoogleCallBack from './Pages/Auth/GoogleCallBack';
import Dashboard from './Pages/Dashboard/Dashboard';
import RequireAuth from './Pages/Auth/RequireAuth';
import User from './Pages/Dashboard/User';

function App() {

  return (
    <div className="App">
      <Routes>
        <Route path='/register' element={<Register/>}></Route>
        <Route path='/login' element={<Login/>}></Route>
        <Route path='/users' element={<Users/>}></Route>
        <Route path='/logout' element={<Logout/>}></Route>
        <Route path='/auth/google/callback' element={<GoogleCallBack/>}/>
        {/*Protected Routes*/ }
        <Route element ={<RequireAuth/>}>
          <Route path='/dashboard' element={<Dashboard/>}>
            <Route path='users' element={<Users/>}/>
            <Route path='users/:id'element={<User/>}/>
          </Route>
        </Route>
      </Routes>
    </div>
  );
}

export default App;

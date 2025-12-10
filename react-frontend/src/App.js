import { Route, Routes } from 'react-router-dom';
import logo from './logo.svg';

import Register from './Pages/Auth/Register';
import Login from './Pages/Auth/Login';
import Users from './Pages/Dashboard/Users';



function App() {

  return (
    <div className="App">
      <Routes>
        <Route path='/register' element={<Register/>}></Route>
        <Route path='/login' element={<Login/>}></Route>
        <Route path='/users' element={<Users/>}></Route>
      </Routes>
    </div>
  );
}

export default App;

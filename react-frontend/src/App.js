import { Route, Routes } from 'react-router-dom';
import logo from './logo.svg';

import Register from './Pages/Auth/Register';
import Login from './Pages/Auth/Login';



function App() {

  return (
    <div className="App">
      <Routes>
        <Route path='/register' element={<Register/>}></Route>
        <Route path='/login' element={<Login/>}></Route>
      </Routes>
    </div>
  );
}

export default App;

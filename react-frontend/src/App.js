import { Route, Routes } from 'react-router-dom';
import logo from './logo.svg';
import Login from './Pages/Login';


function App() {
  return (
    <div className="App">
      <Routes>
        <Route path='/login' element={<Login/>}></Route>
      </Routes>
    </div>
  );
}

export default App;

import { Route, Routes } from 'react-router-dom';
import logo from './logo.svg';

import Register from './Pages/Auth/Register';



function App() {

  return (
    <div className="App">
      <Routes>
        <Route path='/register' element={<Register/>}></Route>
      </Routes>
    </div>
  );
}

export default App;

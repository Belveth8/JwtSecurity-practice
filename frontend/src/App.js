import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from './components/Login/Login';
import Nav from './components/Navigation/Nav';
import Register from './components/Register/Register';
import BoardList from './components/Board/BoardList';
import BoardForm from './components/Board/BoardForm';
import BoardDetail from './components/Board/BoardDetail';

function App() {
  return (
    <BrowserRouter>
      <Nav />
        <Routes>
            <Route path='/Login' element={<Login /> } />
            <Route path='/boardList' element={<BoardList />} />
            <Route path='/register' element={<Register />} />

            {/* boardList */}
            <Route path='/boardDetail' element={<BoardDetail />} />
            <Route path='/boardForm' element={<BoardForm />} />
        </Routes>
    </BrowserRouter>
    

  );
}

export default App;

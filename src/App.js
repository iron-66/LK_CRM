import './App.css';
import { Route, Routes, BrowserRouter } from 'react-router-dom';

import Header from './Components/Header'
import MainPage from './Components/MainPage'
import CardInfo from './Components/CardInfo';

function App() {
  return (
    <div className='main-container'>
      <Header/>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<MainPage/>}/>
          <Route path='/student/:studentId' element={<CardInfo/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

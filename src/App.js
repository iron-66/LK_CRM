import './App.css';
import { Route, Routes, BrowserRouter } from 'react-router-dom';

import Header from './Components/Header'
import KanbanBoard from './Components/KanbanBoard'
import CardInfo from './Components/CardInfo';
import TableBoard from './Components/TableBoard';

function App() {
  return (
    <div className='main-container'>
      <Header/>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<KanbanBoard/>}/>
          <Route path='/table' element={<TableBoard/>}/>
          <Route path='/student/:studentId' element={<CardInfo/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
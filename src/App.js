import './App.css';

import Header from './Components/Header';
import MainPage from './Components/MainPage'
import CardInfo from './Components/CardInfo';

function App() {
  return (
    <div className='main-container'>
      <Header message='Hello'/>
      <MainPage></MainPage>
      {/* <CardInfo></CardInfo> */}
    </div>
  );
}

export default App;

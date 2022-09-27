import { Route, Routes,  } from 'react-router-dom';

import { Home } from './pages/Home';
import { Ad } from './pages/Ad';

import './styles/main.css';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />}/>
      <Route path=":id" element={<Ad />}/>
    </Routes>
  )
}

export default App
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './Home';
import Country from './Country'
import End from './End'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path='/:id' element={<Country />} />
        <Route path='/end' element={<End />} />
      </Routes>
    </BrowserRouter>
  );
}

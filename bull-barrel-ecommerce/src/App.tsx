import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ProductCatalog from './features/ProductCatalog';
import ProductPage from './features/ProductPage';
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route path="/" element={<ProductCatalog />} />
          <Route path="/product/:id" element={<ProductPage />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;

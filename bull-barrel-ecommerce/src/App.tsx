import { useState } from 'react';
import ProductPage from './features/ProductPage';
import './App.css';
import ProductCatalog from './features/ProductCatalog';

function App() {
  return (
    <div className="App">
      <ProductCatalog />
      {/* <ProductPage /> */}
    </div>
  );
}

export default App;

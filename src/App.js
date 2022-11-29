import React, { useState} from 'react';
import logo from './logo.svg';
import './App.css';
import Button from './components/button';
import Sidebar from './components/sidebar';
import { PRODUCTS } from './constants/data/products';
import Card from './components/card';

function App() {
  const [isOpen, setIsOpen] = useState(false);
  const [showProducts, setShowProducts] = useState(false);
  const onHandlerClick = () => {
    setIsOpen(!isOpen);
    setShowProducts(!showProducts);
  }
  return (
    <div className="App">
      <Sidebar onClose={onHandlerClick} isOpen={isOpen} />
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <Button text='Click me' onHandlerClick={onHandlerClick}/>
        {showProducts ? (
          <div className='products-container'>
          {PRODUCTS.map((product) => (
            <Card product={product} key={product.name} />
          ))}
        </div>
        ) : null }

      </header>
    </div>
  );
}

export default App;

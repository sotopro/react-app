import React, { useState, useEffect} from 'react';
import logo from './logo.svg';
import './App.css';
import Button from './components/button';
import Sidebar from './components/sidebar';
import Header from './components/header';
import { PRODUCTS } from './constants/data/products';
import Card from './components/card';

function App() {
  const [isOpen, setIsOpen] = useState(false);
  const [showProducts, setShowProducts] = useState(false);

  const onHandlerCart = () => {
    setIsOpen(!isOpen);
  }

  return (
    <div className="container">
      <Sidebar onClose={onHandlerCart} isOpen={isOpen} />
      <Header numbersOfItems={0} onHandlerCart={onHandlerCart} />
      <h1>Productos destacados</h1>
        <div className='products-container'>
        {PRODUCTS.map((product) => (
          <Card product={product} key={product.name} />
        ))}
      </div>
    </div>
  );
}

export default App;

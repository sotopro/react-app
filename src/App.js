import React, { useState, useContext} from 'react';
import {Sidebar, Header, CartItem} from './components'
import { useFetch } from './hooks/useFetch';
import { Link } from 'react-router-dom';
import { URL_BASE, URL_ENDPOINTS } from './constants/services';
import Router from './router';
import './App.css';
import { CartProvider } from './context';

const App = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showProducts, setShowProducts] = useState(false);
  const { data: user, error, loading } = useFetch(`${URL_BASE}${URL_ENDPOINTS.USERS}`);

  const onHandlerCart = () => {
    setIsOpen(!isOpen);
  }

  return (
    <div className="container">
      <CartProvider>
      <Sidebar onClose={onHandlerCart} isOpen={isOpen} />
      <Header onHandlerCart={onHandlerCart} user={user[0]} />
      <Router />
      </CartProvider>
    </div>
  )
}

export default App;

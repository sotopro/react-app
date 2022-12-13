import React, { useState, useEffect} from 'react';
import {Sidebar, Header} from './components'
import { useFetch } from './hooks/useFetch';
import { Link } from 'react-router-dom';
import { URL_BASE, URL_ENDPOINTS } from './constants/services';
import Router from './router';
import './App.css';

const App = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showProducts, setShowProducts] = useState(false);

  const { data: user, error, loading } = useFetch(`${URL_BASE}${URL_ENDPOINTS.USERS}`);

  const onHandlerCart = () => {
    setIsOpen(!isOpen);
  }
  return (
    <div className="container">
      <Sidebar onClose={onHandlerCart} isOpen={isOpen}>
        <div  className='cart-container'>
        <Link to='/cart' className='button-cart'>Go to Cart</Link>
        </div>
      </Sidebar>
      <Header numbersOfItems={0} onHandlerCart={onHandlerCart} user={user[0]} />
      <Router />
    </div>
  )
}

export default App;

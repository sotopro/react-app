import React from 'react';
import './styles.css';
import { useNavigate } from 'react-router-dom';
import { PRODUCTS } from '../../constants/data/products';
import { Card} from '../../components'

const Home = () => {
  const navigate = useNavigate();
  const onHandlerSelect = (product) => {  
    navigate(`/product/${product.id}`, { state: product})
  }
  return (
    <div className="container">
      <h1>Productos destacados</h1>
        <div className='products-container'>
        {PRODUCTS.map((product) => (
          <Card product={product} key={product.name} onSelect={onHandlerSelect}/>
        ))}
      </div>
    </div>
  );
}

export default Home;

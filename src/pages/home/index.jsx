import React, { useEffect, useState } from 'react';
import './styles.css';
import { useNavigate } from 'react-router-dom';
import { PRODUCTS } from '../../constants/data/products';
import { Card, Progress} from '../../components'


const Home = () => {
  const [scrollPosition, setScrollPosition] = useState(0);
  const navigate = useNavigate();
  const onHandlerSelect = (product) => {  
    navigate(`/product/${product.id}`, { state: product})
  }

  useEffect(() => {
    const getDocHeight = () => {
      return Math.max(
        document.body.scrollHeight, document.documentElement.scrollHeight,
        document.body.offsetHeight, document.documentElement.offsetHeight,
        document.body.clientHeight, document.documentElement.clientHeight
      )
    }
    const calculateScrollDistance = () => {
      const scrollTop = window.pageYOffset;
      const winHeight = window.innerHeight;
      const docHeight = getDocHeight();
      const totalDocScrollLength = docHeight - winHeight;

      const scrollPosition = Math.floor(scrollTop / totalDocScrollLength * 100);
      setScrollPosition(scrollPosition);
    }
    const handleScroll = (event) => {
      requestAnimationFrame(() => {
        calculateScrollDistance();
      });
    }
    document.addEventListener('scroll', handleScroll);

    return () => {
      document.removeEventListener('scroll', handleScroll);
    }
  }, [])

  return (
    <div className="home-container">
      <Progress scroll={scrollPosition}/>
      <h1>Productos destacados</h1>
        <div className='products-container'>
        {PRODUCTS.map((product) => (
          <Card product={product} key={product.id} onSelect={onHandlerSelect}/>
        ))}
      </div>
    </div>
  );
}

export default Home;

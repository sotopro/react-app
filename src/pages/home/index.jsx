import React, { useEffect, useState, useContext } from 'react';
import './styles.css';
import { useNavigate } from 'react-router-dom';
import { Card, Loader, Progress, FilterMenuItem} from '../../components'
import { CartContext } from "../../context";

import {  getFirestore, collection, getDocs, query, where, limit} from 'firebase/firestore'


const Home = () => {
  const [loading, setLoading] = useState(true);
  const [scrollPosition, setScrollPosition] = useState(0);
  const [categories, setCategories] = useState([]);
  const { products, setProducts} = useContext(CartContext);
  const navigate = useNavigate();
  const onHandlerSelect = (product) => {  
    navigate(`/product/${product.id}`)
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
  }, []);

  useEffect(() => {
    setLoading(true);
    const db = getFirestore();
    const q = query(
      collection(db, 'products'), 
      limit(10)
      );

    const qcategories = query(
      collection(db, 'categories'),
      limit(10)
    );

    getDocs(q)
      .then((snapshot) => {
        if(snapshot.size === 0) {
          console.log('No hay resultados');
          setProducts([]);
        } else {
          const result = snapshot.docs.map((doc) => (doc.data()))
          setProducts(result);
        }
      })
      .catch((error) => {
        console.log(error)
      });

    getDocs(qcategories)
      .then((snapshot) => {
        if(snapshot.size === 0) {
          console.log('No hay resultados');
          setCategories([]);
        } else {
          const result = snapshot.docs.map((doc) => (doc.data()))
          setCategories(result);
        }
      })
      .catch((error) => {
        console.log(error)
      })
      .finally(() => {
        setLoading(false);
      })
  }, []);

  const onFilter = (id) => {
    setLoading(true);
    const db = getFirestore();
    const q = query(
      collection(db, 'products'),
      where('categoryId', '==', id),
      limit(10)
    );

    getDocs(q)
      .then((snapshot) => {
        if(snapshot.size === 0){
          console.log('No hay resultados');
          setProducts([]);
        } else {
          const result = snapshot.docs.map((doc) => (doc.data()))
          setProducts(result);
        }
      })
      .catch((error) => {
        console.log(error)
      })
      .finally(() => {
        setLoading(false);
      })
  };

  return (
    <div className="home-container">
      <Progress scroll={scrollPosition}/>
      {loading ? (
        <div className='loading-container'>
          <Loader />
        </div>
      ) : (
        <>
          <div className='filter-menu-container'>
            {categories && categories.map((category) => (
              <FilterMenuItem key={category.id} {...category} onFilter={onFilter} />
            ))}
          </div>
          <h1>Productos destacados</h1>
          <div className='products-container'>
          {products.map((product) => (
            <Card product={product} key={product.id} onSelect={onHandlerSelect}/>
          ))}
          </div>
        </>
      )}
      
    </div>
  );
}

export default Home;

import React, { useEffect, useState, useContext } from 'react';
import './styles.css';
import { useNavigate } from 'react-router-dom';
import { Card, Loader, Progress, FilterMenuItem} from '../../components'
import { CartContext } from "../../context";
import { firebaseServices } from '../../services';

const { getProducts, getCategories, getProductsByCategory } = firebaseServices

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
    const getData = async () => {
      try {
        setLoading(true);
        const allProducts = await getProducts();
        const allCategories = await getCategories();
        setProducts(allProducts);
        setCategories(allCategories);
      } catch (error) {
        console.log(error);
      }
    finally {
      setLoading(false);
    }
  }
    getData();
  }, []);

  const onFilter = async (id) => {
    const filterByCategory = await getProductsByCategory(id);
    setProducts(filterByCategory);
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

import React, { useState, useEffect } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import ProductList from './components/ProductList';
import CartModal from './components/CartModal';

function App() {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch('https://fakestoreapi.com/products')
      .then(res => res.json())
      .then(data => setProducts(data))
      .catch(error => console.error('Error fetching products:', error));
  }, []);

  const addToCart = (product) => {
    setCart(prevCart => {
      if (!prevCart.find(item => item.id === product.id)) {
        return [...prevCart, { ...product, quantity: 1 }];
      }
      return prevCart;
    });
  };

  const removeFromCart = (productId) => {
    setCart(prevCart => prevCart.filter(item => item.id !== productId));
  };

  const openCart = () => {
    navigate('/cart');
  };

  return (
    <div className="App">
      <Navbar cartCount={cart.length} onCartClick={openCart} />
      
      <Routes>
        <Route 
          path="/" 
          element={
            <ProductList 
              products={products} 
              onAddToCart={addToCart} 
              cartItems={cart}
            />
          } 
        />
        <Route 
          path="/cart" 
          element={
            <CartModal
              cart={cart}
              onClose={() => navigate('/')}
              onRemoveFromCart={removeFromCart}
            />
          } 
        />
      </Routes>
    </div>
  );
}

export default App;

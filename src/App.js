
import React, { useState } from 'react';
import axios from 'axios';
import './App.css';
import Headphone1 from './img/Headphone-3.jpg';
import Headphone2 from './img/headphone-5.jpeg';
import Watch1 from './img/watch-2.jpg';

const PAGE_PRODUCTS ='products';
const PAGE_CART = 'cart';

function App() {
  const [cart, setCart] = useState([]);
  const [page, setPage] = useState('PAGE_PRODUCTS');

  const [products] = useState([
      {
        image: Headphone1,
        name: 'Black Headphone',
        cost: 300
      },
      {
        image: Headphone2,
        name: 'Grey Headphone',
        cost: 300
      },
      {
        image: Watch1,
        name: 'Black Smart Watch',
        cost: 209.99
      },
    ]);
  
  const addToCart = (product) =>{
    let newCart =[...cart];
    let itemInCart = cart.find((item) => product.name ===item.name);
    
    if (itemInCart){
      itemInCart.quantity++;
    }
    else{
      itemInCart ={
        ...product,quantity:1,
      }
      newCart.push(itemInCart);
    }
    setCart(newCart);
  };
  const removeFromCart = (productToRemove) =>{
    setCart(cart.filter(product => product !== productToRemove));
  };
  const clearCart = () =>{
    setCart([]);
  };

  const getTotalSum = () =>{
    return cart.reduce((sum, {cost, quantity}) => sum + cost * quantity,0);
  };

  const setQuantity = (product, amount) =>{
    const newCart = [...cart];
    newCart.find(item => item.name ===product.name).quantity = amount;
    setCart(newCart);
  };
   const navigateTo =(nextPage) =>{
    setPage(nextPage);
   };


 // const increaseCount = () =>{
 //  const [quantity, setCount] = useState(0);
 // }

  const renderProducts = () =>(
    <> 
      <h1>Products</h1>
        <div className="product">
          {products.map((product, idx) => (
              <div key={idx}>
                <img src={product.image} alt={product.name} />
                <h3>{product.name}</h3>
                <h4>${product.cost}</h4>
                <button className="btn btn-2" onClick={() => addToCart(product)}>Add to Cart</button>
              </div>
            ))}
        </div>
        </>
      );

   const renderCart = () =>(
    <> 
      <h1>Cart</h1>
      <div>Total Cost: ${getTotalSum()} </div>
      {cart.length > 0 && (
          <button className="btn btn-2" onClick={() => clearCart()}>Clear Cart</button>
          )}
        <div className="product">
          {cart.map((product, idx) => (
              <div key={idx}>
                <img src={product.image} alt={product.name} />
                <h3>{product.name}</h3>
                <h4>${product.cost}</h4>
                <button className="inc">+</button><input value={product.quantity} onChange={(e) =>setQuantity(product, parseInt(e.target.value))} /><button className="inc">-</button>
                <div>
                  <button className="btn btn-2" onClick={() => removeFromCart(product)}>Remove</button>
                </div>
              </div>
            ))}
        </div> 
        </>
  );

const getCartTotal = () =>{
  return cart.reduce ((sum, {quantity}) => sum + quantity,0);
};

  return (
      <div className="App">
      <header>
        <button className="btn btn-1" onClick={() => navigateTo(PAGE_CART)}>Go to Cart ({getCartTotal()})</button>
        <button className="btn btn-1" onClick={() => navigateTo(PAGE_PRODUCTS)}>View Products</button>
      </header>
      {page === PAGE_PRODUCTS && renderProducts()}
      {page === PAGE_CART && renderCart()}

      </div>
      );
}


export default App;



import React from "react";
import { useAppContext } from "../contexts/AppContext";

const Cart: React.FC = () => {
  const { cart, removeFromCart, clearCart } = useAppContext();

  return (
    <div className="container mt-5">
      <h1>Shopping Cart</h1>
      {cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <div>
          <ul className="list-group">
            {cart.map((product) => (
              <li key={product.id} className="list-group-item d-flex justify-content-between">
                <span>{product.name} - ${product.price}</span>
                <button 
                  className="btn btn-danger btn-sm"
                  onClick={() => removeFromCart(product.id)}
                >
                  Remove
                </button>
              </li>
            ))}
          </ul>
          <button className="btn btn-warning mt-3" onClick={clearCart}>
            Clear Cart
          </button>
        </div>
      )}
    </div>
  );
};

export default Cart;

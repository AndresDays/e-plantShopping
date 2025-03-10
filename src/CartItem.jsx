import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeItem, updateQuantity } from './CartSlice';
import './CartItem.css';

const CartItem = ({ onContinueShopping }) => {
  const cart = useSelector(state => state.cart.items);
  const dispatch = useDispatch();

  const calculateTotalAmount = () => {
    let total = 0;
    cart.forEach(item => {
      const quantity = item.quantity;
      const cost = parseFloat(item.cost.replace('$', '')); // Asegurarse de que el costo esté correctamente procesado
      total += quantity * cost;
    });
    return total.toFixed(2);
  };

  const handleContinueShopping = () => {
    if (onContinueShopping) onContinueShopping(); // Asegúrate de que la función se pasa correctamente
  };

  const handleCheckoutShopping = () => {
    alert('Funcionalidad a agregar para referencia futura');
  };

  const handleIncrement = (item) => {
    dispatch(updateQuantity({ id: item.id, quantity: item.quantity + 1 }));
  };

  const handleDecrement = (item) => {
    if (item.quantity > 1) {
      dispatch(updateQuantity({ id: item.id, quantity: item.quantity - 1 }));
    } else {
      dispatch(removeItem(item.id)); // Eliminamos el item si la cantidad llega a 1 y se quiere decrementar
    }
  };

  const handleRemove = (item) => {
    dispatch(removeItem(item.id)); // Pasamos solo el id para eliminar el item
  };

  const calculateTotalCost = (item) => {
    const quantity = item.quantity;
    const cost = parseFloat(item.cost.replace('$', '')); // Asegurarse de que el costo esté correctamente procesado
    return (quantity * cost).toFixed(2);
  };

  return (
    <div className="cart-container">
      <h2 style={{ color: 'black' }}>Total Cart Amount: ${calculateTotalAmount()}</h2>
      <div>
        {cart.map(item => (
          <div className="cart-item" key={item.id}>
            <img className="cart-item-image" src={item.image} alt={item.name} />
            <div className="cart-item-details">
              <div className="cart-item-name">{item.name}</div>
              <div className="cart-item-cost">{item.cost}</div>
              <div className="cart-item-quantity">
                <button className="cart-item-button cart-item-button-dec" onClick={() => handleDecrement(item)}>-</button>
                <span className="cart-item-quantity-value">{item.quantity}</span>
                <button className="cart-item-button cart-item-button-inc" onClick={() => handleIncrement(item)}>+</button>
              </div>
              <div className="cart-item-total">Total: ${calculateTotalCost(item)}</div>
              <button className="cart-item-delete" onClick={() => handleRemove(item)}>Delete</button>
            </div>
          </div>
        ))}
      </div>
      <div style={{ marginTop: '20px', color: 'black' }} className='total_cart_amount'></div>
      <div className="continue_shopping_btn">
        <button className="get-started-button" onClick={handleContinueShopping}>Continue Shopping</button>
        <br />
        <button className="get-started-button1" onClick={handleCheckoutShopping}>Checkout</button>
      </div>
    </div>
  );
};

export default CartItem;

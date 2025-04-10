import { useEffect } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { useLazyQuery } from '@apollo/client';
import { QUERY_CHECKOUT } from '../../utils/queries';
import { idbPromise } from '../../utils/helpers';
import CartItem from '../CartItem';
import Auth from '../../utils/auth';
import { useStoreContext } from '../../utils/GlobalState';
import { TOGGLE_CART, ADD_MULTIPLE_TO_CART } from '../../utils/actions';
import './style.css';

// stripePromise returns a promise with the stripe object as soon as the Stripe package loads
const stripePromise = loadStripe('pk_test_51RA1sCROcOxKW9HecxPxVWV09jO1lgz7jEt0Y8uTnGFzeGlUIinFngRdqPMJOVevteKaqztdNMsdHMqZTnebZmxK00LsEEQoXl');

const Cart = () => {
  const [state, dispatch] = useStoreContext();
  const [getCheckout, { data }] = useLazyQuery(QUERY_CHECKOUT);

  // We check to see if there is a data object that exists, if so this means that a checkout session was returned from the backend
  // Then we should redirect to the checkout with a reference to our session id
  useEffect(() => {
    if (data) {
      stripePromise.then((res) => {
        res.redirectToCheckout({ sessionId: data.checkout.session });
      });
    }
  }, [data]);

  // If the cart's length or if the dispatch function is updated, check to see if the cart is empty.
  // If so, invoke the getCart method and populate the cart with the existing from the session
  useEffect(() => {
    async function getCart() {
      const cart = await idbPromise('cart', 'get');
      dispatch({ type: ADD_MULTIPLE_TO_CART, inventions: [...cart] });
    }

    if (!state.cart.length) {
      getCart();
    }
  }, [state.cart.length, dispatch]);

  function toggleCart() {
    dispatch({ type: TOGGLE_CART });
  }

  function calculateTotal() {
    let sum = 0;
    state.cart.forEach((item) => {
      sum += item.price * item.purchaseQuantity;
    });
    return sum.toFixed(2);
  }

  // When the submit checkout method is invoked, loop through each item in the cart
  // Add each item id to the productIds array and then invoke the getCheckout query passing an object containing the id for all our products
  function submitCheckout() {
    console.log(...state.cart);
    getCheckout({
      variables: { 
        inventions: [...state.cart],
      },
    });
  }

  if (!state.cartOpen) {
    return (
      <div className="cart-closed" onClick={toggleCart}>
        <img src='https://images.emojiterra.com/google/noto-emoji/unicode-15/bw/512px/1f6d2.png' />
      </div>
    );
  }

  return (
    <div className="cart">
      <div className="close" onClick={toggleCart}>
        [close]
      </div>
      <h3>Shopping Cart</h3>
      {state.cart.length ? (
        <div className='cartContainer'>
          {state.cart.map((item) => (
            <CartItem key={item._id} item={item} />
          ))}

          <div className="checkoutContainer">
            <strong>Total: ${calculateTotal()}</strong>

            {/* Check to see if the user is logged in. If so render a button to check out */}
            {Auth.loggedIn() ? (
              <button onClick={submitCheckout}>Checkout</button>
            ) : (
              <span>(login to checkout)</span>
            )}
          </div>
        </div>
      ) : (
        <h4>
          No Items In Cart!
        </h4>
      )}
    </div>
  );
};

export default Cart;

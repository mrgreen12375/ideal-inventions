import { Link } from 'react-router-dom';
// import { pluralize } from '../../utils/helpers';
// import { useDispatch, useSelector } from 'react-redux';
// import { ADD_TO_CART, UPDATE_CART_QUANTITY } from '../../utils/actions';
// import { idbPromise } from '../../utils/helpers';

function InventionItem({invention}) {
  // const dispatch = useDispatch();
  // const state = useSelector((state) => state);

  // const { _id, name, image, price, inventory } = invention;

  // const { cart } = state;

  // const addToCart = () => {
  //   const itemInCart = cart.find((cartItem) => cartItem._id === _id);
  //   if (itemInCart) {
  //     dispatch({
  //       type: UPDATE_CART_QUANTITY,
  //       _id: _id,
  //       purchaseQuantity: parseInt(itemInCart.purchaseQuantity) + 1,
  //     });
  //     idbPromise('cart', 'put', {
  //       ...itemInCart,
  //       purchaseQuantity: parseInt(itemInCart.purchaseQuantity) + 1,
  //     });
  //   } else {
  //     dispatch({
  //       type: ADD_TO_CART,
  //       product: { ...item, purchaseQuantity: 1 },
  //     });
  //     idbPromise('cart', 'put', { ...item, purchaseQuantity: 1 });
  //   }
  // };

  console.log("check", invention)

  return (
    <div className='card'> 
      <Link to={`/invention/${invention._id}`}>
        <h3>{invention.name}</h3>
        <img src={`${invention.image}`} />
      </Link>
      <div>
        <div>
          {invention.inventory} in stock
        </div>
        <span>${invention.price}</span>
      </div>
      <button>Add to cart</button>
    </div>
  );
}

export default InventionItem;

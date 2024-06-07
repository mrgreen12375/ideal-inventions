import { Link } from "react-router-dom";
import { pluralize } from "../../utils/helpers"
import { useStoreContext } from "../../utils/GlobalState";
import { ADD_TO_CART, UPDATE_CART_QUANTITY } from "../../utils/actions";
import { idbPromise } from "../../utils/helpers";

function InventionItem(item) {

  const [state, dispatch] = useStoreContext();

  const {
    image,
    name,
    _id,
    price,
    inventory
  } = item;

  const { cart } = state

  const addToCart = () => {
    const itemInCart = cart.find((cartItem) => cartItem._id === _id)
    if (itemInCart) {
      dispatch({
        type: UPDATE_CART_QUANTITY,
        _id: _id,
        purchaseQuantity: parseInt(itemInCart.purchaseQuantity) + 1
      });
      idbPromise('cart', 'put', {
        ...itemInCart,
        purchaseQuantity: parseInt(itemInCart.purchaseQuantity) + 1
      });
    } else {
      dispatch({
        type: ADD_TO_CART,
        product: { ...item, purchaseQuantity: 1 }
      });
      idbPromise('cart', 'put', { ...item, purchaseQuantity: 1 });
    }
  }

  console.log("check", item)

  return (
    <div className='card'> 
      <Link to={`/invention/${_id}`}>
        <h3>{name}</h3>
        <img src={`${image}`} />
      </Link>
      <div className='cost'>
        <div>
          <h4 className='stock'>{inventory} {pluralize("item", inventory)} in stock</h4>
          <h4>${price}</h4>
        </div>
        <div>
          <button onClick={addToCart}>Add to cart</button>
        </div>
      </div>
    </div>
  );
}

export default InventionItem;

import { Link } from 'react-router-dom';
// import { pluralize } from '../../utils/helpers';
// import { useDispatch, useSelector } from 'react-redux';
// import { ADD_TO_CART, UPDATE_CART_QUANTITY } from '../../utils/actions';
// import { idbPromise } from '../../utils/helpers';

function InventionItem({invention}) {

  console.log("check", invention)

  return (
    <div className='card'> 
      <Link to={`/invention/${invention._id}`}>
        <h3>{invention.name}</h3>
        <img src={`${invention.image}`} />
      </Link>
      <div className='cost'>
        <div>
          <h4 className='stock'>{invention.inventory} in stock</h4>
          <h4>${invention.price}</h4>
        </div>
        <div>
          <button>Add to cart</button>
        </div>
      </div>
    </div>
  );
}

export default InventionItem;

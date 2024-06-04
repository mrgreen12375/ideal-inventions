import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { QUERY_DETAILS } from '../utils/queries';

function Detail() {

  const { id } = useParams();
  const { loading, data } = useQuery(QUERY_DETAILS, {
    variables: { id },
  });

  const [currentProduct, setCurrentProduct] = useState(id);

  useEffect(() => {
    if (data) {
      setCurrentProduct(data.invention);
    }
  }, [data]);

  console.log(data);

  return (
        <>
    {currentProduct ? (
    <div className='detailsCard'> 
      <div className='back'>
        <Link to="/">← Back to Inventions</Link>
      </div>
      <h2>Order Details</h2>
      <h3>{currentProduct.name}</h3>
      <div className='center'>
        <h4>{currentProduct.description}</h4>
      </div>
      <img src={`${currentProduct.image}`} />
      <div className='detailsCost'>
        <div>
          <h4 className='stock'>{currentProduct.inventory} in stock</h4>
          <h4>${currentProduct.price}</h4>
        </div>
        <div>
          <button>Add to cart</button>
        </div>
      </div>
    </div>) : null}
    {loading ? <p>Loading</p> : null}

</>
  );
}

export default Detail;

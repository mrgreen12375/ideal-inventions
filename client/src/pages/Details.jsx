import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { QUERY_DETAILS } from '../utils/queries';

function Detail() {

  const { id } = useParams();
  const { loading, data } = useQuery(QUERY_DETAILS, {
    variables: { id },
  });

  const [currentInvention, setCurrentInvention] = useState(id);

  useEffect(() => {
    if (data) {
      setCurrentInvention(data.invention);
    }
  }, [data]);

  return (
        <>
    {currentInvention ? (
    <div className='detailsCard'> 
      <div className='back'>
        <Link to="/">← Back to Inventions</Link>
      </div>
      <h2>Invention Details</h2>
      <h3>{currentInvention.name}</h3>
      <div className='center'>
        <h4>{currentInvention.description}</h4>
      </div>
      <img src={`${currentInvention.image}`} />
      <div className='detailsCost'>
        <div>
          <h4 className='stock'>{currentInvention.inventory} in stock</h4>
          <h4>${currentInvention.price}</h4>
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

import { Link } from 'react-router-dom';

import { useQuery } from '@apollo/client';
import { QUERY_USER } from '../utils/queries';

function History() {
  const { data } = useQuery(QUERY_USER);
  let user;

  if (data) {
    user = data?.users;
  }
  console.log(user)
  return (
    <>
      <div className="historyCard">
        <div className='back'>
          <Link to="/">← Back to Inventions</Link>
        </div>
        {user ? (
          <>
            <h2>
              Order History
            </h2>
            {user.history.map((order) => (
              <div key={order._id}>
                <h3>
                  {new Date(parseInt(order.purchaseDate)).toLocaleDateString()}
                </h3>
                <div >
                  {order.inventions.map(({ _id, image, name, price }, index) => (
                    <div key={index} className="historyDetails">
                      <Link to={`/invention/${_id}`}>
                        <img alt={name} src={`${image}`} />
                        <p>{name}</p>
                        <p>${price}</p>
                      </Link>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </>
        ) : null}
      </div>
    </>
  );
}

export default History;

import { useEffect } from 'react';
import { useStoreContext } from '../../utils/GlobalState';
import { UPDATE_INVENTIONS } from '../../utils/actions';
import { useQuery } from '@apollo/client';
import { idbPromise } from '../../utils/helpers';
import InventionItem from '../InventionItem';
import { QUERY_INVENTION } from '../../utils/queries';

function InventionList() {

  const [ state, dispatch] = useStoreContext();

  const { currentInvention } = state;


  const { loading, data } = useQuery(QUERY_INVENTION);

  useEffect(() => {
    if (data) {
      dispatch({
        type: UPDATE_INVENTIONS,
        inventions: data.inventions,
      });
      data.inventions.forEach((inventions) => {
        idbPromise('inventions', 'put', inventions);
      });
    } else if (!loading) {
      idbPromise('inventions', 'get').then((inventions) => {
        dispatch({
          type: UPDATE_INVENTIONS,
          inventions: inventions,
        });
      });
    }
  }, [data, loading, dispatch]);

  function filterInventions() {
    if (!currentInvention) {
      return state.inventions;
    }

    return state.inventions.filter(
      (inventions) => inventions._id === currentInvention
    );
  }

  return (
    <div>
      <h2>Shop Inventions</h2>
      {state.inventions.length ? (
        <div className="inventionList">
          {filterInventions().map((inventions) => (
            <InventionItem
              key={inventions._id}
              _id={inventions._id}
              image={inventions.image}
              name={inventions.name}
              price={inventions.price}
              inventory={inventions.inventory}
            />
          ))}
        </div>
      ) : (
        <h3>You haven't added any products yet!</h3>
      )}
      {loading ? <p>loading...</p> : null}
    </div>
  );
}

export default InventionList;

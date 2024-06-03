
import InventionItem from '../InventionItem';
import { useQuery } from '@apollo/client';
import { QUERY_INVENTION } from '../../utils/queries';

function InventionList() {
  const { loading, data } = useQuery(QUERY_INVENTION);
  const invention = data.inventions || [];

  console.log(invention)
  return (
    <div className='inventionList'>
        <div>
            {invention.map((invention) => (
              <InventionItem key={invention._id} invention={invention} />
            ))}
        </div>
      {loading ? <p>Loading</p> : null}
    </div>
  );
}

export default InventionList;

import { useEffect } from 'react';
import { useMutation } from '@apollo/client';
import Jumbotron from '../components/Jumbotron';
import { ADD_HISTORY } from '../utils/mutations';
import { idbPromise } from '../utils/helpers';

function Success() {
  const [addHistory] = useMutation(ADD_HISTORY);

  useEffect(() => {
    async function saveOrder() {
      const cart = await idbPromise('cart', 'get');
      const inventions = cart.map((item) => item._id);

      if (inventions.length) {
        const { data } = await addHistory({ variables: { inventions } });
        console.log(data);
        const inventionData = data.addHistory.inventions;

        console.log(data)

        inventionData.forEach((item) => {
          idbPromise('cart', 'delete', item);
        });
      }

      setTimeout(() => {
        window.location.replace('/');
      }, 3000);
    }

    saveOrder();
  }, [addHistory]);

  return (
    <div>
      <Jumbotron>
        <h1>Success!</h1>
        <h2>Thank you for your purchase!</h2>
        <h2>You will now be redirected to the home page</h2>
      </Jumbotron>
    </div>
  );
}

export default Success;

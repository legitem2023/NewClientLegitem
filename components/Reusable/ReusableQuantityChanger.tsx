import { FC, useState, useEffect } from 'react';
import { PropsQuantity } from '@/types';
import { useDispatch } from 'react-redux';
import { changeQuantity } from 'Redux/cartSlice'; 

const ReusableQuantityChanger: FC<PropsQuantity> = ({ id, qty }) => {
  const [quantity, setQuantity] = useState(qty);
  const dispatch = useDispatch();

  // Trigger changeQuantity dispatch whenever quantity is updated
  useEffect(() => {
    dispatch(changeQuantity({ id, quantity }));
  }, [quantity, id, dispatch]);

  const increaseQuantity = () => {
    setQuantity((prevQuantity) => prevQuantity + 1);
  };

  const decreaseQuantity = () => {
    setQuantity((prevQuantity) => (prevQuantity > 1 ? prevQuantity - 1 : 1));
  };

  return (
    <div className="QtyChanger">
      <button
        onClick={decreaseQuantity}
        className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-lime-500"
      >
        -
      </button>
      <span className="text-xl font-semibold">{quantity}</span>
      <button
        onClick={increaseQuantity}
        className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-lime-500"
      >
        +
      </button>
    </div>
  );
};

export default ReusableQuantityChanger;

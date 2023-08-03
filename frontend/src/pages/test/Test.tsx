import {
  increment,
  decrement,
  reset,
} from '@src/reducers/counter/counterSlice';
import { useAppSelector, useAppDispatch } from '@src/reducers/hooks';

export default function Test() {
  const { count } = useAppSelector((state) => state.counter);
  const dispatch = useAppDispatch();

  const incrementCount = () => {
    dispatch(increment(count + 1));
  };
  const decrementCount = () => {
    dispatch(decrement(count - 1));
  };
  const resetCount = () => {
    dispatch(reset(0));
  };
  return (
    <div>
      <h1> {count}</h1>
      <button onClick={incrementCount}>Increment</button>
      <button onClick={decrementCount}>Decrement</button>
      <button onClick={resetCount}>Reset</button>
    </div>
  );
}

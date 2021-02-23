import { combineReducers } from 'redux';
import counter from 'features/counter/counterSlice';
import stock from 'features/stock/stockSlice';

const root = combineReducers({
  counter,
  stock
});

export default root;

import { combineReducers } from 'redux';
import counter from '../features/counter/counterSlice';

const root = combineReducers({
  counter
});

export default root;

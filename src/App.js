import React from 'react';
import Stock from './features/stock/Stock';
import './App.scss';

function App() {
  return (
    <div className="App">
      <Stock />
      <div className="attribution">
        <div>Icons made by <a href="https://www.freepik.com" title="Freepik">Freepik</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a></div>
        <div>Icons made by <a href="https://www.flaticon.com/authors/google" title="Google">Google</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a></div>
      </div>
    </div>
  );
}

export default App;

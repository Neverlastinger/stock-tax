import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addStock } from './stockSlice';
import SingleStock from './SingleStock';
import InputField from 'components/InputField/InputField';
import stockIcon from 'assets/money-graph-with-up-arrow.svg';
import styles from './Stock.module.scss';

const Stock = () => {
  const dispatch = useDispatch();
  const stocks = useSelector((state) => state.stock);
  const [stockValue, setStockValue] = useState('');

  const onStockAdd = () => {
    dispatch(addStock(stockValue));
    setStockValue('');
  };

  return (
    <div className={styles.wrapper}>
      <InputField
        placeholder="Stock name"
        icon={stockIcon}
        value={stockValue}
        onChange={(e) => { setStockValue(e.target.value); }}
        onEnter={onStockAdd}
      />

      <ul className={styles.stockList}>
        {Object.keys(stocks).map((stockName) => (
          <SingleStock stockName={stockName} key={stockName} />
        ))}
      </ul>
    </div>
  );
};

export default Stock;

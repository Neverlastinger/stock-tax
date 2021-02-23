import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCurrencyData } from 'api';
import { addTransaction, removeStock, removeTransaction, selectStockSummary } from './stockSlice';
import Select from 'components/Select';
import Button from 'components/Button/Button';
import ActionLink from 'components/ActionLink/ActionLink';
import InputField from 'components/InputField/InputField';
import dollarIcon from 'assets/dollar.svg';
import dateIcon from 'assets/calendar.svg';
import countIcon from 'assets/one.svg';
import styles from './Stock.module.scss';

const TRANSACTION_INITIAL_STATE = {
  type: 'buy',
  count: '',
  price: '',
  date: '',
};

const dateToAPIDate = (date) => {
  const [month, day, year] = date.split('/');
  return `${year}-${month}-${day}`;
};

const dateToNapDate = (date) => {
  const [month, day, year] = date.split('/');
  return `${day}.${month}.${year}`;
};

const SingleStock = ({ stockName }) => {
  const dispatch = useDispatch();
  const transactionList = useSelector((state) => state.stock[stockName]);
  const stockSummary = useSelector((state) => selectStockSummary(state.stock, stockName));

  const [transaction, setTransaction] = useState(TRANSACTION_INITIAL_STATE);

  const onTransactionAdd = async () => {
    if (!transaction.date || !transaction.price || !transaction.count) {
      return;
    }

    const { rates } = await fetchCurrencyData(dateToAPIDate(transaction.date));

    dispatch(addTransaction({
      stock: stockName,
      transaction: {
        ...transaction,
        priceBgn: transaction.price * rates.BGN
      }
    }));

    setTransaction(TRANSACTION_INITIAL_STATE);
  };

  const onRemoveStock = () => {
    dispatch(removeStock(stockName));
  };

  const onRemoveTransaction = (index) => {
    dispatch(removeTransaction({
      stock: stockName,
      index
    }));
  };

  return (
    <li>
      <div className={styles.title}>
        {stockName}

        <ActionLink
          label="Remove"
          onClick={onRemoveStock}
        />
      </div>

      {transactionList.length > 0 && (
        <>
          <h2>Транзакции:</h2>

          <table>
            <tbody>
              {transactionList.map((item, index) => (
                <tr key={item.date}>
                  <td>{item.type}</td>
                  <td>{item.date}</td>
                  <td>${item.price}</td>
                  <td>{item.priceBgn.toFixed(2)} лв.</td>
                  <td>{item.count} stocks</td>
                  <td><ActionLink label="Remove" onClick={() => { onRemoveTransaction(index); }} /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      )}

      {stockSummary.taxSells.length > 0 && (
        <>
          <h2>За деклариране в Приложение 5 на НАП (продажба на акции):</h2>

          <table>
            <thead>
              <tr>
                <th>дата</th>
                <th>Продажна цена</th>
                <th>(USD)</th>
                <th>Цена на придобиване</th>
                <th>(USD)</th>
                <th>(Средна цена на акция)</th>
              </tr>
            </thead>
            <tbody>
              {stockSummary.taxSells.map((item) => (
                <tr key={item.sell.date}>
                  <td><strong>{dateToNapDate(item.sell.date)}</strong></td>
                  <td><strong>{item.sell.priceBgn.toFixed(2)}</strong></td>
                  <td>{item.sell.price.toFixed(2)}</td>
                  <td><strong>{item.taxBuyPriceBgn.toFixed(2)}</strong></td>
                  <td>{item.taxBuyPrice.toFixed(2)}</td>
                  <td>${item.avgPrice.toFixed(2)} [{item.avgPriceBgn.toFixed(2)} лв.]</td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      )}

      {stockSummary.currentHolding && (
        <>
          <h2>Притежавани в момента:</h2>
          <div className={styles.currentHolding}>
            Текуща средна цена: <strong>{stockSummary.currentHolding.avgPrice.toFixed(2)}</strong>, Текущ брой дялове: <strong>{stockSummary.currentHolding.count}</strong>
          </div>
        </>
      )}

      <div className={styles.transaction}>
        <Select
          className={styles.select}
          label="buy / sell"
          onValueSelected={(value) => { setTransaction((state) => ({ ...state, type: value })); }}
          value={transaction.type}
          options={[
            {
              value: 'buy',
              label: 'buy'
            },
            {
              value: 'sell',
              label: 'sell'
            }
          ]}
        />
        <InputField
          placeholder="Брой акции"
          icon={countIcon}
          className={styles.inputFieldWrapper}
          value={transaction.count}
          onChange={(e) => { setTransaction((state) => ({ ...state, count: e.target.value })); }}
        />
        <InputField
          placeholder={`[USD] Цена на ${transaction.type === 'buy' ? 'придобиване' : 'продажба'}`}
          icon={dollarIcon}
          className={styles.inputFieldWrapper}
          value={transaction.price}
          onChange={(e) => { setTransaction((state) => ({ ...state, price: e.target.value.replace(/,/g, '') })); }}
        />
        <InputField
          placeholder="MM/DD/YYYY дата"
          icon={dateIcon}
          className={styles.inputFieldWrapper}
          value={transaction.date}
          onChange={(e) => { setTransaction((state) => ({ ...state, date: e.target.value })); }}
        />

        <Button
          label="Add"
          theme="primary"
          onClick={onTransactionAdd}
        />
      </div>
    </li>
  );
};

export default SingleStock;

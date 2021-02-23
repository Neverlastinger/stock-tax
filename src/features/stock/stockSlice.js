import { createSlice } from '@reduxjs/toolkit';

export const stockSlice = createSlice({
  name: 'stock',
  initialState: {},
  reducers: {
    addStock: (state, action) => {
      state[action.payload] = [];
    },
    removeStock: (state, { payload }) => {
      delete state[payload];
    },
    addTransaction: (state, { payload }) => {
      state[payload.stock].push(payload.transaction);
    },
    removeTransaction: (state, { payload }) => {
      state[payload.stock].splice(payload.index, 1);
    }
  },
});

export const selectStockSummary = (state, stockName) => {
  const transactions = state[stockName].map((item) => ({
    ...item,
    price: Number(item.price),
    priceBgn: Number(item.priceBgn),
    count: Number(item.count),
    realDate: new Date(item.date)
  })).sort((t1, t2) => (
    t1 < t2 ? -1 : 1
  ));

  const taxSells = [];
  let currentHolding = null;

  let price = 0;
  let priceBgn = 0;
  let count = 0;

  for (let i = 0; i < transactions.length; i += 1) {
    if (transactions[i].type === 'buy') {
      price += transactions[i].price;
      priceBgn += transactions[i].priceBgn;
      count += transactions[i].count;
    }
    if (transactions[i].type === 'sell') {
      const avgPrice = price / count;
      const avgPriceBgn = priceBgn / count;
      const taxBuyPrice = avgPrice * transactions[i].count;
      const taxBuyPriceBgn = avgPriceBgn * transactions[i].count;

      taxSells.push({
        avgPrice,
        avgPriceBgn,
        taxBuyPrice,
        taxBuyPriceBgn,
        sell: transactions[i]
      });

      count -= transactions[i].count;
      price = avgPrice * count;
      priceBgn = avgPriceBgn * count;
    }
  }

  if (count > 0) {
    const avgPrice = price / count;

    currentHolding = {
      avgPrice,
      count,
      current: true
    };
  }

  return {
    taxSells,
    currentHolding
  };
};

export const { addStock, removeStock, addTransaction, removeTransaction } = stockSlice.actions;

export default stockSlice.reducer;

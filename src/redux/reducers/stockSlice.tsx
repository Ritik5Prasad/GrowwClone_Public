import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../store";

interface StockState {
  stocks: object[];
  holdings: object[];
}

const initialState: StockState = {
  stocks: [],
  holdings: [],
};

export const stockSlice = createSlice({
  name: "stock",
  initialState,
  reducers: {
    setStocks: (state, action: PayloadAction<object[]>) => {
      state.stocks = action.payload;
    },
    setHoldings: (state, action: PayloadAction<object[]>) => {
      state.holdings = action.payload;
    },
  },
});

export const { setStocks, setHoldings } = stockSlice.actions;

export const selectStocks = (state: RootState) => state.stock.stocks;
export const selectHoldings = (state: RootState) => state.stock.holdings;

export default stockSlice.reducer;

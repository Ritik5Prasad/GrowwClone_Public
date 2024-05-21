import { socketAxios } from "../apiConfig";
import { setHoldings, setStocks } from "../reducers/stockSlice";
import { navigate, resetAndNavigate } from "../../utils/NavigationUtil";
import { refetchUser } from "./userAction";
import { formatPaisaWithCommas } from "../../utils/NumberUtils";

interface buyStockPayload {
  stock_id: string;
  quantity: number;
  amount: number;
  companyName: number;
}
interface sellStockPayload {
  holdingId: string;
  quantity: number;
  amount: number;
  companyName: number;
}

export const getAllStocks = () => async (dispatch: any) => {
  try {
    const res = await socketAxios.get("/stocks");
    await dispatch(setStocks(res.data.data));
  } catch (error: any) {
    console.log("GET STOCK ERROR ->", error);
  }
};

export const getStockBySymbol = (symbol: string) => async (dispatch: any) => {
  try {
    const res = await socketAxios.get(`/stocks/${symbol}`);
    return res.data.data;
  } catch (error: any) {
    console.log("GET STOCK ERROR ->", error);
    return null;
  }
};

export const buyStock = (payload: buyStockPayload) => async (dispatch: any) => {
  try {
    const res = await socketAxios.post(`/stocks/buy`, payload);

    navigate("TransactionSuccess", {
      msg: `Your investment of  ${formatPaisaWithCommas(
        payload.amount
      )} completed ${payload.companyName} `,
    });

    await dispatch(refetchUser());
  } catch (error: any) {
    console.log("BUY STOCK ERROR ->", error);
  }
};

export const sellStock =
  (payload: sellStockPayload) => async (dispatch: any) => {
    try {
      const res = await socketAxios.post(`/stocks/sell`, payload);
      navigate("TransactionSuccess", {
        msg: `Your holding got sold  ${formatPaisaWithCommas(
          payload.amount
        )}  ${payload.companyName} `,
      });

      await dispatch(refetchUser());
    } catch (error: any) {
      console.log("SELL STOCK ERROR ->", error);
    }
  };

export const getAllHoldings = () => async (dispatch: any) => {

  try {
    const res = await socketAxios.get(`/stocks/holding`);
    await dispatch(setHoldings(res.data.data));
  } catch (error: any) {
    console.log("GET HOLDING ERROR ->", error);
  }
};

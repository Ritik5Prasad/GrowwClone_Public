import FOIcon from "../assets/images/fo.svg";
import AllStocks from "../assets/images/allstocks.svg";
import IPOIcon from "../assets/images/ipo.svg";
import EventIcon from "../assets/images/events.svg";
import FOIconDark from "../assets/images/fno_dark.svg";
import AllStocksDark from "../assets/images/allstocks_dark.svg";
import IPOIconDark from "../assets/images/ipo_dark.svg";
import EventIconDark from "../assets/images/calendar_dark.svg";
import { RFValue } from "react-native-responsive-fontsize";

export const userPic = {
  pic: "https://i.pinimg.com/736x/98/58/74/9858745cd157f2797065e639c5b3bf23.jpg",
};
export const FnoIndexesData = [
  {
    id: 1,
    name: "NIFTY 50",
    symbol: "^NSEI",
    current_price: 22123.12,
    price_change: +124.12,
    percentage_change: "0.22%",
  },
  {
    id: 2,
    name: "BANK NIFTY",
    symbol: "^NSEBANK",
    current_price: 48500.23,
    price_change: -140.29,
    percentage_change: "0.12%",
  },
  {
    id: 3,
    name: "FINNIFTY",
    symbol: "^NSEFIN",
    current_price: 40500.42,
    price_change: +224.29,
    percentage_change: "0.34%",
  },
  {
    id: 4,
    name: "SENSEX",
    symbol: "^BSESN",
    current_price: 75000.24,
    price_change: -124.29,
    percentage_change: "0.24%",
  },
  {
    id: 5,
    name: "Button",
    symbol: "^NSEI",
    current_price: 22123.24,
    price_change: -124.29,
    percentage_change: "0.24%",
  },
];

export const mostBoughtData = [
  {
    id: 1,
    name: "Vodafone Idea",
    icon_url: "https://logo.clearbit.com/vodafoneidea.com",
    current_price: 14.12,
    price_change: +1.23,
    percentage_change: "0.22%",
  },
  {
    id: 2,
    name: "Tata Steel",
    icon_url: "https://logo.clearbit.com/tata.com",
    current_price: 165.8,
    price_change: -12.4,
    percentage_change: "0.22%",
  },
  {
    id: 3,
    icon_url: "https://logo.clearbit.com/irctc.com",
    name: "Indian Railway Catering & Tourism Corporation",
    current_price: 1044.12,
    price_change: +14.2,
    percentage_change: "23.21%",
  },
  {
    id: 4,
    name: "Zomato",
    icon_url: "https://logo.clearbit.com/zomato.com",
    current_price: 189.12,
    price_change: +14.2,
    percentage_change: "23.21%",
  },
];

export const Gainers = [
  ...mostBoughtData.slice(0, 3),
  {
    id: 4,
    name: "Gainers",
    icon_url: "https://logo.clearbit.com/zomato.com",
    current_price: 189.12,
    price_change: +14.2,
    percentage_change: "23.21%",
  },
];

export const Losers = [
  ...mostBoughtData.slice(0, 3),
  {
    id: 4,
    name: "Losers",
    icon_url: "https://logo.clearbit.com/zomato.com",
    current_price: 189.12,
    price_change: +14.2,
    percentage_change: "23.21%",
  },
];

export const ProductAndToolsData = [
  {
    id: 1,
    name: "F&O",
    light_icon: <FOIcon width={RFValue(30)} height={RFValue(30)} />,
    dark_icon: <FOIconDark width={RFValue(30)} height={RFValue(30)} />,
  },
  {
    id: 2,
    name: "Events",
    light_icon: <EventIcon width={RFValue(30)} height={RFValue(30)} />,
    dark_icon: <EventIconDark width={RFValue(30)} height={RFValue(30)} />,
  },
  {
    id: 3,
    name: "IPO",
    light_icon: <IPOIcon width={RFValue(30)} height={RFValue(30)} />,
    dark_icon: <IPOIconDark width={RFValue(30)} height={RFValue(30)} />,
  },
  {
    id: 4,
    name: "All Stocks",
    light_icon: <AllStocks width={RFValue(30)} height={RFValue(30)} />,
    dark_icon: <AllStocksDark width={RFValue(30)} height={RFValue(30)} />,
  },
];

export const holdingsData = [
  {
    id: 1,
    stock_name: "IRFC",
    invested: 24000.42,
    current: 35000.12,
    noOfShares: 100,
    dayReturn: 400.23,
    stockData: [11, 10.2, 11, 11, 11.2, 11.3, 12, 11, 11, 12, 12, 12, 10, 12],
  },
  {
    id: 2,
    stock_name: "Tata Steel",
    invested: 35000.42,
    current: 33000.12,
    noOfShares: 300,
    dayReturn: -600.43,
    stockData: [11, 10.2, 11, 10, 10, 10.3, 9.3, 9.4, 9.5, 9.4, 9, 9, 9, 9],
  },
];

export const watchlistData = [
  {
    id: 1,
    stock_name: "Vodafone Idea",
    current_price: 14.12,
    price_change: +21.23,
    percentage_change: "0.22%",
    stockData: [11, 10.2, 11, 11, 11.2, 11.3, 12, 11, 11, 12, 12, 12, 10, 12],
  },
  {
    id: 2,
    stock_name: "IRFC",
    current_price: 180.12,
    price_change: +54.23,
    percentage_change: "0.23%",
    stockData: [11, 12, 11, 11, 11.2, 11.3, 12, 11, 11, 13, 11, 10, 10, 12],
  },
  {
    id: 3,
    stock_name: "Tata Steel",
    current_price: 140.12,
    price_change: -11.23,
    percentage_change: "0.23%",
    stockData: [11, 10.2, 11, 11, 11.2, 11.3, 12, 11, 11, 12, 12, 12, 10, 12],
  },
  {
    id: 4,
    stock_name: "IREDA",
    current_price: 120.12,
    price_change: +12.23,
    percentage_change: "0.23%",
    stockData: [11, 10.2, 11, 11, 11.2, 11.3, 12, 11, 11, 12, 12, 12, 10, 12],
  },
  {
    id: 5,
    stock_name: "NTPC",
    current_price: 14.12,
    price_change: +21.23,
    percentage_change: "0.22%",
    stockData: [11, 10.2, 11, 11, 11.2, 11.3, 12, 11, 11, 12, 12, 12, 10, 12],
  },
  {
    id: 6,
    stock_name: "Rail Vikas Nigam",
    current_price: 180.12,
    price_change: +54.23,
    percentage_change: "0.23%",
    stockData: [11, 10.2, 11, 11, 11.2, 11.3, 12, 11, 11, 12, 12, 12, 10, 12],
  },
  {
    id: 7,
    stock_name: "PNB",
    current_price: 140.12,
    price_change: -11.23,
    percentage_change: "0.23%",
    stockData: [11, 10.2, 11, 11, 11.2, 11.3, 12, 11, 11, 12, 12, 12, 10, 12],
  },
  {
    id: 8,
    stock_name: "ITC",
    current_price: 120.12,
    price_change: +12.23,
    percentage_change: "0.23%",
    stockData: [11, 10.2, 11, 11, 11.2, 11.3, 12, 11, 11, 12, 12, 12, 10, 12],
  },
  {
    id: 9,
    stock_name: "Adani Green Energy",
    current_price: 1220.12,
    price_change: +132.23,
    percentage_change: "0.23%",
    stockData: [11, 10.2, 11, 11, 11.2, 11.3, 12, 11, 11, 12, 12, 12, 10, 12],
  },

];
export default {
  userPic,
  FnoIndexesData,
  holdingsData,
  mostBoughtData,
  watchlistData,
};

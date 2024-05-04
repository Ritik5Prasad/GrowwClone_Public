import React, { FC } from "react";
import CustomTab from "../../components/dashboard/CustomTab";
import StockHeader from "../../components/stocks/StockHeader";
import Explore from "../../components/stocks/Explore";
import Holdings from "../../components/stockholdings/Holdings";
import WatchList from "../../components/watchlist/WatchList";
import AddWatchlist from "../../components/watchlist/AddWatchlist";

const StockTab: FC = () => {
  const MyTabs = [
    {
      name: "Explore",
      component: <Explore />,
    },
    {
      name: "Holdings",
      component: <Holdings />,
    },
    {
      name: "Ritik's Watchlist",
      component: <WatchList />,
    },
    {
      name: "+ Watchlist",
      component: <AddWatchlist />,
    },
  ];

  return <CustomTab tabs={MyTabs} Header={StockHeader} />;
};

export default StockTab;

import React, { FC } from "react";
import { StyleSheet, View } from "react-native";
import { Tabs } from "react-native-collapsible-tab-view";
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

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 0,
    overflow: "hidden",
    paddingBottom: 0,
  },
  box: {
    height: 250,
    width: "100%",
  },
  boxA: {
    backgroundColor: "green",
  },
  boxB: {
    backgroundColor: "blue",
  },
});

export default StockTab;

import { StyleSheet, ScrollView, View } from "react-native";
import React, { FC, useState } from "react";
import CustomSafeAreaView from "../../components/global/CustomSafeAreaView";
import StockDetailHeader from "../../components/global/StockDetailHeader";
import Details from "./Details";
import TimeFrame from "../../components/charts/TimeFrame";
import MediumChart from "../../components/charts/linechart/MediumChart";
import DetailTab from "../../components/stockdetails/DetailTab";
import Overview from "../../components/stockdetails/Overview";
import { screenHeight } from "../../utils/Scaling";
import FutureAndOption from "../../components/stockdetails/FutureAndOptions";
import { candleChartData, ptData } from "../../utils/staticData";
import { getSignPaisa } from "../../utils/NumberUtils";
import TradeChart from "../../components/charts/candlechart/TradeChart";
import { ParamListBase, RouteProp, useRoute } from "@react-navigation/native";
interface ParamsType {
  stock?: any;
}
const tabs = ["Overview", "F&O"];

const StockDetail: FC = () => {
  const route = useRoute<RouteProp<ParamListBase>>();

  const stockData = (route.params as ParamsType)?.stock || null;

  const [isVisible, setIsVisible] = useState(false);
  const [chartDataLoading, setChartDataLoading] = useState(false);

  const [currentTimeFrame, setCurrentTimeFrame] = useState("1D");
  const [currentTab, setCurrentTab] = useState(0);
  const [chartMode, setChartMode] = useState("line");

  const handleScroll = (event: any) => {
    const scrollPosition = event.nativeEvent.contentOffset.y;

    const threshold = screenHeight * 0.07;

    if (scrollPosition >= threshold && !isVisible) {
      setIsVisible(true);
    } else if (scrollPosition < threshold && isVisible) {
      setIsVisible(false);
    }
  };

  return (
    <CustomSafeAreaView style={styles.container}>
      <StockDetailHeader stock={stockData} isVisible={isVisible} />
      <ScrollView
        onScroll={handleScroll}
        scrollEventThrottle={16}
        showsVerticalScrollIndicator={false}
      >
        <View style={[styles.subContainer, { paddingTop: 0 }]}>
          <Details data={stockData} />
          {chartMode == "line" ? (
            <MediumChart
              data={ptData}
              loading={chartDataLoading}
              color={getSignPaisa(stockData?.price_change).color}
              onPressExpand={() => {}}
            />
          ) : (
            <TradeChart
              data={candleChartData}
              onPressExpand={() => {}}
              loading={chartDataLoading}
              color={getSignPaisa(stockData?.price_change).color}
            />
          )}
          <TimeFrame
            chartMode={chartMode}
            currentTimeFrame={currentTimeFrame}
            onSetChartMode={async (type) => {
              setChartDataLoading(true);
              setTimeout(() => {
                setChartMode(type);
                setChartDataLoading(false);
              }, 500);
            }}
            onSetCurrentTimeFrame={(timeframe) =>
              setCurrentTimeFrame(timeframe)
            }
          />
        </View>
        <ScrollView horizontal contentContainerStyle={{ width: "100%" }}>
          {tabs.map((item, index) => {
            const tabWidth = (1 / tabs?.length) * 100;
            return (
              <DetailTab
                key={index}
                style={{ width: `${tabWidth}%` }}
                onPress={() => setCurrentTab(index)}
                label={item}
                focused={currentTab == index}
              />
            );
          })}
        </ScrollView>

        <View style={styles.subContainer}>
          {currentTab == 0 && <Overview />}
          {currentTab == 1 && <FutureAndOption />}
        </View>
      </ScrollView>
    </CustomSafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 0,
  },
  subContainer: {
    paddingHorizontal: 15,
    paddingVertical: 20,
  },
});

export default StockDetail;

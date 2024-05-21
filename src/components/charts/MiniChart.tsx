import React, { FC } from "react";
import { View, StyleSheet } from "react-native";
import Svg, { Path } from "react-native-svg";

interface MiniChartsProps {
  color: string;
  stockData: number[];
}

const MiniChart: FC<MiniChartsProps> = ({ color, stockData }) => {
  const containerWidth = 80;
  const containerHeight = 20;
  const maxValue = Math.max(...stockData);

  const scaleYChart = (value: number) =>
    (100 - (value / maxValue) * 100).toFixed(2);

  return (
    <View>
      <Svg width={containerWidth} height={containerHeight}>
        <Path
          d={
            `M5,${scaleYChart(stockData[0])} ` +
            stockData
              .slice(1)
              .map(
                (point, index) => ` L${(index + 1) * 10},${scaleYChart(point)}`
              )
              .join("")
          }
          stroke={color}
          strokeWidth="1.5"
          fill="none"
        />
        <Path
          d={`M 0 ${containerHeight / 2} L ${containerWidth} ${
            containerHeight / 2
          }`}
          stroke={color}
          strokeWidth={1}
          strokeDasharray="2, 2"
        />
      </Svg>
    </View>
  );
};

export default MiniChart;

const styles = StyleSheet.create({
  container: {
    width: 40,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
  },
});

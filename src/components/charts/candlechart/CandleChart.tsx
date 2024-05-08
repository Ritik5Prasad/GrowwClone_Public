import React, { FC } from "react";
import Svg from "react-native-svg";
import * as d3 from "d3-scale";

import { Gesture, GestureDetector } from "react-native-gesture-handler";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  useDerivedValue,
} from "react-native-reanimated";
import { StyleSheet, View } from "react-native";
import Candle from "./Candle";
import StripLine from "./StripLine";
import { ReText } from "react-native-redash";
import { useTheme } from "@react-navigation/native";
import { FONTS } from "../../../constants/Fonts";
import { RFValue } from "react-native-responsive-fontsize";
import { formatDate } from "../../../utils/ValidationUtils";
import { formatPaisaWorklet } from "../../../utils/NumberUtils";
import PointerValuesGroup from "./PointerValuesGroup";
import { screenWidth } from "../../../utils/Scaling";

const CandleChart: FC<{ data: any[]; height: number; width: number }> = ({
  data,
  height,
  width,
}) => {
  const { colors } = useTheme();
  const opacity = useSharedValue(0);

  const chartHeight = height;
  const candleWidth = screenWidth * 0.012;

  const candleCount = data.length;
  const candleTotalWidth = candleWidth * candleCount;
  const candleXSpacing = (width - candleTotalWidth) / (candleCount - 1);

  const scaleY = d3
    .scaleLinear()
    .domain([
      Math.min(...data.map((d) => d.low)),
      Math.max(...data.map((d) => d.high)),
    ])
    .range([chartHeight, 0]);

  const position = useSharedValue(0);
  const textPad = useSharedValue(0);

  const panGesture = Gesture.Pan()
    .onUpdate((e) => {
      const candleIndex = Math.floor(
        (e.x + candleXSpacing / 2) / (candleWidth + candleXSpacing)
      );
      const newX = candleIndex * (candleWidth + candleXSpacing) + 2;
      position.value = newX;
      textPad.value = e.x < 80 ? 0 : e.x > 260 ? -100 : -50;
      opacity.value = 1;
    })
    .onTouchesDown((e) => {
      opacity.value = 0;
    });

  const reTextAnimatedStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
    marginLeft: textPad.value,
  }));

  const pointValueStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
    display: opacity.value == 0 ? "none" : "flex",
  }));

  const animatedStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
    transform: [{ translateX: position.value }],
  }));

  const formatData = (value: any) => {
    "worklet";
    if (!value) {
      return "";
    }
    const date = value?.timestamp;
    return `₹${value.close} | ${formatDate(date)}`;
  };

  const scaleYInvert = (y: number) => {
    "worklet";
    const hoveredIndex = Math.floor(
      (position.value + candleXSpacing / 2) / (candleWidth + candleXSpacing)
    );
    return data[hoveredIndex];
  };

  const text = useDerivedValue(() => {
    const data = scaleYInvert(position.value);
    return formatData(data);
  });

  const closeValue = useDerivedValue(() => {
    const data = scaleYInvert(position.value);
    return formatPaisaWorklet(data?.close);
  });

  const openValue = useDerivedValue(() => {
    const data = scaleYInvert(position.value);
    return formatPaisaWorklet(data?.open);
  });

  const lowValue = useDerivedValue(() => {
    const data = scaleYInvert(position.value);
    return formatPaisaWorklet(data?.low);
  });

  const highValue = useDerivedValue(() => {
    const data = scaleYInvert(position.value);
    return formatPaisaWorklet(data?.high);
  });

  return (
    <View>
      <Animated.View
        style={[
          StyleSheet.absoluteFill,
          {
            backgroundColor: colors.background,
            top: -180,
            width: screenWidth,
            left: -20,
            padding: 20,
            right: 0,
            alignSelf: "center",
          },
          pointValueStyle,
        ]}
      >
        <PointerValuesGroup
          openValue={openValue}
          closeValue={closeValue}
          highValue={highValue}
          lowValue={lowValue}
        />
      </Animated.View>
      <View>
        <Svg width={width} height={chartHeight}>
          {data.map((candle, index) => (
            <Candle
              key={index}
              data={candle}
              color="white"
              scaleY={scaleY}
              candleWidth={candleWidth}
              candleX={index * candleWidth + index * candleXSpacing}
            />
          ))}
        </Svg>

        <GestureDetector gesture={panGesture}>
          <Animated.View style={[StyleSheet.absoluteFill]}>
            <Animated.View style={[StyleSheet.absoluteFill, animatedStyle]}>
              <StripLine y={height} />
              <Animated.View
                style={[StyleSheet.absoluteFill, reTextAnimatedStyle]}
              >
                <ReText
                  style={{
                    color: colors.text,
                    fontFamily: FONTS.Regular,
                    fontSize: RFValue(9),
                    top: -20,
                  }}
                  {...{ text }}
                />
              </Animated.View>
            </Animated.View>
          </Animated.View>
        </GestureDetector>
      </View>
    </View>
  );
};

export default CandleChart;

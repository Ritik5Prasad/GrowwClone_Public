import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import React, { FC } from "react";
import { Colors } from "../../../constants/Colors";
import { screenHeight } from "../../../utils/Scaling";
import { useTheme } from "@react-navigation/native";
import Icon from "react-native-vector-icons/MaterialIcons";
import { RFValue } from "react-native-responsive-fontsize";
import { candleChartData } from "../../../utils/staticData";
import CandleChart from "./CandleChart";
import { screenWidth } from "react-native-gifted-charts/src/utils";

const height = screenHeight * 0.28;
interface TradeChartProps {
  loading: boolean;
  data: Record<string, any>;
  color: string;
  onPressExpand: () => void;
}
const TradeChart: FC<TradeChartProps> = ({
  loading,
  data,
  color,
  onPressExpand,
}) => {
  const { colors } = useTheme();
  return (
    <View style={styles.container}>
      {loading ? (
        <ActivityIndicator color={Colors.profit} />
      ) : (
        <View
          style={{
            height: height,
            width: screenWidth - 40,
            justifyContent: "center",
            alignItems: "center",
            paddingTop: 50,
            // overflow: "hidden",
          }}
        >
          <CandleChart
            data={candleChartData}
            width={screenWidth - 40}
            height={height - 40}
          />
        </View>
      )}
      <TouchableOpacity
        onPress={onPressExpand}
        style={[styles.absoluteBtn, { backgroundColor: colors.card }]}
      >
        <Icon name="zoom-out-map" color={Colors.profit} size={RFValue(16)} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    height: height,
  },
  absoluteBtn: {
    padding: 6,
    borderRadius: 50,
    position: "absolute",
    right: 0,
    bottom: 4,
  },
});
export default TradeChart;

import { View, StyleSheet, ActivityIndicator, Platform } from "react-native";
import React, { FC, useState } from "react";
import {
  ParamListBase,
  RouteProp,
  useRoute,
  useTheme,
} from "@react-navigation/native";
import CustomSafeAreaView from "../../components/global/CustomSafeAreaView";
import TradingViewHeader from "../../components/headers/TradingViewHeader";
import CustomButton from "../../components/global/CustomButton";
import { Colors } from "../../constants/Colors";
import { navigate } from "../../utils/NavigationUtil";
import WebView from "react-native-webview";
import { useCustomColorScheme } from "../../navigation/Theme";

interface ParamsType {
  stock?: any;
}

const TradingView: FC = () => {
  const route = useRoute<RouteProp<ParamListBase>>();
  const stockData = (route.params as ParamsType)?.stock || null;
  const { colors } = useTheme();
  const theme = useCustomColorScheme();
  const [loading, setLoading] = useState(true);

  return (
    <CustomSafeAreaView style={styles.container}>
      <TradingViewHeader />

      <WebView
        style={{
          flex: 1,
          backgroundColor: colors.background,
          right: -1,
        }}
        // source={{ uri: "https://charting-library.tradingview-widget.com" }}
        source={{
          uri:
            Platform.OS == "ios"
              ? `http://localhost:3001/?theme=${theme}&timeframe=1d`
              : `http://10.0.2.2:3001/?theme=${theme}&timeframe=1d`,
        }}
        allowFileAccessFromFileURLs={true}
        domStorageEnabled={true}
        onLoadEnd={() => {
          setTimeout(() => {
            setLoading(false);
          }, 500);
        }}
        bounces={false}
        allowFileAccess={true}
        allowUniversalAccessFromFileURLs={true}
        originWhitelist={["*"]}
        onShouldStartLoadWithRequest={() => true}
      />

      <View style={styles.flexRow}>
        <CustomButton
          text="SELL"
          onPress={() =>
            navigate("Transaction", {
              type: "SELL",
              stock: stockData,
            })
          }
          loading={false}
          disabled={false}
          style={{
            backgroundColor: Colors.loss,
            width: "48%",
            borderRadius: 6,
          }}
        />
        <CustomButton
          text="BUY"
          onPress={() => {
            navigate("Transaction", {
              type: "BUY",
              stock: stockData,
            });
          }}
          loading={false}
          disabled={false}
          style={{
            backgroundColor: Colors.profit,
            width: "48%",
            borderRadius: 6,
          }}
        />
      </View>

      {loading && (
        <View
          style={{
            height: "100%",
            width: "100%",
            position: "absolute",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 99,
            backgroundColor: colors.background,
          }}
        >
          <ActivityIndicator color={colors.primary} />
        </View>
      )}
    </CustomSafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 0,
    paddingHorizontal: 0,
  },
  flexRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 10,
    paddingVertical: 6,
    paddingTop: 8,
  },
});

export default TradingView;

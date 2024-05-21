import { View, StyleSheet, Platform } from "react-native";
import React, { FC } from "react";
import StockItem from "./StockItem";

interface StockCardProps {
  data: Record<string, any>;
}

const StockCard: FC<StockCardProps> = ({ data }) => {
  return (
    <View>
      <View style={styles.container}>
        {data.slice(0, 2).map((item: any, index: number) => {
          return <StockItem key={index} item={item} />;
        })}
      </View>
      <View style={styles.container}>
        {data.slice(2, 4).map((item: any, index: number) => {
          return <StockItem key={index} item={item} />;
        })}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
});

export default StockCard;

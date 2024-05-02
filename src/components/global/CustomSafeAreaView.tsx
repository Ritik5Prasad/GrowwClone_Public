import { SafeAreaView, StyleSheet, View, ViewStyle } from "react-native";
import React, { FC, ReactNode } from "react";
import NoInternet from "./NoInternet";

interface CustomSafeAreaViewProps {
  children: ReactNode;
  style?: ViewStyle;
}

const CustomSafeAreaView: FC<CustomSafeAreaViewProps> = ({
  children,
  style,
}) => {
  return (
    <>
      <SafeAreaView style={[styles.container, style]}>
        <View style={[styles.container, style]}>{children}</View>
      </SafeAreaView>
      <NoInternet />
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
    paddingHorizontal: 20,
    flex: 1,
  } as ViewStyle,
});

export default CustomSafeAreaView;

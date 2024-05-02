import { StyleSheet } from "react-native";
import React, { FC } from "react";
import { Tabs } from "react-native-collapsible-tab-view";

const AddWatchlist: FC = () => {
  return (
    <Tabs.ScrollView showsVerticalScrollIndicator={false}></Tabs.ScrollView>
  );
};

const styles = StyleSheet.create({});

export default AddWatchlist;

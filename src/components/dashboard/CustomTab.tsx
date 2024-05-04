import React, { FC, useEffect, useRef, useState } from "react";
import { StyleSheet } from "react-native";
import { CollapsibleRef, Tabs } from "react-native-collapsible-tab-view";
import { useTheme } from "@react-navigation/native";
import CustomSafeAreaView from "../global/CustomSafeAreaView";
import TabBar from "./TabBar";
import { SheetManager } from "react-native-actions-sheet";

interface CustomTabProps {
  Header: React.FunctionComponent;
  tabs: { name: string; component: React.ReactNode }[];
}

const CustomTab: FC<CustomTabProps> = ({ Header, tabs }) => {
  const containerRef = useRef<CollapsibleRef>(null);
  const { colors } = useTheme();
  const [focusedIndex, setFocusedIndex] = useState(0);
  const handleSetIndex = (newIndex: number) => {
    containerRef.current?.setIndex(newIndex);
  };

  const checkSheet = async () => {
    if (containerRef.current?.getFocusedTab() === "+ Watchlist") {
      await SheetManager.show("create-watchlist");
      setTimeout(() => {
        handleSetIndex(2);
      }, 200);
    }
  };
  useEffect(() => {
    checkSheet();
  }, [focusedIndex]);

  return (
    <CustomSafeAreaView style={styles.container}>
      <Tabs.Container
        lazy
        cancelLazyFadeIn
        revealHeaderOnScroll={true}
        renderHeader={() => <Header />}
        ref={containerRef}
        headerContainerStyle={styles.noOpacity}
        renderTabBar={(props) => (
          <TabBar
            tabNames={props.tabNames}
            focusedIndex={focusedIndex}
            onSetIndex={(index) => handleSetIndex(index)}
          />
        )}
        containerStyle={{
          backgroundColor: colors.background,
          paddingVertical: 0,
        }}
        pagerProps={{
          onPageSelected: (event) => {
            setFocusedIndex(event.nativeEvent.position);
          },
          removeClippedSubviews: true,
        }}
      >
        {tabs.map((item, index) => {
          return (
            <Tabs.Tab key={index} name={item.name}>
              {item.component}
            </Tabs.Tab>
          );
        })}
      </Tabs.Container>
    </CustomSafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 0,
    overflow: "hidden",
    paddingTop: 10,
    paddingVertical: 0,
  },

  noOpacity: {
    shadowOpacity: 0,
    elevation: 0,
  },
});

export default CustomTab;

import React from "react";
import { View, Animated, StyleSheet, TouchableOpacity } from "react-native";
import { theme } from "../../common/colors";
import { SafeAreaView } from "react-navigation";
import TabBar from "react-native-underline-tabbar";
import ScrollableTabView from "react-native-scrollable-tab-view";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "#f2f1f0"
  },
  tabBarStyle: {
    marginTop: 0,
    borderTopWidth: 0,
    borderTopColor: theme,
    backgroundColor: theme
  },
  safe: {
    flex: 1,
    backgroundColor: theme
  }
});

const Page = ({}) => <View style={styles.container}></View>;

const Tab = ({ tab, page, styles, onTabLayout, onPressHandler }) => {
  const { label } = tab;
  const style = {
    marginHorizontal: 0,
    paddingVertical: 5
  };
  const containerStyle = {
    paddingHorizontal: 20,
    paddingVertical: 5,
    flexDirection: "row",
    opacity: styles.opacity,
    transform: [{ scale: styles.opacity }],
    backgroundColor: styles.backgroundColor
  };
  const textStyle = {
    color: "#fff",
    fontWeight: "600",
    fontFamily: "Rubik-SemiBold"
  };
  return (
    <TouchableOpacity
      key={page}
      style={style}
      onLayout={onTabLayout}
      onPress={onPressHandler}
    >
      <Animated.View style={containerStyle}>
        <Animated.Text style={textStyle}>{label}</Animated.Text>
      </Animated.View>
    </TouchableOpacity>
  );
};

export default ({}) => {
  let _scrollX = new Animated.Value(0);
  const interpolators = Array.from({ length: 900 }, (_, i) => i).map(idx => ({
    scale: _scrollX.interpolate({
      inputRange: [idx - 1, idx, idx + 1],
      outputRange: [1, 1.2, 1],
      extrapolate: "clamp"
    }),
    opacity: _scrollX.interpolate({
      inputRange: [idx - 1, idx, idx + 1],
      outputRange: [0.9, 1, 0.9],
      extrapolate: "clamp"
    }),
    textColor: () =>
      _scrollX.interpolate({
        inputRange: [idx - 1, idx, idx + 1],
        outputRange: ["#fff", "#fff", "#fff"]
      }),
    backgroundColor: () =>
      _scrollX.interpolate({
        inputRange: [idx - 1, idx, idx + 1],
        outputRange: [theme, theme, theme],
        extrapolate: "clamp"
      })
  }));

  return (
    <SafeAreaView style={styles.safe} forceInset={{ bottom: "never" }}>
      <View style={styles.container}>
        <ScrollableTabView
          renderTabBar={() => (
            <TabBar
              underlineColor={"#fff"}
              tabBarStyle={styles.tabBarStyle}
              renderTab={(
                tab,
                page,
                isTabActive,
                onPressHandler,
                onTabLayout
              ) => (
                <Tab
                  key={page}
                  tab={tab}
                  page={page}
                  isTabActive={isTabActive}
                  onTabLayout={onTabLayout}
                  onPressHandler={onPressHandler}
                  styles={interpolators[page]}
                />
              )}
            />
          )}
          onScroll={x => _scrollX.setValue(x)}
        >
          {["Shariq", "Furqan", "Ali"].map((v, i) => {
            return <Page key={i} tabLabel={{ label: v }} />;
          })}
        </ScrollableTabView>
      </View>
    </SafeAreaView>
  );
};

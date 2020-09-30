import React, { useState, useEffect, useRef } from "react";
import { View, Animated, StyleSheet, TouchableOpacity } from "react-native";
import { theme, backgroundColor } from "../../common/colors";
import TabBar from "react-native-underline-tabbar";
import ScrollableTabView from "react-native-scrollable-tab-view";
import { useSelector } from "react-redux";
import { ARABIC, ITEMS } from "../../common/constants";
import { useNavigation } from "@react-navigation/native";
import Page from "./Page";
import _ from "lodash";

let _isMounted = false;

const Tab = ({
  page,
  isArabic,
  onTabLayout,
  tab: { label },
  onPressHandler,
  styles: inheritedStyle
}) => {
  const tabContainerStyle = {
    paddingHorizontal: 20,
    paddingVertical: 5,
    flexDirection: "row",
    opacity: inheritedStyle.opacity,
    transform: [{ scale: inheritedStyle.scale }],
    backgroundColor: inheritedStyle.backgroundColor
  };
  return (
    <TouchableOpacity
      key={page}
      onLayout={onTabLayout}
      style={styles.tabStyle}
      onPress={onPressHandler}
    >
      <Animated.View style={tabContainerStyle}>
        <Animated.Text style={styles.tabTextStyle(isArabic)}>
          {label}
        </Animated.Text>
      </Animated.View>
    </TouchableOpacity>
  );
};

export default () => {
  const tabView = useRef(null);
  const navigation = useNavigation();
  const { language, category } = useSelector(state => state.app);
  const isArabic = language === ARABIC;

  useEffect(() => {
    _isMounted = true;
    if (_isMounted) {
      const onFocus = params => {
        if (
          params &&
          params.tabIndex !== null &&
          params.tabIndex !== undefined &&
          tabView &&
          tabView.current
        ) {
          const tabIndex = params.tabIndex;
          tabView.current.goToPage(tabIndex);
          navigation.setParams({ tabIndex: null });
        }
      };

      const unsubscribe = navigation.addListener("focus", () => {
        const { index, routes } = navigation.dangerouslyGetState();
        const currentTabParams = routes[index].params;
        onFocus(currentTabParams);
      });

      return unsubscribe;
    }
  }, []);

  let _scrollX = new Animated.Value(0);
  const interpolators = Array.from({ length: 100 }, (_, i) => i).map(idx => ({
    scale: _scrollX.interpolate({
      inputRange: [idx - 1, idx, idx + 1],
      outputRange: [0.9, 1.1, 0.9],
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
        outputRange: ["#efefef", "#fff", "#efefef"]
      }),
    backgroundColor: () =>
      _scrollX.interpolate({
        inputRange: [idx - 1, idx, idx + 1],
        outputRange: [theme, theme, theme],
        extrapolate: "clamp"
      })
  }));

  const renderPages = () => {
    const filter = ITEMS.filter(v => v.category === category);
    const grouped = _.groupBy(filter, o => o.subcategory(isArabic));
    const keys = Object.keys(grouped);
    return keys.map((v, i) => {
      return (
        <Page
          key={i}
          data={grouped[v]}
          tabLabel={{ label: v }}
          navigation={navigation}
        />
      );
    });
  };

  return (
    <ScrollableTabView
      ref={tabView}
      initialPage={0}
      renderTabBar={() => (
        <TabBar
          underlineColor={"#fff"}
          tabBarStyle={styles.tabBarStyle(isArabic)}
          renderTab={(tab, page, isTabActive, onPressHandler, onTabLayout) => (
            <Tab
              key={page}
              tab={tab}
              page={page}
              isArabic={isArabic}
              navigation={navigation}
              isTabActive={isTabActive}
              onTabLayout={onTabLayout}
              styles={interpolators[page]}
              onPressHandler={onPressHandler}
            />
          )}
        />
      )}
      onScroll={x => _scrollX.setValue(x)}
    >
      {renderPages()}
    </ScrollableTabView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor,
    justifyContent: "center"
  },
  tabBarStyle: isArabic => ({
    marginTop: 0,
    width: "100%",
    borderTopWidth: 0,
    borderTopColor: theme,
    backgroundColor: theme,
    transform: [{ scaleX: isArabic ? -1 : 1 }]
  }),
  tabStyle: {
    marginHorizontal: 0,
    paddingVertical: 5
  },
  tabTextStyle: isArabic => ({
    color: "#fff",
    fontSize: 14,
    transform: [{ rotateY: isArabic ? "180deg" : "0deg" }],
    fontFamily: isArabic ? "Cairo-Bold" : "Rubik-Medium"
  })
});

import React, { useEffect, useRef, useState } from "react";
import { Animated, StyleSheet, TouchableOpacity } from "react-native";
import { backgroundColor } from "../../common/colors";
import TabBar from "react-native-underline-tabbar";
import ScrollableTabView from "react-native-scrollable-tab-view";
import { useSelector } from "react-redux";
import { ARABIC, ITEMS } from "../../common/constants";
import Page from "./Page";
import _ from "lodash";
import { useNavigation } from "@react-navigation/native";

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
      activeOpacity={0.7}
      onLayout={onTabLayout}
      onPress={onPressHandler}
      style={styles.tabStyle(isArabic)}
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
  const [number, setNumber] = useState(0);
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

      const unsubscribe = navigation
        .dangerouslyGetParent()
        .addListener("focus", () => {
          const { index, routes } = navigation.dangerouslyGetState();
          const currentTabParams = routes[index].params;
          onFocus(currentTabParams);
        });

      return unsubscribe;
    }
  }, []);

  useEffect(() => {
    _isMounted = true;
    if (_isMounted) {
      setNumber(Math.random() * 109279);
      console.log("need to call api");
    }
  }, [category]);

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
        outputRange: ["#f03250", "#f03250", "#f03250"],
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
          isArabic={isArabic}
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
          underlineHeight={3}
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
    borderWidth: 1,
    borderColor: "#f73957",
    backgroundColor: "#f73957",
    transform: [{ scaleX: isArabic ? -1 : 1 }]
  }),
  tabStyle: isArabic => ({
    marginHorizontal: 0,
    paddingVertical: isArabic ? 9 : 12
  }),
  tabTextStyle: isArabic => ({
    color: "#fff",
    fontSize: isArabic ? 16 : 14.5,
    transform: [{ rotateY: isArabic ? "180deg" : "0deg" }],
    fontFamily: isArabic ? "Cairo-Bold" : "Rubik-Medium"
  })
});

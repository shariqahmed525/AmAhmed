import React, { useEffect, useRef, useState } from "react";
import { Animated, StyleSheet, TouchableOpacity, View } from "react-native";
import { backgroundColor, secondaryHeader } from "../../common/colors";
import TabBar from "react-native-underline-tabbar";
import ScrollableTabView from "react-native-scrollable-tab-view";
import { useSelector } from "react-redux";
import { ANDROID, ARABIC, BASE_URL, IOS } from "../../common/constants";
import Page from "./Page";
import _ from "lodash";
import LottieView from "lottie-react-native";
import { useNavigation } from "@react-navigation/native";
import { Tab as NativeBaseTab, Tabs, ScrollableTab } from "native-base";
import NoInternet from "../../components/NoInternet";
import NetInfo from "@react-native-community/netinfo";
import Axios from "axios";
import NotFound from "../../components/NotFound";

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
  const [loading, setLoading] = useState(true);
  const [internet, setInternet] = useState(true);
  const [subCategories, setSubCategories] = useState([]);

  const { language, selectedCategory, selectedCity } = useSelector(
    state => state.app
  );
  const isArabic = language === ARABIC;

  // tab redirection
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
          setTimeout(() => {
            tabView.current.goToPage(tabIndex);
            navigation.setParams({ tabIndex: null });
          });
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

  // Api listner
  useEffect(() => {
    _isMounted = true;
    if (_isMounted) {
      if (typeof getSubCategories === "function") {
        checkConnection(getSubCategories);
      }
    }
  }, [selectedCategory]);

  const checkConnection = func => {
    NetInfo.fetch().then(state => {
      if (!state.isConnected) {
        setLoading(false);
        setInternet(false);
      } else {
        setInternet(true);
        func();
      }
    });
  };

  const getSubCategories = async () => {
    const locationId = selectedCity?.id;
    const categoryId = selectedCategory?.id;
    try {
      setLoading(true);
      const { data } = await Axios.get(
        `${BASE_URL}/Categories/loc/${locationId}/cat/${categoryId}/sub`
      );
      if (data && data.length > 0) {
        setSubCategories([...data]);
      } else {
        setSubCategories([]);
      }
    } catch (error) {
      console.log(error, " error in getting sub categories");
    } finally {
      setLoading(false);
    }
  };

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
        outputRange: [secondaryHeader, secondaryHeader, secondaryHeader],
        extrapolate: "clamp"
      })
  }));

  const renderPages = () => {
    const locationId = selectedCity?.id;
    return subCategories.map((v, i) => {
      return (
        <Page
          key={i}
          isArabic={isArabic}
          subCategoryId={v.id}
          locationId={locationId}
          tabLabel={{ label: isArabic ? v.nameAr : v.nameEn }}
        />
      );
    });
  };

  const renderTabs = () => {
    const locationId = selectedCity?.id;
    return subCategories.map((v, i) => {
      return (
        <NativeBaseTab
          key={i}
          tabStyle={styles.tabStyle(isArabic)}
          heading={isArabic ? v.nameAr : v.nameEn}
          textStyle={styles.tabTextStyle(isArabic)}
          activeTabStyle={styles.tabStyle(isArabic)}
          activeTextStyle={styles.tabTextStyle(isArabic, true)}
        >
          <Page
            key={i}
            isArabic={isArabic}
            subCategoryId={v.id}
            locationId={locationId}
          />
        </NativeBaseTab>
      );
    });
  };

  const handleRetry = () => {};

  if (!internet) {
    return <NoInternet isArabic={isArabic} onPress={handleRetry} />;
  } else if (loading) {
    return (
      <View style={styles.loaderWrapper}>
        <LottieView
          loop
          autoPlay
          style={styles.loader}
          source={require("../../../assets/animations/loader.json")}
        />
      </View>
    );
  } else if (subCategories && subCategories.length > 0) {
    if (ANDROID) {
      return (
        <Tabs
          ref={tabView}
          initialPage={0}
          style={styles.tabBarStyle(isArabic)}
          renderTabBar={() => (
            <ScrollableTab
              style={{
                backgroundColor: secondaryHeader,
                transform: [{ scaleX: isArabic ? -1 : 1 }]
              }}
              tabsContainerStyle={styles.tabBarStyle(isArabic)}
            />
          )}
        >
          {renderTabs()}
        </Tabs>
      );
    } else {
      return (
        <ScrollableTabView
          ref={tabView}
          initialPage={0}
          renderTabBar={() => (
            <TabBar
              underlineHeight={3}
              underlineColor={"#fff"}
              tabBarStyle={styles.tabBarStyle(isArabic)}
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
    }
  } else {
    return (
      <NotFound
        isArabic={isArabic}
        text={isArabic ? "لم يتم العثور على نتائج" : "No Results Found"}
        secondaryText={
          isArabic
            ? "عذرا ، لم نتمكن من العثور على أي بيانات"
            : "Sorry, we couldn't find any data"
        }
      />
    );
  }
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
    borderColor: secondaryHeader,
    borderWidth: ANDROID ? 0 : 1,
    transform: [{ scaleX: IOS && isArabic ? -1 : 1 }],
    backgroundColor: ANDROID ? "transparent" : secondaryHeader
  }),
  tabStyle: isArabic => ({
    marginHorizontal: 0,
    backgroundColor: secondaryHeader,
    paddingVertical: isArabic ? 9 : 13
  }),
  tabTextStyle: (isArabic, active) => ({
    color: "#fff",
    opacity: active ? 1 : 0.9,
    fontSize: isArabic ? 16 : 14.5,
    transform: [
      { rotateY: isArabic ? "180deg" : "0deg" },
      { scale: active ? 1.1 : 0.9 }
    ],
    fontFamily: isArabic ? "Cairo-Bold" : "Rubik-Medium"
  }),
  loaderWrapper: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  },
  loader: {
    width: 120
  }
});

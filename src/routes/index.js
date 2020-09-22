import React, { useEffect, useMemo } from "react";
import { useSelector } from "react-redux";
import ShowAlert from "../components/ShowAlert";
import {
  Home,
  Cart,
  Search,
  Categories,
  OnBoardingCity,
  OnBoardingCategory,
  OnBoardingLanguage
} from "../containers";
import { store } from "../redux";
import { StatusBar } from "react-native";
import CartIcon from "../components/CartIcon";
import { gray, theme } from "../common/colors";
import { TransitionPresets } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { Feather, MaterialCommunityIcons } from "../common/icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { ANDROID } from "../common/constants";

const { Navigator, Screen } = createStackNavigator();
const {
  Screen: TabScreen,
  Navigator: TabNavigator
} = createBottomTabNavigator();

const tabOptions = {
  activeTintColor: theme,
  inactiveTintColor: gray,
  showLabel: false
};

const StackOptions = {
  headerTintColor: "#fff",
  headerStyle: {
    backgroundColor: theme
  },
  headerTitleStyle: {
    fontSize: 20
  },
  headerBackTitleVisible: false,
  headerShown: false,
  ...TransitionPresets.SlideFromRightIOS
};

const HomeScreensArr = [];
const SearchScreensArr = [];
const CartScreensArr = [];

const getTabBarVisible = (route, array) => {
  const routeName =
    route.state &&
    route.state.routes &&
    route.state.index &&
    route.state.routes.length > 0 &&
    route.state.routes[route.state.index].name
      ? route.state.routes[route.state.index].name
      : "";
  if (array.includes(routeName)) return false;
  return true;
};

const Tab = () => {
  return (
    <TabNavigator tabBarOptions={tabOptions}>
      <TabScreen
        name="Home"
        component={Home}
        options={({ route }) => ({
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons size={30} name={"home"} color={color} />
          ),
          tabBarVisible: getTabBarVisible(route, HomeScreensArr)
        })}
      />
      <TabScreen
        name="Categories"
        component={Categories}
        options={({ route }) => ({
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons size={30} color={color} name={"apps"} />
          ),
          tabBarVisible: getTabBarVisible(route, SearchScreensArr)
        })}
      />
      <TabScreen
        name="Search"
        component={Search}
        options={({ route }) => ({
          tabBarIcon: ({ color }) => (
            <Feather size={26} color={color} name={"search"} />
          ),
          tabBarVisible: getTabBarVisible(route, SearchScreensArr)
        })}
      />
      <TabScreen
        name="Cart"
        component={Cart}
        options={({ route }) => ({
          tabBarLabel: "Cart",
          tabBarIcon: ({ focused }) => <CartIcon focused={focused} />,
          tabBarVisible: getTabBarVisible(route, CartScreensArr)
        })}
      />
    </TabNavigator>
  );
};
const AppStack = () => {
  return <Tab />;
};

const OnBoardStack = () => {
  const {
    app: { city }
  } = store.getState();

  const initialRouteName = city ? "OnBoardingCategory" : "OnBoardingCity";

  return (
    <Navigator initialRouteName={initialRouteName}>
      <Screen
        options={StackOptions}
        name="OnBoardingCity"
        component={OnBoardingCity}
      />
      <Screen
        options={StackOptions}
        name="OnBoardingCategory"
        component={OnBoardingCategory}
      />
      <Screen
        options={StackOptions}
        name="OnBoardingLanguage"
        component={OnBoardingLanguage}
      />
    </Navigator>
  );
};

export default () => {
  const { category } = useSelector(state => state.app);

  useEffect(() => {
    if (category) {
      StatusBar.setBarStyle("light-content");
      ANDROID && StatusBar.setBackgroundColor(theme);
    } else {
      StatusBar.setBarStyle("dark-content");
      ANDROID && StatusBar.setBackgroundColor("#fff");
    }
  }, [category]);

  const memoizeApp = useMemo(
    () => (
      <NavigationContainer>
        {/* <AppStack /> */}
        {category ? <AppStack /> : <OnBoardStack />}
      </NavigationContainer>
    ),
    [category]
  );
  return (
    <>
      <ShowAlert />
      {memoizeApp}
    </>
  );
};

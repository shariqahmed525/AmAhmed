import React, { useMemo } from "react";
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
import CartIcon from "../components/CartIcon";
import { gray, theme } from "../common/colors";
import DrawerComponent from "../components/Drawer";
import { TransitionPresets } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { Feather, MaterialCommunityIcons } from "../common/icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { ARABIC } from "../common/constants";

const { Navigator, Screen } = createStackNavigator();
const {
  Screen: TabScreen,
  Navigator: TabNavigator
} = createBottomTabNavigator();

const {
  Screen: DrawerScreen,
  Navigator: DrawerNavigator
} = createDrawerNavigator();

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

const MainDrawer = () => {
  const { language } = useSelector(state => state.app);
  const memo = useMemo(
    () => (
      <DrawerNavigator
        initialRouteName="Home"
        drawerPosition={language === ARABIC ? "right" : "left"}
        drawerContent={props => <DrawerComponent {...props} />}
      >
        <DrawerScreen name="Home" component={Home} />
      </DrawerNavigator>
    ),
    [language]
  );
  return memo;
};

const Tab = () => {
  return (
    <TabNavigator tabBarOptions={tabOptions}>
      <TabScreen
        name="Home"
        component={MainDrawer}
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

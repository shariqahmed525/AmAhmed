import React from "react";
import ShowAlert from "../components/ShowAlert";
import {
  Home,
  Cart,
  Search,
  Language,
  Categories,
  ItemDetail,
  OnBoardingCity,
  OnBoardingCategory
} from "../containers";
import CartIcon from "../components/CartIcon";
import { tabIconColor, theme } from "../common/colors";
import { TransitionPresets } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { Feather, MaterialCommunityIcons } from "../common/icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

const { Navigator, Screen } = createStackNavigator();
const {
  Screen: TabScreen,
  Navigator: TabNavigator
} = createBottomTabNavigator();

const tabOptions = {
  activeTintColor: theme,
  inactiveTintColor: tabIconColor,
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

const HomeStack = () => {
  return (
    <Navigator initialRouteName="HomeScreen">
      <Screen component={Home} name="HomeScreen" options={StackOptions} />
      <Screen component={ItemDetail} name="ItemDetail" options={StackOptions} />
      <Screen
        name="Category"
        options={StackOptions}
        component={OnBoardingCategory}
      />
    </Navigator>
  );
};

const CategoriesStack = () => {
  return (
    <Navigator initialRouteName="CategoriesScreen">
      <Screen
        component={Categories}
        name="CategoriesScreen"
        options={StackOptions}
      />
      <Screen component={ItemDetail} name="ItemDetail" options={StackOptions} />
    </Navigator>
  );
};

const SearchStack = () => {
  return (
    <Navigator initialRouteName="SearchScreen">
      <Screen component={Search} name="SearchScreen" options={StackOptions} />
      <Screen component={ItemDetail} name="ItemDetail" options={StackOptions} />
    </Navigator>
  );
};

const HomeScreensArr = ["ItemDetail", "Category"];
const SearchScreensArr = ["ItemDetail"];
const CartScreensArr = [];
const CategoriesScreensArr = ["ItemDetail"];

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
    <TabNavigator initialRouteName="Search" tabBarOptions={tabOptions}>
      <TabScreen
        name="Home"
        component={HomeStack}
        options={({ route }) => ({
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons size={30} name={"home"} color={color} />
          ),
          tabBarVisible: getTabBarVisible(route, HomeScreensArr)
        })}
      />
      <TabScreen
        name="Categories"
        component={CategoriesStack}
        options={({ route }) => ({
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons size={30} color={color} name={"apps"} />
          ),
          tabBarVisible: getTabBarVisible(route, CategoriesScreensArr)
        })}
      />
      <TabScreen
        name="Search"
        component={SearchStack}
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

const OnBoardStack = () => {
  return (
    <Navigator initialRouteName={"MainStack"}>
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
      <Screen component={Tab} name="MainStack" options={StackOptions} />
      <Screen name="Language" component={Language} options={StackOptions} />
    </Navigator>
  );
};

export default () => {
  return (
    <>
      <ShowAlert />
      <NavigationContainer>
        <OnBoardStack />
      </NavigationContainer>
    </>
  );
};

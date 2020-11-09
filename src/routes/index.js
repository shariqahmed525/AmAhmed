import React, { useEffect } from "react";
import ShowAlert from "../components/ShowAlert";
import {
  Home,
  Cart,
  Search,
  AboutUs,
  Payment,
  Checkout,
  Language,
  MyOrders,
  ContactUs,
  Categories,
  ItemDetail,
  NewAddress,
  ShowStores,
  PinLocation,
  MyAddresses,
  Verification,
  OnBoardingCity,
  OnlineTransfer,
  OnBoardingCategory
} from "../containers";
import CartIcon from "../components/CartIcon";
import { tabIconColor, theme } from "../common/colors";
import messaging from "@react-native-firebase/messaging";
import { TransitionPresets } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { Feather, MaterialCommunityIcons } from "../common/icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

let _isMounted = false;

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
        name="MyAddresses"
        options={StackOptions}
        component={MyAddresses}
      />
      <Screen name="AboutUs" options={StackOptions} component={AboutUs} />
      <Screen name="ContactUs" options={StackOptions} component={ContactUs} />
      <Screen name="MyOrders" options={StackOptions} component={MyOrders} />
      <Screen name="NewAddress" options={StackOptions} component={NewAddress} />
      <Screen
        name="PinLocation"
        options={StackOptions}
        component={PinLocation}
      />
      <Screen
        name="Category"
        options={StackOptions}
        component={OnBoardingCategory}
      />
      <Screen name="City" options={StackOptions} component={OnBoardingCity} />
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

const CartStack = () => {
  return (
    <Navigator initialRouteName="CartScreen">
      <Screen component={Cart} name="CartScreen" options={StackOptions} />
      <Screen component={Checkout} name="Checkout" options={StackOptions} />
      <Screen component={Payment} name="Payment" options={StackOptions} />
      <Screen
        component={OnlineTransfer}
        name="OnlineTransfer"
        options={StackOptions}
      />
      <Screen component={ShowStores} name="ShowStores" options={StackOptions} />
      <Screen
        name="Verification"
        options={StackOptions}
        component={Verification}
      />
      <Screen name="NewAddress" options={StackOptions} component={NewAddress} />
      <Screen
        name="PinLocation"
        options={StackOptions}
        component={PinLocation}
      />
    </Navigator>
  );
};

const HomeScreensArr = [
  "ItemDetail",
  "Category",
  "Address",
  "MyAddresses",
  "NewAddress",
  "PinLocation",
  "AboutUs",
  "ContactUs",
  "MyOrders",
  "City"
];
const SearchScreensArr = ["ItemDetail"];
const CartScreensArr = [
  "Checkout",
  "ShowStores",
  "Verification",
  "NewAddress",
  "Payment",
  "OnlineTransfer",
  "PinLocation"
];
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
    <TabNavigator initialRouteName="Home" tabBarOptions={tabOptions}>
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
        component={CartStack}
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
        name="OnBoardingCity"
        options={StackOptions}
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
  useEffect(() => {
    _isMounted = true;
    if (_isMounted) {
      // Assume a message-notification contains a "type" property in the data payload of the screen to open

      messaging().onNotificationOpenedApp(remoteMessage => {
        console.log(
          "Notification caused app to open from background state:",
          remoteMessage
        );
        // navigation.navigate(remoteMessage.data.type);
      });

      // Check whether an initial notification is available
      messaging()
        .getInitialNotification()
        .then(remoteMessage => {
          if (remoteMessage) {
            console.log(
              "Notification caused app to open from quit state:",
              remoteMessage
            );
            // setInitialRoute(remoteMessage.data.type); // e.g. "Settings"
          }
        });
    }
  }, []);

  return (
    <>
      <ShowAlert />
      <NavigationContainer>
        <OnBoardStack />
      </NavigationContainer>
    </>
  );
};

import React, { useEffect, useMemo } from "react";
import { useSelector } from "react-redux";
import { FontAwesome5 } from "../common/icons";
import { gray, tabIconColor, theme } from "../common/colors";
import { View, Text, StyleSheet, Animated } from "react-native";

export default ({ focused, color }) => {
  const springValue = new Animated.Value(1);
  const { cart } = useSelector(state => state.user);

  const spring = () => {
    springValue.setValue(0.3);
    Animated.spring(springValue, {
      toValue: 1,
      friction: 1
    }).start();
  };

  useEffect(() => {
    spring();
  }, [cart.length]);

  const memo = useMemo(
    () => (
      <View style={styles.container}>
        {cart && cart.length > 0 && (
          <Animated.View
            style={{
              ...styles.textWrapper(focused),
              transform: [{ scale: springValue }]
            }}
          >
            <Text style={styles.text(focused)}>{cart.length}</Text>
          </Animated.View>
        )}
        <FontAwesome5
          size={26}
          name={"shopping-basket"}
          color={color || (focused ? theme : tabIconColor)}
        />
      </View>
    ),
    [cart.length]
  );

  return memo;
};

const styles = StyleSheet.create({
  container: {
    position: "relative"
  },
  textWrapper: focused => ({
    top: -4,
    right: -6,
    zIndex: 1,
    width: 22,
    height: 22,
    borderRadius: 22,
    borderWidth: 1,
    position: "absolute",
    alignItems: "center",
    justifyContent: "center",
    borderColor: focused ? gray : theme,
    backgroundColor: focused ? gray : theme
  }),
  text: () => ({
    fontSize: 11,
    color: "#fff",
    fontWeight: "bold"
  })
});

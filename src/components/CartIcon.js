import React from "react";
import { useSelector } from "react-redux";
import { gray, tabIconColor, theme } from "../common/colors";
import { View, Text, StyleSheet } from "react-native";
import { FontAwesome5, MaterialCommunityIcons } from "../common/icons";

export default ({ focused, color }) => {
  const { cart } = useSelector(state => state.user);
  return (
    <View style={styles.container}>
      {cart && cart.length > 0 && (
        <View style={styles.textWrapper(focused)}>
          <Text style={styles.text(focused)}>{cart.length}</Text>
        </View>
      )}
      <FontAwesome5
        size={26}
        name={"shopping-basket"}
        color={color || (focused ? theme : tabIconColor)}
      />
    </View>
  );
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

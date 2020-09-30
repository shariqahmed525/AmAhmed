import React from "react";
import { backgroundColor } from "../../common/colors";
import { View, Text, StyleSheet } from "react-native";

export default ({ navigation }) => {
  return <View style={styles.container}></View>;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor
  }
});

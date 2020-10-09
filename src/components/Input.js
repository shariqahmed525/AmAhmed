import React, { useState } from "react";
import Tooltip from "rn-tooltip";
import { IOS } from "../common/constants";
import { MaterialIcons, Entypo } from "../common/icons";
import { View, Text, TextInput, StyleSheet } from "react-native";
import { theme, dangerColor, lightGray } from "../common/colors";

export default ({ icon, rightIcon, error, phoneInput, ...rest }) => {
  const [showPassword, setShowPassword] = useState(false);
  return (
    <View style={styles.inputContainer}>
      <View style={styles.inputWrapper(error, rightIcon, icon)}>
        {icon}
        {phoneInput && <Text style={styles.phoneInput(error)}>03</Text>}
        <TextInput
          style={styles.input(phoneInput)}
          secureTextEntry={rightIcon ? !showPassword : false}
          {...rest}
        />
        {error ? (
          <Tooltip
            width={220}
            withOverlay={false}
            backgroundColor={dangerColor}
            pointerStyle={styles.pointer}
            containerStyle={styles.tooltip}
            popover={<Text style={styles.error}>{error}</Text>}
          >
            <MaterialIcons size={25} name="error" color={dangerColor} />
          </Tooltip>
        ) : (
          rightIcon && (
            <Entypo
              size={30}
              color={theme}
              name={showPassword ? "eye-with-line" : "eye"}
              onPress={() => setShowPassword(!showPassword)}
            />
          )
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    width: "100%",
    marginTop: 20
  },
  inputWrapper: (error, rightIcon, icon) => ({
    width: "100%",
    borderWidth: 1,
    borderRadius: 100,
    alignItems: "center",
    flexDirection: "row",
    paddingLeft: icon ? 15 : 10,
    justifyContent: "space-between",
    paddingRight: rightIcon ? 15 : 10,
    borderColor: error ? dangerColor : lightGray
  }),
  input: phoneInput => ({
    flex: 1,
    fontSize: 16,
    color: theme,
    paddingRight: 10,
    paddingVertical: IOS ? 14 : 8,
    fontFamily: "Montserrat-Regular",
    paddingLeft: phoneInput ? 0 : 10
  }),
  phoneInput: error => ({
    fontSize: 16,
    paddingLeft: 10,
    fontFamily: "Montserrat-Regular",
    color: error ? dangerColor : theme
  }),
  error: {
    fontSize: 13,
    color: "#fff",
    fontFamily: "Montserrat-Medium"
  },
  tooltip: {
    marginTop: 3
  },
  pointer: {
    marginTop: 2
  }
});

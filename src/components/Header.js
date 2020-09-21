import React, { useMemo } from "react";
import { theme } from "../common/colors";
import { Entypo } from "../common/icons";
import { useSelector } from "react-redux";
import { ARABIC } from "../common/constants";
import { TouchableOpacity, View, Text, StyleSheet } from "react-native";

export default ({
  back,
  title,
  titleColor,
  headerStyle,
  transparent,
  onBackPress,
  leftIconProps,
  rightIconProps,
  backgroundColor,
  leftIcon: LeftIcon,
  rightIcon: RightIcon,
  component: Component
}) => {
  const { language } = useSelector(state => state.app);
  const isArabic = language === ARABIC;
  const memo = useMemo(
    () => (
      <View
        style={[
          headerStyle ? { ...headerStyle } : { ...styles.header(isArabic) },
          {
            backgroundColor: transparent
              ? "transparent"
              : backgroundColor || theme
          }
        ]}
      >
        {/* Back and Left Icon */}
        {back ? (
          <TouchableOpacity onPress={onBackPress} style={styles.back}>
            <Entypo size={25} color={theme} name="chevron-thin-left" />
          </TouchableOpacity>
        ) : LeftIcon ? (
          <TouchableOpacity style={styles.back} {...leftIconProps}>
            <LeftIcon />
          </TouchableOpacity>
        ) : (
          <View style={styles.dummy} />
        )}

        {/* Title */}
        {Component ? (
          <View style={styles.flex}>
            <Component />
          </View>
        ) : (
          title && (
            <View style={styles.titleWrapper}>
              <Text
                style={{
                  ...styles.title(isArabic),
                  color: titleColor || theme
                }}
              >
                {title}
              </Text>
            </View>
          )
        )}

        {/* Right Icon */}
        {RightIcon ? (
          <TouchableOpacity style={styles.back} {...rightIconProps}>
            <RightIcon />
          </TouchableOpacity>
        ) : (
          <View style={styles.dummy} />
        )}
      </View>
    ),
    [language]
  );
  return memo;
};

const styles = StyleSheet.create({
  header: isArabic => ({
    width: "100%",
    alignItems: "center",
    paddingVertical: 15,
    paddingHorizontal: 10,
    justifyContent: "space-between",
    flexDirection: isArabic ? "row-reverse" : "row"
  }),
  titleWrapper: {
    flex: 1,
    height: 33,
    alignItems: "center",
    justifyContent: "flex-end"
  },
  title: isArabic => ({
    fontSize: isArabic ? 20 : 22,
    textAlign: "center",
    textAlignVertical: "center",
    fontFamily: isArabic ? "Cairo-SemiBold" : "Rubik-Regular"
  }),
  back: {
    width: 40,
    alignItems: "center",
    justifyContent: "center"
  },
  dummy: {
    width: 40
  },
  flex: {
    flex: 1
  }
});

import React, { useMemo } from "react";
import { theme } from "../common/colors";
import { Entypo } from "../common/icons";
import { useSelector } from "react-redux";
import { ARABIC } from "../common/constants";
import { TouchableOpacity, View, Text, StyleSheet } from "react-native";

export default ({
  back,
  title,
  titleAlign,
  titleColor,
  headerStyle,
  transparent,
  onBackPress,
  backIconColor,
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
          <TouchableOpacity onPress={onBackPress} style={styles.back(isArabic)}>
            <Entypo
              size={25}
              name="chevron-thin-left"
              color={
                backIconColor ||
                (!backgroundColor && !transparent ? "#fff" : theme)
              }
            />
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
            <View style={styles.titleWrapper(isArabic)}>
              <Text
                style={{
                  ...styles.title(isArabic),
                  textAlign: titleAlign || "center",
                  color:
                    titleColor ||
                    (!backgroundColor && !transparent ? "#fff" : theme)
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
  titleWrapper: isArabic => ({
    flex: 1,
    height: 33,
    paddingHorizontal: isArabic ? 4 : 7,
    justifyContent: isArabic ? "flex-start" : "center"
  }),
  title: isArabic => ({
    marginTop: isArabic ? -3 : 0,
    textAlignVertical: "center",
    fontSize: isArabic ? 20 : 22,
    fontFamily: isArabic ? "Cairo-SemiBold" : "Rubik-Regular"
  }),
  back: isArabic => ({
    width: 40,
    alignItems: "center",
    justifyContent: "center",
    transform: [{ rotateZ: isArabic ? "180deg" : "0deg" }]
  }),
  dummy: {
    width: 40
  },
  flex: {
    flex: 1
  }
});

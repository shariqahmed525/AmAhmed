import React, { useState, forwardRef } from "react";
import {
  Entypo,
  Fontisto,
  MaterialIcons,
  MaterialCommunityIcons
} from "../common/icons";
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity
} from "react-native";
import { WIDTH } from "../common/constants";
import { black, theme } from "../common/colors";
import { Menu, Divider, ActivityIndicator } from "react-native-paper";

export default forwardRef((props, ref) => {
  const {
    title,
    loading,
    isAddress,
    btnText,
    isArabic,
    onPress,
    selected,
    data = [],
    noIcon
  } = props;
  const [visible, setVisible] = useState(false);
  const openMenu = () => setVisible(true);
  const closeMenu = () => setVisible(false);
  const handleListItem = (isNew, item) => {
    if (isAddress) {
      onPress(isNew, item);
    } else {
      onPress(item);
    }
    closeMenu();
  };
  return (
    <>
      <Text ref={ref} style={styles.heading(isArabic)}>
        {title}
      </Text>
      <Menu
        visible={visible}
        contentStyle={{
          width: WIDTH - 22,
          backgroundColor: "#fff"
        }}
        onDismiss={closeMenu}
        anchor={
          <TouchableOpacity
            onPress={openMenu}
            disabled={loading}
            activeOpacity={0.7}
            style={styles.option(isArabic, loading)}
          >
            {loading ? (
              <ActivityIndicator size="small" color={theme} />
            ) : (
              <>
                <Text
                  numberOfLines={1}
                  ellipsizeMode="tail"
                  style={styles.optionText(isArabic)}
                >
                  {selected
                    ? isAddress
                      ? selected?.area
                      : isArabic
                      ? selected?.nameAr
                      : selected?.nameEn
                    : btnText}
                </Text>
                <Entypo name="chevron-thin-down" size={18} color={theme} />
              </>
            )}
          </TouchableOpacity>
        }
      >
        {isAddress && (
          <>
            <Menu.Item
              title={
                <View style={styles.listItem(isArabic)}>
                  <View style={styles.listIcon(isArabic)}>
                    <MaterialIcons size={25} color={theme} name="my-location" />
                  </View>
                  <View style={styles.textWrapper(isArabic)}>
                    <Text style={styles.listItemText(isArabic)}>
                      {isArabic ? "الموقع الحالي" : "Current Location"}
                    </Text>
                  </View>
                </View>
              }
              titleStyle={{ width: WIDTH - 52 }}
              onPress={() => handleListItem(true)}
              style={styles.menuItem(isArabic)}
            />
            <Divider />
            <Menu.Item
              title={
                <View style={styles.listItem(isArabic)}>
                  <View style={styles.listIcon(isArabic)}>
                    <MaterialCommunityIcons
                      size={25}
                      color={theme}
                      name="map-marker-plus-outline"
                    />
                  </View>
                  <View style={styles.textWrapper(isArabic)}>
                    <Text style={styles.listItemText(isArabic)}>
                      {isArabic ? "عنوان جديد" : "New Address"}
                    </Text>
                  </View>
                  <View style={styles.listIconRight(isArabic)}>
                    <Entypo size={20} color={theme} name="chevron-thin-right" />
                  </View>
                </View>
              }
              titleStyle={{ width: WIDTH - 52 }}
              onPress={() => handleListItem(true)}
              style={styles.menuItem(isArabic)}
            />
            {data && data.length > 0 && <Divider />}
          </>
        )}
        <ScrollView bounces={false} style={{ maxHeight: 200 }}>
          {data.map((v, i) => (
            <View key={i}>
              <Menu.Item
                title={
                  <View style={styles.listItem(isArabic)}>
                    {isAddress ? (
                      <View style={styles.listIcon(isArabic)}>
                        <Fontisto size={20} name="navigate" color={theme} />
                      </View>
                    ) : (
                      !noIcon &&
                      v.icon && (
                        <View style={styles.listIcon(isArabic)}>{v.icon}</View>
                      )
                    )}
                    <View style={styles.textWrapper(isArabic)}>
                      <Text style={styles.listItemText(isArabic)}>
                        {isAddress ? v.area : isArabic ? v.nameAr : v.nameEn}
                      </Text>
                    </View>
                  </View>
                }
                onPress={() => handleListItem(false, v)}
                titleStyle={{ width: WIDTH - 52 }}
                style={styles.menuItem(isArabic, selected?.id == v.id)}
              />
              {v.isDivider && <Divider />}
            </View>
          ))}
        </ScrollView>
      </Menu>
    </>
  );
});

const styles = StyleSheet.create({
  heading: (isArabic, isCenter) => ({
    color: theme,
    marginBottom: 10,
    fontSize: isArabic ? 23 : 22,
    textAlign: isCenter ? "center" : isArabic ? "right" : "left",
    fontFamily: isArabic ? "Cairo-Bold" : "Rubik-SemiBold"
  }),
  option: (isArabic, loading) => ({
    width: "100%",
    borderRadius: 4,
    alignItems: "center",
    flexDirection: isArabic ? "row-reverse" : "row",
    paddingVertical: loading ? (isArabic ? 19 : 13) : 15,
    paddingHorizontal: 15,
    backgroundColor: "#ffffff",
    borderColor: "#fff",
    borderWidth: 1,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1
    },
    shadowOpacity: 0.18,
    shadowRadius: 1.0,
    elevation: 1,
    marginBottom: isArabic ? 20 : 20,
    justifyContent: loading ? "center" : "space-between"
  }),
  optionText: isArabic => ({
    flex: 1,
    color: black,
    fontSize: isArabic ? 18 : 16,
    textAlign: isArabic ? "right" : "left",
    fontFamily: isArabic ? "Cairo-SemiBold" : "Rubik-Regular"
  }),
  listItem: isArabic => ({
    width: "100%",
    width: WIDTH - 52,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: isArabic ? "row-reverse" : "row"
  }),
  listItemText: isArabic => ({
    fontSize: 15,
    paddingVertical: 0,
    textAlign: isArabic ? "right" : "left",
    fontFamily: isArabic ? "Cairo-SemiBold" : "Rubik-Regular"
  }),
  textWrapper: () => ({
    flex: 1
  }),
  listIcon: isArabic => ({
    width: 40,
    transform: [
      {
        rotateY: isArabic ? "180deg" : "0deg"
      }
    ]
  }),
  listIconRight: isArabic => ({
    transform: [
      {
        rotateY: isArabic ? "180deg" : "0deg"
      }
    ]
  }),
  menuItem: (isArabic, isSelected) => ({
    width: "100%",
    maxWidth: WIDTH,
    fontFamily: isArabic ? "Cairo-Bold" : "Rubik-Regular",
    backgroundColor: isSelected ? "#e5e5e5" : "transparent"
  })
});

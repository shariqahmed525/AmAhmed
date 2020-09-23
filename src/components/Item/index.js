import React from "react";
import {
  Text,
  View,
  FlatList,
  StyleSheet,
  TouchableOpacity
} from "react-native";
import SeeAll from "../SeeAll";
import Item from "./Item";
import { theme } from "../../common/colors";

const renderItem = ({ item, isArabic }) => {
  return <Item product={item} isArabic={isArabic} />;
};

export default ({ data, name, onSeeAll, isArabic, tabIndex, ...rest }) => {
  const keyExtractor = (item, index) => item + index;
  return (
    <View style={styles.containerStyle}>
      <View style={styles.itemColTop(isArabic)}>
        <View style={styles.itemColTopHeadTextWrapper(isArabic)}>
          <Text style={styles.itemColTopHead(isArabic)}>{name}</Text>
        </View>
        <TouchableOpacity onPress={() => alert(tabIndex)} style={styles.seeAll}>
          <Text style={styles.seeAllText(isArabic)}>
            {isArabic ? "المزيد" : "MORE"}
          </Text>
        </TouchableOpacity>
      </View>
      {data && (
        <FlatList
          data={data}
          extraData={rest}
          horizontal={true}
          inverted={isArabic}
          keyExtractor={keyExtractor}
          keyboardShouldPersistTaps="handled"
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.itemsCollectionScrollView}
          renderItem={props => renderItem({ ...props, isArabic })}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  containerStyle: {
    paddingTop: 15,
    backgroundColor: "#fff"
  },
  itemColTop: isArabic => ({
    height: 40,
    paddingLeft: 15,
    paddingRight: 10,
    alignItems: "center",
    justifyContent: "space-between",
    flexDirection: isArabic ? "row-reverse" : "row"
  }),
  itemColTopHeadTextWrapper: isArabic => ({
    flex: 1,
    justifyContent: "center",
    paddingLeft: isArabic ? 10 : 0,
    paddingRight: isArabic ? 0 : 10
  }),
  itemColTopHead: isArabic => ({
    fontSize: 19,
    color: theme,
    textAlign: isArabic ? "right" : "left",
    fontFamily: isArabic ? "Cairo-Bold" : "Rubik-Medium"
  }),
  itemsCollectionScrollView: {
    padding: 10,
    flexDirection: "row"
  },
  seeAll: {
    justifyContent: "center",
    alignItems: "center",
    height: 30,
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    borderColor: theme,
    backgroundColor: theme
  },
  seeAllText: isArabic => ({
    fontSize: 12,
    color: "#fff",
    textAlign: "center",
    fontFamily: isArabic ? "Cairo-Bold" : "Rubik-Medium"
  })
});

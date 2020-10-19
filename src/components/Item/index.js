import React, { useEffect, useRef, useState } from "react";
import {
  Text,
  View,
  FlatList,
  StyleSheet,
  TouchableOpacity
} from "react-native";
import Item from "./Item";
import { darkGray, theme } from "../../common/colors";
import { useNavigation } from "@react-navigation/native";
import Axios from "axios";
import { BASE_URL, WIDTH } from "../../common/constants";

let _isMounted = false;

const renderItem = ({ item, isArabic }) => {
  return <Item item={item} isArabic={isArabic} />;
};

export default ({
  data,
  name,
  onSeeAll,
  isArabic,
  tabIndex,
  subCategoryId,
  ...rest
}) => {
  const ref = useRef(null);
  const navigation = useNavigation();
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const keyExtractor = (item, index) => item + index;

  const getItems = async () => {
    try {
      setLoading(true);
      const { data } = await Axios.get(
        `${BASE_URL}/products/loc/2/cat/${subCategoryId}/pgNo/1/pgSize/5`
      );
      if (data && data.length > 0) {
        setItems([...data]);
      }
      console.log(data, " getItems");
    } catch (error) {
      console.log(error, " error in getting items");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    _isMounted = true;
    if (_isMounted) {
      getItems();
    }
  }, []);

  useEffect(() => {
    if (
      ref &&
      ref.current &&
      typeof ref.current.scrollToOffset === "function"
    ) {
      ref.current.scrollToOffset({ animated: true, offset: 0 });
    }
  }, [isArabic]);

  return (
    <View style={styles.containerStyle}>
      <View style={styles.itemColTop(isArabic)}>
        <View style={styles.itemColTopHeadTextWrapper(isArabic)}>
          <Text style={styles.itemColTopHead(isArabic)}>{name}</Text>
        </View>
        {!loading && items.length > 0 && (
          <TouchableOpacity
            activeOpacity={0.7}
            style={styles.seeAll}
            onPress={() => {
              navigation.navigate("Categories", {
                screen: "CategoriesScreen",
                params: { tabIndex }
              });
            }}
          >
            <Text style={styles.seeAllText(isArabic)}>
              {isArabic ? "المزيد" : "MORE"}
            </Text>
          </TouchableOpacity>
        )}
      </View>
      <FlatList
        ref={ref}
        data={items}
        extraData={rest}
        horizontal={true}
        inverted={isArabic}
        keyExtractor={keyExtractor}
        keyboardShouldPersistTaps="handled"
        showsHorizontalScrollIndicator={false}
        ListEmptyComponent={() => {
          if (loading) {
            return new Array(5)
              .fill("dummy")
              .map((_, i) => <Item key={i} dummy />);
          } else {
            return (
              <View style={styles.nothing}>
                <Text style={styles.emptySubText(isArabic)}>
                  {isArabic
                    ? "عذرا ، لم نتمكن من العثور على أي بيانات"
                    : "Sorry, we couldn't find any data"}
                </Text>
              </View>
            );
          }
        }}
        contentContainerStyle={styles.itemsCollectionScrollView}
        renderItem={props => renderItem({ ...props, isArabic })}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  containerStyle: {
    paddingTop: 15
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
  }),
  nothing: {
    width: WIDTH - 20,
    marginVertical: 10
  },
  emptySubText: isArabic => ({
    color: darkGray,
    textAlign: "center",
    paddingHorizontal: 12,
    fontSize: isArabic ? 16 : 18,
    fontFamily: isArabic ? "Cairo-SemiBold" : "Rubik-Regular"
  })
});

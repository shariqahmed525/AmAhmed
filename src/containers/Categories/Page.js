import React, { useEffect, useState } from "react";
import Axios from "axios";
import Item from "../../components/Item/Item";
import { BASE_URL, WIDTH } from "../../common/constants";
import { FlatList, StyleSheet, View, Text } from "react-native";
import { backgroundColor, darkGray } from "../../common/colors";
import NetInfo from "@react-native-community/netinfo";
import NotFound from "../../components/NotFound";

let _isMounted = false;

const renderItem = ({ item, isArabic }) => {
  return <Item item={item} isArabic={isArabic} />;
};

const Loader = ({ length = 10 }) =>
  new Array(length).fill("dummy").map((_, i) => <Item key={i} dummy />);

export default ({ subCategoryId, locationId, isArabic, ...rest }) => {
  const [page, setPage] = useState(1);
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [moreFetching, setMoreFetching] = useState(false);
  const [lastItemsLength, setLastItemsLength] = useState(0);
  const keyExtractor = (item, index) => item + index;

  useEffect(() => {
    _isMounted = true;
    if (_isMounted) {
      checkConnection(getItems);
    }
  }, []);

  const checkConnection = func => {
    NetInfo.fetch().then(state => {
      if (!state.isConnected) {
        setLoading(false);
      } else {
        func();
      }
    });
  };

  const getItems = async moreFetch => {
    try {
      !moreFetch && setLoading(true);
      moreFetch && setMoreFetching(true);
      const { data } = await Axios.get(
        `${BASE_URL}/products/loc/${locationId}/cat/${subCategoryId}/pgNo/${page}/pgSize/10`
      );
      if (data && data.length > 0) {
        !moreFetch && setItems([...data]);
        moreFetch && setItems(state => [...state, ...data]);
        moreFetch && setPage(state => state + 1);
        setLastItemsLength(data.length);
      } else {
        !moreFetch && setItems([]);
        moreFetch && setItems([...data]);
        setLastItemsLength(0);
      }
    } catch (error) {
      console.log(error, " error in getting items");
    } finally {
      !moreFetch && setLoading(false);
      moreFetch && setMoreFetching(false);
    }
  };

  const fetchMoreItems = () => {
    if (lastItemsLength < 10) return;
    getItems(true);
  };

  return (
    <FlatList
      extraData={rest}
      data={items || []}
      keyExtractor={keyExtractor}
      keyboardShouldPersistTaps="handled"
      showsVerticalScrollIndicator={false}
      showsHorizontalScrollIndicator={false}
      ListEmptyComponent={() => {
        if (loading) {
          return <Loader />;
        } else {
          return (
            <NotFound
              isArabic={isArabic}
              text={isArabic ? "لم يتم العثور على نتائج" : "No Results Found"}
              secondaryText={
                isArabic
                  ? "عذرا ، لم نتمكن من العثور على أي بيانات"
                  : "Sorry, we couldn't find any data"
              }
            />
          );
        }
      }}
      onEndReachedThreshold={0.5}
      onEndReached={fetchMoreItems}
      ListFooterComponentStyle={styles.emptyWrapper}
      contentContainerStyle={styles.container(isArabic)}
      ListFooterComponent={() => moreFetching && <Loader />}
      renderItem={props => renderItem({ ...props, isArabic })}
    />
  );
};

const styles = StyleSheet.create({
  container: isArabic => ({
    flexGrow: 1,
    backgroundColor,
    flexWrap: "wrap",
    paddingHorizontal: 5,
    paddingVertical: 10,
    justifyContent: "space-between",
    flexDirection: isArabic ? "row-reverse" : "row"
  }),
  emptyWrapper: {
    flexWrap: "wrap",
    flexDirection: "row",
    justifyContent: "space-between"
  }
});

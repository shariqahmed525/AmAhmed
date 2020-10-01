import React, { useEffect, useState } from "react";
import Item from "../../components/Item/Item";
import { backgroundColor } from "../../common/colors";
import { FlatList, StyleSheet } from "react-native";

const renderItem = ({ item, isArabic }) => {
  return <Item item={item} isArabic={isArabic} />;
};

export default ({ data, isArabic, ...rest }) => {
  const [_, setNumber] = useState(0);
  const keyExtractor = (item, index) => item + index;

  useEffect(() => {
    setNumber(Math.random() * 0.08657);
  }, [data]);

  return (
    data &&
    data.length > 0 && (
      <FlatList
        extraData={rest}
        data={data.slice(0, 5)}
        keyExtractor={keyExtractor}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.container(isArabic)}
        renderItem={props => renderItem({ ...props, isArabic })}
      />
    )
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
  })
});

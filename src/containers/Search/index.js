import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import LottieView from "lottie-react-native";
import { SafeAreaView } from "react-navigation";
import {
  View,
  Text,
  FlatList,
  StatusBar,
  TextInput,
  TouchableOpacity
} from "react-native";

import styles from "./styles";
import Header from "../../components/Header";
import Item from "../../components/Item/Item";
import { secondaryHeader, theme } from "../../common/colors";
import { Octicons, MaterialIcons } from "../../common/icons";
import { ANDROID, ARABIC, ITEMS, WIDTH } from "../../common/constants";

const renderItem = ({ item, isArabic }) => {
  return <Item item={item} isArabic={isArabic} />;
};

export default props => {
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);
  const { language, category } = useSelector(state => state.app);
  const isArabic = language === ARABIC;
  const [data, setData] = useState(ITEMS.filter(o => o.category === category));

  useEffect(() => {
    StatusBar.setBarStyle("light-content");
    ANDROID && StatusBar.setBackgroundColor(theme);
  }, []);

  const keyExtractor = (item, index) => item + index;

  const header = (
    <Header
      titleHeight={55}
      titleColor={"#fff"}
      titleFontSize={isArabic ? 28 : 30}
      title={isArabic ? "بحث" : "Search"}
      headerStyle={styles.header(isArabic)}
      titleAlign={isArabic ? "right" : "left"}
      titleFontFamily={isArabic ? "Cairo-Bold" : "Rubik-SemiBold"}
    />
  );

  useEffect(() => {
    setText("");
    setData([...ITEMS.filter(o => o.category === category)]);
  }, [category]);

  const onSearch = () => {
    setLoading(true);
    const filter = ITEMS.filter(o => {
      const itemLowerCase = o.name(isArabic).toLocaleLowerCase();
      const textLowerCase = text.toLocaleLowerCase();
      return itemLowerCase.includes(textLowerCase) && o.category === category;
    });
    setData([...filter]);
    setTimeout(() => {
      setLoading(false);
    }, 500);
  };

  const handleClear = () => {
    setText("");
    setData([...ITEMS.filter(o => o.category === category)]);
  };

  return (
    <SafeAreaView style={styles.safe} forceInset={{ bottom: "never" }}>
      <View style={styles.container}>
        {header}
        <View style={styles.inputContainer(isArabic)}>
          <View style={styles.inputWrapper(isArabic)}>
            <TextInput
              blurOnSubmit
              value={text}
              spellCheck={false}
              autoCorrect={false}
              onSubmitEditing={onSearch}
              style={styles.input(isArabic)}
              onChangeText={text => setText(text)}
              placeholder={isArabic ? "بحث عن البند" : "Search Item"}
            />
            {text !== "" && (
              <View
                style={{
                  marginRight: isArabic ? 0 : 7,
                  marginLeft: isArabic ? 7 : 0
                }}
              >
                <MaterialIcons
                  size={25}
                  name="close"
                  color={secondaryHeader}
                  onPress={handleClear}
                />
              </View>
            )}
            <TouchableOpacity
              onPress={onSearch}
              activeOpacity={0.7}
              style={styles.searchIconWrapper(isArabic)}
            >
              <Octicons size={23} name="search" color={"#fff"} />
            </TouchableOpacity>
          </View>
        </View>
        {loading ? (
          <View style={styles.emptyWrapper}>
            <LottieView
              loop
              autoPlay
              style={{ width: WIDTH * 0.5 }}
              source={require("../../../assets/animations/search.json")}
            />
            <Text style={styles.emptyText(isArabic)}>Searching...</Text>
          </View>
        ) : data.length > 0 ? (
          <FlatList
            data={data}
            extraData={props}
            keyExtractor={keyExtractor}
            keyboardShouldPersistTaps="handled"
            showsVerticalScrollIndicator={false}
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.itemContainer(isArabic)}
            renderItem={props => renderItem({ ...props, isArabic })}
          />
        ) : (
          <View style={styles.emptyWrapper}>
            <LottieView
              loop
              autoPlay
              style={{ width: WIDTH * 0.75 }}
              source={require("../../../assets/animations/nosearch.json")}
            />
            <Text style={styles.emptyText(isArabic)}>
              {isArabic ? "لم يتم العثور على نتائج" : "No Results Found"}
            </Text>
            <Text style={styles.emptySubText(isArabic)}>
              {isArabic
                ? "عذرا، لاتوجد أية نتيجة تتعلق بهذا البحث"
                : "Sorry, there are no results for this search"}{" "}
              {"\n"}
              {isArabic
                ? "يرجى محاولة عبارة أخرى."
                : "please try another phrase."}
            </Text>
          </View>
        )}
      </View>
    </SafeAreaView>
  );
};

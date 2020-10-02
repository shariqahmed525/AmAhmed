import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import LottieView from "lottie-react-native";
import { SafeAreaView } from "react-navigation";
import { View, StatusBar, TextInput, FlatList, Text } from "react-native";

import styles from "./styles";
import Header from "../../components/Header";
import Item from "../../components/Item/Item";
import { MaterialIcons } from "../../common/icons";
import { ANDROID, ARABIC, ITEMS, WIDTH } from "../../common/constants";
import { secondaryHeader, theme } from "../../common/colors";

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

  return (
    <SafeAreaView style={styles.safe} forceInset={{ bottom: "never" }}>
      <View style={styles.container}>
        {header}
        <View style={styles.inputContainer(isArabic)}>
          <View style={styles.inputWrapper(isArabic)}>
            <View
              style={{
                marginLeft: isArabic ? 0 : 15,
                marginRight: isArabic ? 15 : 0,
                transform: [
                  {
                    rotateY: isArabic ? "180deg" : "0deg"
                  }
                ]
              }}
            >
              <MaterialIcons size={25} name="search" color={secondaryHeader} />
            </View>
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
                  marginRight: isArabic ? 0 : 15,
                  marginLeft: isArabic ? 15 : 0
                }}
              >
                <MaterialIcons
                  size={25}
                  name="close"
                  color={secondaryHeader}
                  onPress={() => setText("")}
                />
              </View>
            )}
          </View>
        </View>
        {loading ? (
          <View style={styles.emptyWrapper}>
            <LottieView
              loop
              autoPlay
              style={{ width: 150 }}
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

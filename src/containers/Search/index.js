import React, { useEffect, useRef, useState } from "react";
import {
  View,
  Text,
  FlatList,
  StatusBar,
  TextInput,
  TouchableOpacity
} from "react-native";
import Axios from "axios";
import styles from "./styles";
import { useSelector } from "react-redux";
import LottieView from "lottie-react-native";
import Header from "../../components/Header";
import Item from "../../components/Item/Item";
import { SafeAreaView } from "react-navigation";
import NoInternet from "../../components/NoInternet";
import NetInfo from "@react-native-community/netinfo";
import { secondaryHeader, theme } from "../../common/colors";
import { Octicons, MaterialIcons } from "../../common/icons";
import { ANDROID, ARABIC, BASE_URL, WIDTH } from "../../common/constants";

let _isMounted = false;

const renderItem = ({ item, isArabic }) => {
  return <Item item={item} isArabic={isArabic} />;
};

const Loader = ({ length = 10 }) =>
  new Array(length).fill("dummy").map((_, i) => <Item key={i} dummy />);

export default props => {
  const scrollRef = useRef(null);
  const [text, setText] = useState("");
  const [searchText, setSearchText] = useState("");
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [internet, setInternet] = useState(true);

  const [page, setPage] = useState(1);
  const [moreFetching, setMoreFetching] = useState(false);
  const [lastItemsLength, setLastItemsLength] = useState(0);

  const { language, selectedCategory, selectedCity } = useSelector(
    state => state.app
  );
  const isArabic = language === ARABIC;

  useEffect(() => {
    _isMounted = true;
    if (_isMounted) {
      StatusBar.setBarStyle("light-content");
      ANDROID && StatusBar.setBackgroundColor(theme);
    }
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
    _isMounted = true;
    if (_isMounted) {
      setPage(1);
      setText("");
      setItems([]);
      setSearchText("");
      setLoading(false);
      setLastItemsLength(0);
    }
  }, [selectedCategory]);

  const checkConnection = () => {
    NetInfo.fetch().then(state => {
      if (!state.isConnected) {
        setLoading(false);
        setInternet(false);
      } else {
        getItems();
      }
    });
  };

  const getItems = async moreFetch => {
    const locationId = selectedCity?.id;
    try {
      moreFetch && setMoreFetching(true);
      const { data } = await Axios.get(
        `${BASE_URL}/products/loc/${locationId}/search/${text}/pgNo/${page}/pgSize/10`
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
      console.log(error, " error in getting search items");
    } finally {
      !moreFetch && setLoading(false);
      moreFetch && setMoreFetching(false);
    }
  };

  const onSearch = () => {
    if (!text.trim()) return;
    scrollRef.current.scrollToOffset({ animated: true, offset: 0 });
    setItems([]);
    setLoading(true);
    setSearchText(text);
    checkConnection();
  };

  const handleClear = () => {
    setPage(1);
    setText("");
    setSearchText("");
  };

  const handleRetry = () => {
    checkConnection();
  };

  const fetchMoreItems = () => {
    if (lastItemsLength < 10) return;
    getItems(true);
  };

  const _renderInput = () => (
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
  );

  return (
    <SafeAreaView style={styles.safe} forceInset={{ bottom: "never" }}>
      <View style={styles.container}>
        {header}
        {_renderInput()}
        {!internet ? (
          <NoInternet isArabic={isArabic} onPress={handleRetry} />
        ) : (
          <FlatList
            ref={scrollRef}
            extraData={props}
            data={items || []}
            keyExtractor={keyExtractor}
            keyboardShouldPersistTaps="handled"
            showsVerticalScrollIndicator={false}
            showsHorizontalScrollIndicator={false}
            ListEmptyComponent={() => {
              if (loading) {
                return (
                  <View style={styles.emptyWrapper}>
                    <LottieView
                      loop
                      autoPlay
                      style={{ width: 200, height: 200, alignSelf: "center" }}
                      source={require("../../../assets/animations/search.json")}
                    />
                    <Text style={styles.emptyText(isArabic)}>Searching...</Text>
                  </View>
                );
              } else if (searchText === "" && items.length < 1) {
                return (
                  <View style={styles.emptyWrapper}>
                    <LottieView
                      loop
                      autoPlay
                      style={{ width: 200, height: 200 }}
                      source={require("../../../assets/animations/search-empty.json")}
                    />
                  </View>
                );
              } else {
                return (
                  <View style={styles.emptyWrapper}>
                    <LottieView
                      loop
                      autoPlay
                      style={{ width: WIDTH * 0.75 }}
                      source={require("../../../assets/animations/nosearch.json")}
                    />
                    <Text style={styles.emptyText(isArabic)}>
                      {isArabic
                        ? "لم يتم العثور على نتائج"
                        : "No Results Found"}
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
                );
              }
            }}
            onEndReachedThreshold={0.5}
            onEndReached={fetchMoreItems}
            ListFooterComponentStyle={styles.loadingMore}
            ListFooterComponent={() => moreFetching && <Loader />}
            renderItem={props => renderItem({ ...props, isArabic })}
            contentContainerStyle={{
              ...styles.flatListContainer(isArabic),
              justifyContent:
                loading || items.length < 1 ? "center" : "space-between"
            }}
          />
        )}
      </View>
    </SafeAreaView>
  );
};

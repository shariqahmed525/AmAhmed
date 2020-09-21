import { StyleSheet } from "react-native";
import { theme } from "../../../common/colors";
import { ARABIC, CONTAINER_PADDING, HEIGHT } from "../../../common/constants";
const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: theme
  },
  container: {
    flex: 1,
    backgroundColor: "#fefefe"
  },
  mainContainer: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#fefefe",
    paddingBottom: HEIGHT * 0.04,
    justifyContent: "space-around",
    paddingHorizontal: CONTAINER_PADDING
  },
  logo: {
    width: 115,
    height: 115
  },
  heading: code => ({
    height: 30,
    color: theme,
    marginBottom: 20,
    textAlign: "center",
    fontSize: code === ARABIC ? 25 : 20,
    fontWeight: code === ARABIC ? "bold" : "normal"
  }),
  list: (checked, code) => ({
    height: 75,
    width: "100%",
    marginBottom: 8,
    paddingHorizontal: 15,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    justifyContent: "center",
    borderWidth: 1,
    flexDirection: code === ARABIC ? "row-reverse" : "row",
    borderColor: checked ? theme : "#fff",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    borderRadius: 10
  }),
  listIcon: {
    width: 40,
    height: 23
  },
  listText: code => ({
    flex: 1,
    color: "#000",
    alignItems: "center",
    paddingHorizontal: 12,
    fontSize: code === ARABIC ? 20 : 18,
    textAlign: code === ARABIC ? "right" : "left",
    fontWeight: code === ARABIC ? "bold" : "normal"
  }),
  listSelected: {
    width: 30
  },
  btn: {
    height: 50,
    width: "100%",
    borderRadius: 100,
    alignItems: "center",
    backgroundColor: theme,
    justifyContent: "center",
    borderWidth: 1,
    borderColor: theme,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5
  },
  btnText: code => ({
    color: "#fff",
    fontSize: code === ARABIC ? 22 : 18,
    fontWeight: code === ARABIC ? "bold" : "normal"
  }),
  centerContainer: {
    marginVertical: HEIGHT * 0.07
  }
});

export default styles;

import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    // justifyContent: "center"
    marginTop: 150
  },
  signupContainer: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    marginTop: 50
  },
  inputBorder: {
    padding: 2,
    marginBottom: 10,
    width: "90%",
    marginHorizontal: 20
  },
  inputLabel: {
    marginTop: 20,
    marginLeft: 20
  },
  button: {
    alignItems: "center",
    backgroundColor: "#FFAB40",
    padding: 10,
    marginTop: 20,
    width: "85%",
  },
  facebookButton: {
    alignItems: "center",
    backgroundColor: "#64B5F6",
    padding: 10,
    marginTop: 20,
    width: "85%",
  },
  buttonText: {
    color: "white",
    fontSize: 20
  },
  signupText: {
    color: "#4FC3F7",
    fontSize: 20,
    marginTop: 20
  },

});

export default styles;

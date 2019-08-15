import { StyleSheet, Dimensions } from "react-native";
const { width } = Dimensions.get("window");

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    // justifyContent: "center"
    marginTop: 50
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
    width: "85%"
  },
  facebookButton: {
    alignItems: "center",
    backgroundColor: "#64B5F6",
    padding: 10,
    marginTop: 20,
    width: "85%"
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
  postPhoto: {
    width: width,
    height: 250
  },
  roundImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
    margin: 8
  },
  row: {
    flexDirection: "row"
  },
  center: {
    alignItems: "center",
    justifyContent: "space-between"
  },
  border: {
    width: '85%',
    margin: 10,
    padding: 15,
    fontSize: 16,
    borderColor: '#d3d3d3',
    borderBottomWidth: 1,
    textAlign: 'center'
  },
  cameraButton: {
    height: 100, 
    width: 100,
    borderRadius: 50,
    alignSelf: 'center',
    backgroundColor: '#fff',
    marginBottom: 50
  },
});

export default styles;

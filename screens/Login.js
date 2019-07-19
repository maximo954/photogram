import React, { Component } from "react";
import { View, TouchableOpacity } from "react-native";
import { Input, Text, Divider } from "react-native-elements";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import {
  updateEmail,
  updatePassword,
  login,
  getUser,
  FacebookLogin
} from "../actions/user";
import firebase from "firebase";

import styles from "../styles";

class Login extends Component{
  componentDidMount() {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.props.getUser(user.uid);
        user.uid && this.props.navigation.navigate("Home");
      }
    });
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={{ marginBottom: 40 }} h4>
          Login
        </Text>
        <Input
          inputContainerStyle={styles.inputBorder}
          labelStyle={styles.inputLabel}
          placeholder="joe@example.com"
          label="Email"
          onChangeText={text => this.props.updateEmail(text)}
        />
        <Input
          inputContainerStyle={styles.inputBorder}
          labelStyle={styles.inputLabel}
          placeholder="mypassword"
          label="Password"
          secureTextEntry={true}
          onChangeText={text => this.props.updatePassword(text)}
        />
        <TouchableOpacity
          style={styles.button}
          onPress={() => this.props.login()}
        >
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.facebookButton}
          onPress={() => this.props.FacebookLogin()}
        >
          <Text style={styles.buttonText}>Facebook</Text>
        </TouchableOpacity>

        {/* <Divider style={{marginTop: 20, backgroundColor: 'blue'}}/> */}

        <TouchableOpacity
          onPress={() => this.props.navigation.navigate("Signup")}
        >
          <Text style={styles.signupText}>Signup</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    { updateEmail, updatePassword, login, getUser, FacebookLogin },
    dispatch
  );
};

const mapStateToProps = state => {
  console.log(state);
  return {
    auth: state.auth
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Login);

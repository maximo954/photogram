import React, { Component } from "react";
import { View, TouchableOpacity } from "react-native";
import { Input, Button, Text } from "react-native-elements";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import {
  updateEmail,
  updatePassword,
  updateUsername,
  updateBio,
  signup
} from "../actions/user";

import styles from "../styles";

class Signup extends Component {
  signup = () => {
    this.props.signup(this.props.auth.email, this.props.auth.password);
    this.props.navigation.navigate("Home");
  };

  render() {
    const { routeName } = this.props.navigation.state;
    return (
      <View style={styles.signupContainer}>
        <Text style={{ marginBottom: 40 }} h4>
          Signup
        </Text>
        <Input
          inputContainerStyle={styles.inputBorder}
          labelStyle={styles.inputLabel}
          placeholder="bigboy"
          label="Username"
          value={this.props.auth.username}
          onChangeText={text => this.props.updateUsername(text)}
        />
        {routeName === "Signup" ? (
          <View>
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
          </View>
        ) : null}
        <Input
          inputContainerStyle={styles.inputBorder}
          labelStyle={styles.inputLabel}
          placeholder="Text...."
          label="Bio"
          value={this.props.auth.bio}
          multiline
          onChangeText={text => this.props.updateBio(text)}
        />
        <TouchableOpacity style={styles.button} onPress={this.signup}>
          <Text style={styles.buttonText}>
            {routeName === "Edit" ? "Edit Profile" : "Signup"}
          </Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    { updateEmail, updatePassword, updateBio, updateUsername, signup },
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
)(Signup);

import React, { Component } from "react";
import { Text, View, Button, } from "react-native";
import { Image } from 'react-native-elements';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import firebase from "firebase";

import styles from "../styles";

class Profile extends Component {
  logout = () => {
    firebase
      .auth()
      .signOut()
      .then(function() {
        this.props.navigation.navigate("Login");
      })
      .catch(function(error) {});
  };
  render() {
    return (
      <View style={styles.container}>
         <Text>Profile </Text>
        {this.props.auth.photo && <Image source={{ uri: this.props.auth.photo }} style={{ width: 50, height: 50 }} />}
        <Text>{this.props.auth.username}</Text>
        <Text>{this.props.auth.email} </Text>
        <Text>{this.props.auth.bio} </Text>
        {/* <Text>{this.props.auth.createdAt} </Text> */}
        <Button title={"Edit Profile"} onPress={() => this.props.navigation.navigate("Edit")} />
        <Button title={"Logout"} onPress={() => this.logout()} />
      </View>
    );
  }
}

const mapStateToProps = state => {
  console.log("User", state.auth);
  return {
    auth: state.auth
  };
};

export default connect(mapStateToProps)(Profile);

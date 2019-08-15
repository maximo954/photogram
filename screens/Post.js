import React, { Component } from "react";
import * as Permissions from "expo-permissions";
import * as Location from "expo-location";
import {
  View,
  TouchableOpacity,
  ScrollView,
  Modal,
  SafeAreaView,
  FlatList
} from "react-native";
import { Input, Text, Image } from "react-native-elements";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import styles from "../styles";
import { updateDescription, uploadPost, updateLocation } from "../actions/post";

const GOOGLE_API =
  "https://maps.googleapis.com/maps/api/place/nearbysearch/json?";

class Post extends Component {
  state = {
    showModal: false,
    location: []
  };

  post = () => {
    this.props.uploadPost();
    this.props.navigation.navigate("Home");
  };

  setLocation = location => {
    console.log("SetLocation", location);
    const place = {
      name: location.name,
      cords: {
        lat: location.geometry.location.lat,
        lng: location.geometry.location.lng
      }
    };
    this.setState({ showModal: false });
    this.props.updateLocation(place);
  };

  getLocation = async () => {
    this.setState({ showModal: true });
    const { status } = await Permissions.askAsync(Permissions.LOCATION);

    if (status === "granted") {
      const location = await Location.getCurrentPositionAsync();
      const url = `${GOOGLE_API}location=${location.coords.latitude},${
        location.coords.longitude
      }&rankby=distance&key=AIzaSyBTlYBHKBRijwkSXzeCfBk34h3xXnHsdaE`;
      const res = await fetch(url);
      const data = await res.json();
      this.setState({ location: data.results });
      console.log("Data", data.results);
    }
  };
  modal = () => {
    return (
      <Modal
        animationType="slide"
        transparent={false}
        visible={this.state.showModal}
      >
        <SafeAreaView style={[styles.container, styles.center]}>
          <FlatList
            data={this.state.location}
            renderItem={({ item }) => (
              <TouchableOpacity style={styles.border} onPress={() => this.setLocation(item)}>
                <Text>{item.name}</Text>
                <Text>{item.vicinity}</Text>
              </TouchableOpacity>
            )}
          />
        </SafeAreaView>
      </Modal>
    );
  };

  render() {
    return (
      <ScrollView>
        <View style={styles.container}>
          {this.modal()}
          <Text style={{ marginBottom: 40 }} h4>
            POST
          </Text>
          {this.props.post.photo ? (
            <Image
              source={{ uri: this.props.post.photo }}
              style={styles.postPhoto}
            />
          ) : null}
          <Input
            inputContainerStyle={styles.inputBorder}
            labelStyle={styles.inputLabel}
            placeholder="What's on your mind?"
            label="Description"
            onChangeText={text => this.props.updateDescription(text)}
          />
          <TouchableOpacity onPress={this.getLocation}>
            <Text>
              {this.props.post.location
                ? this.props.post.location.name
                : "Add Location"}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={this.post}>
            <Text style={styles.buttonText}>Post</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    { updateDescription, uploadPost, updateLocation },
    dispatch
  );
};

const mapStateToProps = state => {
  return {
    post: state.post,
    user: state.auth
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Post);

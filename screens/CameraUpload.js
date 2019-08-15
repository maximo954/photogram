import React, { Component } from "react";
import * as Permissions from "expo-permissions";
import { Camera } from "expo-camera";
import * as ImageManipulator from "expo-image-manipulator";
import { TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import styles from "../styles";
import { SafeAreaView } from "react-navigation";
import { uploadPhoto } from "../actions";
import { updatePhoto } from "../actions/post";

class CameraUpload extends Component {
  snapPhoto = async () => {
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    if (status === "granted") {
      const image = await this.camera.takePictureAsync();

      if (!image.cancelled) {
        const resize = await ImageManipulator.manipulateAsync(image.uri, [], {
          format: "jpeg",
          compress: 0.1
        });
        const url = await this.props.uploadPhoto(resize);
        this.props.updatePhoto(url);
        url ? this.props.navigation.navigate("Post") : null;
      }
    }
  };

  render() {
    return (
      <Camera
        style={{ flex: 1 }}
        ref={ref => {
          this.camera = ref;
        }}
        type={Camera.Constants.Type.back}
      >
        <SafeAreaView style={{ flex: 1 }}>
          <TouchableOpacity
            style={{ paddingLeft: 30 }}
            onPress={() => this.props.navigation.goBack()}
          >
            <Ionicons color={"white"} name={"ios-arrow-back"} size={50} />
          </TouchableOpacity>
        </SafeAreaView>
        <TouchableOpacity
          style={styles.cameraButton}
          onPress={() => this.snapPhoto()}
        />
      </Camera>
    );
  }
}

const mapStateToProps = state => {
  return {};
};
const mapDispatchToProps = dispatch => {
  return bindActionCreators({ uploadPhoto, updatePhoto }, dispatch);
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CameraUpload);

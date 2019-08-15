import React, { Component } from "react";
import { Text, View } from "react-native";
import MapView from "react-native-maps";

import styles from "../styles";

class Map extends Component {
  render() {
    const { location } = this.props.navigation.state.params;
    return (
      <MapView
        style={{ flex: 1 }}
        initialRegion={{
          latitude: location.cords.lat,
          longitude: location.cords.lng,
          latitudeDelta: 0.00922,
          longitudeDelta: 0.00421
        }}
      >
        <MapView.Marker
          coordinate={{
            latitude: location.cords.lat,
            longitude: location.cords.lng
          }}
          title={location.name}
        />
      </MapView>
    );
  }
}

export default Map;
